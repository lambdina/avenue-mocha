import {useState} from "react";
import CoffeeCup from "../assets/CoffeeCup.svg";
import {getStoredCommands} from "../helpers/Product.helpers";
import {Order, TinyOrder} from "./Order";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import {Input} from "./Input";

export function UserProfile() {

    const [isEditingMode, setEditingMode] = useState(false);

    return (
        <div className="container mx-auto my-20">

            {!isEditingMode && <ReadOnlyMode isEditingMode={isEditingMode} setEditingMode={setEditingMode} /> }
            {isEditingMode && <EditingMode setEditingMode={setEditingMode} />}

        </div>
    );
}

const EditingMode: React.FC<{setEditingMode: any}> = ({setEditingMode}) => {

    // TOOD: put user value by default
    const [avatar, setAvatar] = useState("");
    const [emailChanged, setEmail] = useState("");
    const [passwordChanged, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const handleSubmit = (e: any) => {
        setEditingMode(false);
    }

    return (
        <div className="grid grid-cols-1 p-6 space-y-4 relative shadow-inner shadow-lg rounded-lg w-5/6 md:w-5/6 lg:w-5/6 xl:w-3/6 mx-auto">
            <h2 className="text-xl font-bold">Edit profile</h2>
            <form className="flex-row justify-center items-center">
                <div className="grid xl:grid-cols-2 xl:gap-6">
                    <Input isRequired={false} label={"First name"} onChange={(e: any)=> {setFirstName(e.target.value);}} type={"text"} />
                    <Input isRequired={false} label={"Last name"} onChange={(e: any)=> {setLastName(e.target.value);}} type={"text"} />
                </div>
                <UploadFileButton label={"Change avatar"} onChange={(e: any) => {setAvatar(e.target.value);}} />
                <Input isRequired={false} label={"New Email"} type={"email"} onChange={(e: any) => {setEmail(e.target.value);}} />
                <Input isRequired={false} label={"New Password"} type={"password"} onChange={(e: any) => {setEmail(e.target.value);}} />
                <button
                    onClick={handleSubmit}
                    className="justify-self-center bg-green-800 focus:ring-2 hover:bg-green-900 focus:bg-green-900 font-medium text-base rounded-full leading-4 text-white px-6 py-5 lg:mt-12 mt-6">
                    Done
                </button>
            </form>
        </div>
    );
}

const ReadOnlyMode: React.FC<{isEditingMode: boolean, setEditingMode: any}> = ({isEditingMode, setEditingMode}) => {


    const storedCommands = getStoredCommands().slice(0, 5);

    return (
        <>
        <div className="grid grid-cols-1 space-y-4 relative shadow-inner shadow-lg rounded-lg w-5/6 md:w-5/6 lg:w-5/6 xl:w-3/6 mx-auto">
            <div className="flex justify-center">
                <img
                    src="https://scontent.fotp3-1.fna.fbcdn.net/v/t1.6435-9/175889300_2909358829319917_899035180950984171_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=MaOc2WiX9w0AX_xiqmh&_nc_ht=scontent.fotp3-1.fna&oh=00_AT85mEIpqHX5yThEAWoCZCt2PAnO-SS4M0yKFm9Cjti2zg&oe=628D39CC"
                    alt=""
                    className="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110" />
            </div>

            <div className="flex justify-self-end pr-4 font-semibold text-gray-800 hover:text-green-800 transition duration-200 transform hover:scale-110"
                 onClick={(e: any) => {setEditingMode((prev: boolean) => !prev)}}>
                <ModeEditIcon style={{color: "#166534"}} />
            </div>

            <div className="mt-16">
                <h1 className="font-bold text-center text-3xl text-gray-800">Pantazi Software</h1>
                <p className="text-center text-sm text-green-800 font-medium">pantazi@spftware.com</p>
            </div>

            <div className="flex justify-center items-center space-x-2.5 pb-4">
                <p>3</p>
                <img src={CoffeeCup} />
            </div>

        </div>
    <div className="grid grid-cols-1 space-y-4 relative rounded-lg w-5/6 md:w-5/6 lg:w-5/6 xl:w-3/6 mx-auto">
        {!isEditingMode && storedCommands.length > 0 &&
            <div className="grid grid-cols-1 p-4">
                <p className="justify-self-center lg:pb-8 text-xl items-center font-semibold text-gray-800">Last orders</p>
                <Order {...storedCommands[0]} />
                {storedCommands.length > 1 &&
                    <ul className="">
                        {storedCommands.map((order) => (
                            <TinyOrder id={order.id} />
                        ))}
                    </ul>
                }
            </div>
        }

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
