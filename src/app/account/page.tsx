import { getSessionUser } from "@/actions/sessionActions";
import LogoutButtion from "@/components/User/LogoutButton";
import { redirect } from "next/navigation";

export default async function AccountPage() {
    const user = await getSessionUser();
    if (!user?.id) {
        return redirect("/login?not=authorized");
    }

    return (
        <>
            <div>You made it to account, {user!.name}</div>
            <div>
                <LogoutButtion />
            </div>
        </>
    );
}
