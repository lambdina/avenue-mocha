import {FunctionComponent, useState} from "react";
import {Input} from "./Input";
import {getUserInfo, login, register} from "../services/user.services";
import {AxiosResponse} from "axios";
import { useNavigate } from "react-router-dom";

const AuthForm: React.FC<{FormComponent: FunctionComponent}> = ({FormComponent}) => {

    return (
        <section className="h-screen">
            <div className="container px-6 h-full">
                <div className="flex justify-center items-center h-full text-gray-800">
                    <div className="md:w-8/12 lg:w-1/3 mb-12 md:mb-0">
                        <img
                            src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c54b.png"
                            className="h-1/2"
                            alt="Phone image"
                        />
                    </div>
                    <FormComponent />
                </div>
            </div>
        </section>
    );
}


export const Login: React.FC<{}> = () => {

    const RegisterForm: React.FC<{}> = () => {

        const [emailChanged, setEmail] = useState("");
        const [passwordChanged, setPassword] = useState("");
        const navigate = useNavigate();

        const handleSubmit = (e: any) => { // TODO: alert with successfully register

            login({email: emailChanged, password: passwordChanged})
                .then((response: AxiosResponse) => {
                    const token = response.data.token;
                    localStorage.setItem("token", token);
                    getUserInfo(token)
                        .then((response: AxiosResponse) => {
                            localStorage.setItem("user", JSON.stringify(response.data));
                            console.log("user", response.data)
                            navigate("/");
                        }).catch ((err: any) => {console.log("Unable to retrieve user info ; refresh token.")})
                })
                .catch((err: any) => {console.log("oh no", err);})
        }

        return (
            <div className="md:w-8/12 lg:w-5/12 lg:ml-20 space-y-6">

                <FacebookButton/>

                <div
                    className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                    <p className="text-center font-semibold mx-4 mb-0 text-gray-800">OR</p>
                </div>

                <h2 className="text-3xl font-medium text-gray-800">Log in</h2>

                <form>

                    <Input isRequired={true} label={"Email"} onChange={(e: any) => {setEmail(e.target.value)}} type={"email"}/>
                    <Input isRequired={true} label={"Password"} onChange={(e: any) => {setPassword(e.target.value)}} type={"password"}/>

                    <div className="flex justify-between items-center py-2">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="px-7 bg-gray-800 text-white font-medium text-sm leading-snug uppercase rounded-full shadow-md hover:bg-green-900 hover:shadow-lg focus:bg-green-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out py-3"
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                <a
                    href="/register"
                    className="font-medium py-4">
                    No account yet ? <span className="text-green-800 pr-4">Register</span>
                </a>
            </div>
        );
    }
    return (
        <AuthForm FormComponent={RegisterForm} />
    );
}


export const Register: React.FC<{}> = () => {

    const RegisterForm: React.FC<{}> = () => {

        const [emailChanged, setEmail] = useState("");
        const [passwordChanged, setPassword] = useState("");
        const [firstName, setFirstName] = useState("");
        const [lastName, setLastName] = useState("");
        const [success, setRegisterSuccess] = useState(false);

        const handleSubmit = (e: any) => { // TODO: alert with successfully register

            console.log("on submit....")

            register({email: emailChanged, firstName: firstName, lastName: lastName, password: passwordChanged})
                .then((response: AxiosResponse) => { setRegisterSuccess(true); })
                .catch((err: any) => {console.log("oh no", err);})
        }

        return (
            <div className="md:w-8/12 lg:w-5/12 lg:ml-20 space-y-6">

                {success &&
                    <div
                        className="flex p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
                        role="alert">
                        <svg className="inline flex-shrink-0 mr-3 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                  clipRule="evenodd"></path>
                        </svg>
                        <div>
                            <span className="font-medium">Successfully Register!</span>
                        </div>
                    </div>
                }
                <FacebookButton/>

                <div
                    className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                    <p className="text-center font-semibold mx-4 mb-0 text-gray-800">OR</p>
                </div>

                <h2 className="text-3xl font-medium text-gray-800">Register</h2>

                <form>

                    <div className="grid xl:grid-cols-2 xl:gap-6">
                        <Input isRequired={false} label={"First name"} onChange={(e: any) => {
                            setFirstName(e.target.value);
                        }} type={"text"}/>
                        <Input isRequired={false} label={"Last name"} onChange={(e: any) => {
                            setLastName(e.target.value);
                        }} type={"text"}/>
                    </div>
                    <Input isRequired={true} label={"Email"} onChange={(e: any) => {setEmail(e.target.value)}} type={"email"}/>
                    <Input isRequired={true} label={"Password"} onChange={(e: any) => {setPassword(e.target.value)}} type={"password"}/>

                    <div className="flex justify-between items-center py-2">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="px-7 bg-gray-800 text-white font-medium text-sm leading-snug uppercase rounded-full shadow-md hover:bg-green-900 hover:shadow-lg focus:bg-green-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out py-3"
                        >
                            Sign up
                        </button>
                    </div>
                </form>

                <a
                    href="/login"
                    className="font-medium py-4">
                    Already have an account ? <span className="text-green-800 pr-4">Log in</span>
                </a>
            </div>
        );
    }
    return (
        <AuthForm FormComponent={RegisterForm} />
    );
}

export function FacebookButton() {
    return (

        <a
            className="px-2 py-3 text-white font-medium text-sm leading-snug uppercase rounded-full shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out flex justify-center items-center mb-3"
            style={{backgroundColor: "#3b5998"}}
            href="#!"
            role="button"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                className="w-3.5 h-3.5 mr-2"
            >
                <path
                    fill="currentColor"
                    d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                />
            </svg>
            Continue with Facebook
        </a>
    );
}