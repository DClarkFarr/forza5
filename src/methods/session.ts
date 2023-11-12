// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import { User } from "@/types/User";
import { getIronSession, IronSession, IronSessionOptions } from "iron-session";

export const sessionOptions: IronSessionOptions = {
    password: process.env.SECRET_COOKIE_PASSWORD as string,
    cookieName: "session_id",
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
};

// This is where we specify the typings of req.session.*
declare module "iron-session" {
    interface IronSessionData {
        user?: User;
    }
}

export type DynamicSegments = {
    params: { slug: string } | undefined;
};

export type RouteHandler = (
    request: Request,
    routeSegment: DynamicSegments
) => Promise<Response>;

export type RouteHandlerWithSession = (
    request: Request & { session: IronSession },
    routeSegment: DynamicSegments
) => Promise<Response>;

export const ironSessionMiddleware = (
    handler: RouteHandlerWithSession
): RouteHandler => {
    return async (request, routeSegment) => {
        const cookieResponse = new Response();
        const session = await getIronSession(
            request,
            cookieResponse,
            sessionOptions
        );

        const sessionRequest = Object.assign(request, { session });
        const response = await handler(sessionRequest, routeSegment);

        const setCookie = cookieResponse.headers.get("set-cookie");
        if (setCookie) {
            response.headers.set("set-cookie", setCookie);
        }

        return response;
    };
};
