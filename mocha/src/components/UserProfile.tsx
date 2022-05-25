import {useEffect, useState} from "react";
import CoffeeCup from "../assets/CoffeeCup.svg";
import {getStoredCommands} from "../helpers/Product.helpers";
import {Order, TinyOrder} from "./Order";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import {Input} from "./Input";
import {dumpUser} from "../services/user.services";
import {getUserOrders} from "../services/order.services";
import {ICustomProductProps} from "../types/Product.types";
import {API_URL} from "../services/api.services.url";
import axios, {AxiosResponse} from "axios";
import {Empty} from "./Checkout";
import {ResponsiveNavBar} from "./Navbar";

export function UserProfile() {

    const [isEditingMode, setEditingMode] = useState(false);

    return (
        <div className="container mx-auto my-40">

            {!isEditingMode && <ReadOnlyMode isEditingMode={isEditingMode} setEditingMode={setEditingMode} /> }
            {isEditingMode && <EditingMode setEditingMode={setEditingMode} />}

        </div>
    );
}

const EditingMode: React.FC<{setEditingMode: any}> = ({setEditingMode}) => {

    const user = dumpUser();

    const [avatar, setAvatar] = useState<File & { lastModifiedDate: Date }>();
    const [emailChanged, setEmail] = useState<string | Blob>("");
    const [passwordChanged, setPassword] = useState("");
    const [firstName, setFirstName] = useState<string | Blob>("");
    const [lastName, setLastName] = useState<string | Blob>("");

    const handleSubmit = (e: any) => {
        if (!user)
            return (
                <>
                    404, you need to be logged in to perform this action.
                </>
            );

        let headers = {}
        let formData = new FormData();
        formData.append("id", user.id as unknown as Blob)
        formData.append("email", emailChanged as Blob)
        formData.append("firstName", firstName as Blob)
        formData.append("lastName", lastName as Blob)
        formData.append("password", passwordChanged)

        if (avatar) {
            formData.append("avatar_path", avatar as Blob)
            headers = {"Content-Type": "multipart/form-data"}
        }

        const userToken = localStorage.getItem("token");
        if (!userToken) return (
            <>
                404, you need to be logged in to perform this action.
            </>
        );


        axios.put(API_URL + "/users", formData,
            {
                auth: {
                    username: userToken,
                    password: "x" // We don't care
                },
                headers: headers
            }
        ).then((response: AxiosResponse) => { console.log(response.data); localStorage.setItem("user", JSON.stringify(response.data)); })
        setEditingMode(false);
    }

    return (
        <div className="grid grid-cols-1 p-6 space-y-4 relative shadow-inner shadow-lg rounded-lg w-5/6 md:w-5/6 lg:w-5/6 xl:w-3/6 mx-auto">
            <h2 className="text-xl font-bold">Edit profile</h2>
            <form className="flex-row justify-center items-center">
                <div className="grid xl:grid-cols-2 xl:gap-6">
                    <Input isRequired={false} label={"First name"} placeholder={"Blair"} onChange={(e: any)=> {setFirstName(e.target.value);}} type={"text"} />
                    <Input isRequired={false} label={"Last name"} placeholder={"Waldorf"} onChange={(e: any)=> {setLastName(e.target.value);}} type={"text"} />
                </div>
                <UploadFileButton label={"Change avatar"} onChange={(e: any) => {setAvatar(e.target.files[0]);}} />
                <Input isRequired={false} label={"New Email"} placeholder={"new@email.com"} type={"email"} onChange={(e: any) => {setEmail(e.target.value);}} />
                <Input isRequired={false} label={"New Password"} placeholder={"******"} type={"password"} onChange={(e: any) => {setPassword(e.target.value);}} />
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="justify-self-center bg-emerald-800 focus:ring-2 hover:bg-emerald-900 focus:bg-emerald-900 font-medium text-base rounded-full leading-4 text-white px-6 py-5 lg:mt-12 mt-6">
                    Done
                </button>
            </form>
        </div>
    );
}

const ReadOnlyMode: React.FC<{isEditingMode: boolean, setEditingMode: any}> = ({isEditingMode, setEditingMode}) => {


    const [storedCommands, setStoredCommands] = useState<Array<ICustomProductProps>>([]);
    const [hasAtLeastOne, setHowMany] = useState(1);
    const userToken = localStorage.getItem("token");
    const user = dumpUser();

    useEffect(() => {
        if (!userToken || !hasAtLeastOne) return;
        getUserOrders(userToken)
            .then((response) => {
                setStoredCommands(response.data.orders);
                setHowMany(storedCommands.length);
            })
    }, [userToken, hasAtLeastOne, setHowMany, setStoredCommands, storedCommands]);

    if (!userToken || !user)
        return (
            <>
                404, Not connected.
            </>
        );



    return (
        <>
        <div className="grid grid-cols-1 space-y-4 relative shadow-inner shadow-lg rounded-lg w-5/6 md:w-5/6 lg:w-5/6 xl:w-3/6 mx-auto">
            <div className="flex justify-center">
                <img
                    src={user.avatar_path}
                    alt=""
                    className="object-cover rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110" />
            </div>

            <div className="flex justify-self-end pr-4 font-semibold text-gray-800 hover:text-emerald-800 transition duration-200 transform hover:scale-110"
                 onClick={(e: any) => {setEditingMode((prev: boolean) => !prev)}}>
                <ModeEditIcon style={{color: "#00704A"}} />
            </div>

            <div className="mt-16">
                <h1 className="font-bold text-center text-3xl text-gray-800">{user.firstName} {user.lastName}</h1>
                <p className="text-center text-sm text-emerald-800 font-medium">{user.email}</p>
            </div>

            <div className="flex justify-center items-center space-x-2.5 pb-4">
                <p>{storedCommands.length}</p>
                <img src={CoffeeCup} />
            </div>

        </div>
    <div className="grid grid-cols-1 space-y-4 relative rounded-lg w-5/6 md:w-5/6 lg:w-5/6 xl:w-3/6 mx-auto">
        {!isEditingMode && storedCommands.length > 0 &&
            <div className="grid grid-cols-1 p-4">
                <p className="justify-self-center lg:pb-8 text-xl items-center font-semibold text-gray-800">Last orders</p>
                {storedCommands[0] &&
                    <Order readOnlyMode={true} isCold={storedCommands[0].isCold}
                           productId={storedCommands[0].productId} isCreamy={storedCommands[0].isCreamy}
                           quantity={storedCommands[0].quantity} nbSugars={storedCommands[0].nbSugars} nbIces={storedCommands[0].nbIces}
                           price={storedCommands[0].price} size={storedCommands[0].size}/>
                }
                {storedCommands.length > 1 &&
                    <ul className="">
                        {storedCommands.slice(1).map((order: ICustomProductProps) => (
                            <TinyOrder id={order.productId} />
                        ))}
                    </ul>
                }
            </div>
        }
        {!isEditingMode && !storedCommands.length && <Empty />}

    </div>
            </>
    );
}

const UploadFileButton: React.FC<{label: string, onChange: any}> = ({label, onChange}) => {
    return (
        <div className="mb-3">
            <label htmlFor="formFile" className="form-label inline-block font-medium font-lg mb-2 text-gray-800">{label}</label>
            <input
                onChange={onChange}
                className="form-control
    block
    w-full
    px-3
    py-1.5
    font-medium
    text-green-800
    bg-white bg-clip-padding
    border border-solid border-gray-300
    rounded
    transition
    ease-in-out
    m-0
    focus:text-green-800 focus:bg-white focus:border-green-800 focus:outline-none" type="file" id="formFile" />
        </div>
    );
}
