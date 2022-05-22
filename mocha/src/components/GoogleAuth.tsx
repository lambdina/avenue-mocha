// /components/GoogleAuth.tsx
import { useState } from "react";
import axios, { AxiosResponse } from "axios";

interface AuthResponse {
    token: string;
    user: User;
}

interface User {
    _id: string;
    name: string;
    email: string;
    avatar: string;
}

const GoogleAuth = () => {
    const [user, setUser] = useState<User | null>(null);

    console.log("user???", user);

    const onSuccess = async (e: any) => {

        console.log("Reachin on success...");

        try {
            const result: AxiosResponse<AuthResponse> = await axios.get("http://localhost:5000/auth/google",
                {headers: {"Access-Control-Allow-Credentials": true}});

            console.log("OMG A RESPONSE", result.data);
            setUser(result.data.user);
        } catch (err) {
            console.log("Oh noes...");
            console.log(err);
        }
    };

    return (
        <div className="group relative w-full flex justify-center py-2 px-4 ">
            {!user && (
                <a
                    className="shadow-lg rounded-lg text-gray-600 p-2"
                    href="http://localhost:5000/auth/google"
                >Login with Google</a>
            )}
        </div>
    );
};

export default GoogleAuth;
