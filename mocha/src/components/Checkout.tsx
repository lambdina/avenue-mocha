import {ICustomProductProps} from "../types/Product.types";
import {getStoredCommands} from "../helpers/Product.helpers";
import {useState} from "react";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {TextField} from "@mui/material";
import {Order} from "./Order";
import EmptyCheckout from "../assets/emptyCheckout.svg";
import LocationOnIcon from '@mui/icons-material/LocationOn';

export function Checkout() {

    const storedCommands: Array<ICustomProductProps> = getStoredCommands();

    //TODO: https://stackoverflow.com/questions/35537229/how-can-i-update-the-parents-state-in-react

    return (
        <div>
            <div className="container p-12 mx-auto">
                {storedCommands.length > 0 &&
                    <div className="flex flex-col w-full px-0 mx-auto lg:flex-row lg:space-x-8">
                        <PickUpInfo totalPrice={getTotal(storedCommands)} />
                        <SummaryOrder {...storedCommands} />
                    </div>
                }
                {!storedCommands.length &&
                    <Empty />
                }
            </div>
        </div>
    );
}

const PickUpInfo: React.FC<{totalPrice: number}> = ({totalPrice}) => {

    const [dateTime, setDateTime] = useState(new Date());

    return (
        <div className="flex flex-col w-full ml-0 lg:ml-12 lg:w-3/5">
            <h2 className="mb-4 font-bold md:text-3xl text-heading ">Pick up your order
            </h2>
            <form className="justify-center w-full mx-auto" method="post">
                <div className="space-y-8">
                    <div className="space-x-0 lg:flex lg:space-x-4">
                        <div className="w-full lg:w-1/2">
                            <label htmlFor="firstName" className="block mb-3 font-semibold text-gray-500">First Name</label>
                            <p>Adina</p>
                        </div>
                        <div className="w-full lg:w-1/2 ">
                            <label htmlFor="firstName" className="block mb-3 font-semibold text-gray-500">Last Name</label>
                            <p>Cazalens</p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="w-full">
                            <label htmlFor="Address" className="block mb-3 font-semibold text-gray-500">Mocha's Address</label>
                            <div className="flex inline space-x-2">
                                <LocationOnIcon style={{color: "#166534"}}/>
                                <p>12 rue bellecour, 69002, Lyon</p>
                            </div>
                        </div>
                    </div>


                    <div className="mt-4">
                        <div className="w-full">
                            <label htmlFor="Address" className="block mb-3 font-semibold text-gray-500">Pick-up date</label>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateTimePicker
                                    renderInput={(props: any) => <TextField {...props} />}
                                    value={dateTime}
                                    onChange={(newValue: any) => {
                                        setDateTime(newValue);
                                    }}
                                />
                            </LocalizationProvider>
                        </div>
                    </div>

                    <div
                        className="justify-self-center md:w-full py-4 text-lg font-semibold lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                        Total {totalPrice}€</div>
                    <div className="mt-4">
                        <button
                            className="w-full rounded-full px-6 py-2 text-white bg-gray-800 hover:bg-green-800">Process
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

const SummaryOrder: React.FC<Array<ICustomProductProps>> = (props) => {

    const [storedCommands, setStoredCommands] = useState(Object.values(props));


    const deleteOrder = (id: string) => {
        const newStoredCommands: Array<ICustomProductProps> = Object.assign([], storedCommands);
        const toDelete: number = newStoredCommands.findIndex((product) => product.id === id);

        if (newStoredCommands[toDelete].quantity === 1) {
            newStoredCommands.splice(toDelete, 1);
        } else {
            newStoredCommands[toDelete].quantity -= 1;
        }
        setStoredCommands(newStoredCommands);
        localStorage.setItem("commands", JSON.stringify(newStoredCommands));
    }

    for (let i = 0; i < storedCommands.length; i ++) {
        storedCommands[i].removeItem = (e: any) => {deleteOrder(storedCommands[i].id)};
    }

    return (
        <div className="flex flex-col md:w-full md:pl-10">
            <div className="md:overflow-auto md:h-full grid place-items-center lg:place-items-start pt-12 lg:pt-0 2xl:ps-4">


                {!storedCommands.length &&
                    <Empty />
                }

                {storedCommands.length > 0 &&
                    <>
                        <h2 className="text-xl font-bold justify-self-center lg:justify-self-start">Order Summary</h2>
                        <ul className="mt-8 space-y-6">
                            {storedCommands.map((order, index) =>
                                <li key={index}>
                                    <Order {...order} />
                                </li>
                            )}
                        </ul>

                    </>
                }
            </div>

        </div>
    );
}

function Empty() {
    return (

        <div className="flex flex-col justify-center items-center md:space-y-12 space-y-8">
            <h2 className="text-gray-800 font-bold text-center md:text-4xl text-2xl">Looks like someone needs a coffee</h2>
            <img className="md:w-1/4 w-full"
                 src={EmptyCheckout}/>
            <a className="text-gray-600 hover:text-green-800 focus:text-green-800"
               href="/products">Go back to menu</a>
        </div>
    );
}

const getTotal = (storedCommands: Array<ICustomProductProps>) => {
    return (storedCommands || []).reduce((currentValue, nextValue) => {
        return currentValue + nextValue.quantity * nextValue.price;
    }, 0)
};
