import { RegisterFormState } from "@/components/User/RestierForm";
import webApi from "./webApi";
import { User } from "@/types/User";

export default class UserOauthService {
    static register(data: RegisterFormState): Promise<User> {
        return webApi.post("/oauth/register", data).then(({ data }) => data);
    }
}
