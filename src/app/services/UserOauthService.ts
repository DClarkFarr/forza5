import { RegisterFormState } from "@/components/User/RegisterForm";
import webApi from "./webApi";
import { User } from "@/types/User";

export default class UserOauthService {
    static register(data: RegisterFormState): Promise<User> {
        return webApi.post("/auth/user", data).then(({ data }) => data);
    }
    static me(): Promise<User> {
        return webApi.get("/auth/user").then(({ data }) => data);
    }
}
