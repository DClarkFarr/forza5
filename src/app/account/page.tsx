import { getSessionUser } from "@/actions/sessionActions";
import LogoutButtion from "@/components/User/LogoutButton";

export default async function AccountPage() {
    const user = (await getSessionUser())!;

    return (
        <>
            <div>You made it to account, {user.name}</div>
            <div>
                <LogoutButtion />
            </div>
        </>
    );
}
