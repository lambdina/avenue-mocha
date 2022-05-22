import {useState} from "react";
import CoffeeCup from "../assets/CoffeeCup.svg";
import {getStoredCommands} from "../helpers/Product.helpers";
import {Order, TinyOrder} from "./Order";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import {products} from "../types/Product.types";

export function UserProfile() {

    const [isEditingMode, setEditingMode] = useState(false);
    const storedCommands = getStoredCommands().slice(0, 5);

    console.log(storedCommands);

    return (
        <div className="container mx-auto my-20">

                <div className="grid grid-cols-1 space-y-4 relative shadow-inner shadow-lg rounded-lg w-5/6 md:w-5/6 lg:w-5/6 xl:w-3/6 mx-auto">
                    <div className="flex justify-center">
                        <img
                            src="https://scontent.fotp3-1.fna.fbcdn.net/v/t1.6435-9/175889300_2909358829319917_899035180950984171_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=MaOc2WiX9w0AX_xiqmh&_nc_ht=scontent.fotp3-1.fna&oh=00_AT85mEIpqHX5yThEAWoCZCt2PAnO-SS4M0yKFm9Cjti2zg&oe=628D39CC"
                            alt=""
                            className="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110" />
                    </div>

                    <div className="flex justify-self-end pr-4 font-semibold text-gray-800 hover:text-green-800 transition duration-200 transform hover:scale-110"
                            onClick={(e: any) => {setEditingMode(!isEditingMode)}}>
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
        </div>
    );
}