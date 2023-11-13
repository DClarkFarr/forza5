import { getSessionUser } from "@/actions/sessionActions";
import AccountLayout from "@/components/Layout/AccountLayout";
import { redirect } from "next/navigation";

export default async function AccountLayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await getSessionUser();

    if (!user?.id) {
        return redirect("/login?not=authorized");
    }

    return <AccountLayout user={user}>{children}</AccountLayout>;
}
