import { NextRequest, NextResponse } from "next/server";

type Handler = <A extends NextRequest, B extends NextResponse>(
    req: A,
    res: B,
    next: (data?: any) => void
) => void;

type FinalCallback = <A extends NextRequest, B extends NextResponse>(
    req: A,
    res: B
) => void;

export default function chainMiddleware(...callbacks: Handler[]) {
    let responseData: any;

    const finalCallback = callbacks.pop() as FinalCallback;

    const cycleCallback = async <A extends NextRequest, B extends NextResponse>(
        creq: A,
        cres: B,
        handler: Handler
    ) => {
        await new Promise((resolve) => {
            const next = (data?: any) => {
                responseData = data;
                resolve(1);
            };

            handler(creq, cres, next);
        });

        return [creq, cres] as [typeof creq, typeof cres];
    };

    return async (req: NextRequest, res: NextResponse) => {
        let activeReq = req,
            activeRes = res;

        if (callbacks.length) {
            for (let callback of callbacks) {
                if (responseData !== undefined) {
                    break;
                }
                [activeReq, activeRes] = await cycleCallback(
                    activeReq,
                    activeRes,
                    callback
                );
            }
        }

        if (responseData !== null) {
            if (responseData instanceof Error) {
                return NextResponse.json(
                    { message: responseData.message },
                    { status: 410 }
                );
            }
            return NextResponse.json(responseData, { status: 410 });
        }
        return finalCallback(activeReq, activeRes);
    };
}

const chained = chainMiddleware(
    (req, res, next) => {
        const req1 = req as typeof req & { extra: { hello: number } };
        req1.extra = { hello: 1 };

        next();
    },
    (req, res, next) => {
        const req1 = req as typeof req & {
            extra: { hello: number; goodbye: number };
        };
        req1.extra.goodbye = 2;

        next();
    },
    (req, res) => {
        console.log("got req", req);
    }
);

type ReturnFuncDef = () => any;
type ReturnTestArray = [() => number, () => string, () => boolean];
type ConvertFunctionReturns<FS extends ReadonlyArray<ReturnFuncDef>> = {
    [K in keyof FS]: FS[K] extends () => any ? ReturnType<FS[K]> : never;
};

const returnTestArray1 = [
    () => "hey" as const,
    () => 1 as const,
    () => true as const,
] as const;
const returnTestArray2 = [() => "hey", () => 1, () => true] as const;

// type ArrTransform<T extends Readonly<{ id: number; color: string }[]>> = {
//     [I in keyof T]: T[I] extends { color: infer V } ? V : never;
// };

async function chainFunctionsReturns<FS extends ReadonlyArray<ReturnFuncDef>>(
    callbacks: FS
) {
    const returnTypes: any[] = [];
    for (let i = 0; i < callbacks.length; i++) {
        returnTypes.push(callbacks[i]());
    }

    return returnTypes as ConvertFunctionReturns<FS>;
}

type ReturnTestValues = ConvertFunctionReturns<ReturnTestArray>;
type ReturnValues1 = ConvertFunctionReturns<typeof returnTestArray1>;
type ReturnValues2 = ConvertFunctionReturns<typeof returnTestArray2>;
const returnTestValues1 = chainFunctionsReturns(returnTestArray1);
const returnTestValues2 = chainFunctionsReturns(returnTestArray2);

type ParamFuncDef = (req: any) => void;
type ConvertFunctionParams<FS extends ReadonlyArray<ParamFuncDef>> = {
    [K in keyof FS]: FS[K] extends (req: any) => any
        ? Parameters<FS[K]>[0]
        : never;
};

async function chainFunctionParams<FS extends ReadonlyArray<ParamFuncDef>>(
    callbacks: FS,
    initial: any
) {
    const paramTypes: any[] = [];
    for (let i = 0; i < callbacks.length; i++) {
        const callback = callbacks[i];
        type Param = Parameters<typeof callback>[0];
        paramTypes.push(callbacks[i](initial as Param));
    }

    return paramTypes as ConvertFunctionParams<FS>;
}

type ParamTestArray = [
    (req: number) => void,
    (req: string) => void,
    (req: boolean) => void
];
const paramTest1 = [
    (req: 1) => {},
    (req: "hey") => {},
    (req: true) => {},
] as const;
type ParamTestValues = ConvertFunctionParams<ParamTestArray>;
type ParamTestValues1 = ConvertFunctionParams<typeof paramTest1>;
const paramTestValues1 = chainFunctionParams(paramTest1, 1);
