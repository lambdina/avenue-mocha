import axios from "axios";
import {API_URL} from "./api.services.url";

interface ILoginUser {
    email: string,
    password: string,
}

interface IRegisterUser extends ILoginUser {
    firstName: string,
    lastName:string,
    avatar?:string
}

export interface IUserData {
    id: number;
    email: string,
    firstName: string,
    lastName:string,
    avatar_path?:string
}


export async function register(user: IRegisterUser) {
    return await axios.post(API_URL + "/users", user);
}

export async function login(user: ILoginUser) {
    return await axios.get(API_URL + '/token', {
        auth: {
            username: user.email,
            password: user.password
        }
    });
}

export async function getUserInfo(token: string) {
    return await axios.get(API_URL + "/users",
        {
            auth: {
                username: token,
                password: "x" // We don't care
            }
        })
}

export function dumpUser(): IUserData | undefined {
    const user: string | null = localStorage.getItem("user");
    if (!user)
        return undefined;
    return JSON.parse(user);
}
