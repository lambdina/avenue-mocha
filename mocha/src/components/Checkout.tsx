import {ICustomProductProps} from "../types/Product.types";
import {getStoredCommands} from "../helpers/Product.helpers";
import {useState} from "react";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {TextField} from "@mui/material";
import {Order} from "./Order";
import EmptyCheckout from "../assets/emptyCheckout.svg";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {postOrder} from "../services/order.services";
import {AxiosResponse} from "axios";
import {dumpUser} from "../services/user.services";

export function Checkout() {

    const [storedCommands, setStoredCommand] = useState(getStoredCommands());
    const [isOrderSubmitted, setOrder] = useState(0);
    const userToken = localStorage.getItem("token");

    const submitOrder = (e: any) => {

        if (!userToken)
            return (
                <>
                    404, you should be logged in for this operation.
                </>
            )

        postOrder(userToken, storedCommands)
            .then((response: AxiosResponse) => {
                setOrder(2); // successfully submitted, no time for enum bruh
                localStorage.removeItem("orders");
            }).catch((err: any) => {
                setOrder(3);
        })

    }

    return (
        <div>
            <div className="container p-12 mx-auto">
                {!isOrderSubmitted && storedCommands.length > 0 &&
                    <div className="flex flex-col w-full px-0 mx-auto lg:flex-row lg:space-x-8">
                        <PickUpInfo submitOrder={submitOrder} totalPrice={getTotal(storedCommands)} />
                        <SummaryOrder isReadOnlyMode={!!isOrderSubmitted} storedCommands={storedCommands} setStoredCommands={setStoredCommand} />
                    </div>
                }
                {!isOrderSubmitted && !storedCommands.length &&
                    <Empty />
                }

                {isOrderSubmitted === 3 &&
                    <>
                        Sorry, something went wrong... :/
                    </>
                }
            </div>
            {isOrderSubmitted === 2 &&
                <div className="grid grid-cols-1 justify-center place-items-center space-y-4">
                    <h2 className="justify-self-center text-xl lg:text-3xl font-medium">Successfully submitted !</h2>
                    <p className="font-medium text-emerald-800 px-4">Thanks for choosing Mocha! You can now pick up your order in 12 minutes.</p>
                    <div className="lg:pt-6">
                        <SummaryOrder isReadOnlyMode={true} storedCommands={storedCommands} setStoredCommands={setStoredCommand} />
                    </div>
                </div>
            }
        </div>
    );
}

const PickUpInfo: React.FC<{totalPrice: number, submitOrder: any}> = ({totalPrice, submitOrder}) => {

    const [dateTime, setDateTime] = useState(new Date());
    const color = "#00704A";
    const user = dumpUser();

    if (!user)
        return (
            <>
                Please, log in first before this operation.
            </>
        );


    return (
        <div className="flex flex-col w-full ml-0 lg:ml-12 lg:w-3/5">
            <h2 className="mb-4 font-bold md:text-3xl text-heading ">Pick up your order
            </h2>
            <form className="justify-center w-full mx-auto" method="post">
                <div className="space-y-8">
                    <div className="space-x-0 lg:flex lg:space-x-4">
                        <div className="w-full lg:w-1/2">
                            <label htmlFor="firstName" className="block mb-3 font-semibold text-gray-500">First Name</label>
                            <p>{user.firstName}</p>
                        </div>
                        <div className="w-full lg:w-1/2 ">
                            <label htmlFor="firstName" className="block mb-3 font-semibold text-gray-500">Last Name</label>
                            <p>{user.lastName}</p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="w-full">
                            <label htmlFor="Address" className="block mb-3 font-semibold text-gray-500">Mocha's Address</label>
                            <div className="flex inline space-x-2">
                                <LocationOnIcon style={{color: "#00704A"}}/>
                                <p>12 rue bellecour, 69002, Lyon</p>
                            </div>
                        </div>
                    </div>


                    <div className="mt-4">
                        <div className="w-full">
                            <label htmlFor="Address" className="block mb-3 font-semibold text-gray-500">Pick-up date</label>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateTimePicker
                                    renderInput={(props: any) =>
                                        <TextField sx={{svg: {color: color}, input: {color: color}, label: {color: color}}} {...props} />}
                                    value={dateTime}
                                    onChange={(newValue: any) => {
                                        setDateTime(newValue);
                                    }}
                                />
                            </LocalizationProvider>
                        </div>
                    </div>

                    <div
                        className="justify-self-center text-emerald-800 md:w-full py-4 text-lg font-semibold lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                        Total {totalPrice}€</div>
                    <div className="mt-4">
                        <button
                            type="button"
                            onClick={submitOrder}
                            className="w-full rounded-full px-6 py-2 text-white bg-gray-800 hover:bg-green-800">Process
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

const SummaryOrder: React.FC<{storedCommands: Array<ICustomProductProps>, setStoredCommands: any, isReadOnlyMode: boolean}> = (props) => {

    const deleteOrder = (id: string) => {
        const newStoredCommands: Array<ICustomProductProps> = Object.assign([], props.storedCommands);
        const toDelete: number = newStoredCommands.findIndex((product) => product.productId === id);

        if (newStoredCommands[toDelete].quantity === 1) {
            newStoredCommands.splice(toDelete, 1);
        } else {
            newStoredCommands[toDelete].quantity -= 1;
        }
        props.setStoredCommands(newStoredCommands);
        localStorage.setItem("commands", JSON.stringify(newStoredCommands));
    }

    for (let i = 0; i < props.storedCommands.length; i ++) {
        props.storedCommands[i].removeItem = (e: any) => {deleteOrder(props.storedCommands[i].productId)};
    }

    return (
        <div className="flex flex-col md:w-full md:pl-10">
            <div className="md:overflow-auto md:h-full grid place-items-center lg:place-items-start pt-12 lg:pt-0 2xl:ps-4">


                {!props.storedCommands.length &&
                    <Empty />
                }

                {props.storedCommands.length > 0 &&
                    <>
                        <h2 className="text-xl font-bold justify-self-center lg:justify-self-start">Order Summary</h2>
                        <ul className="mt-8 space-y-6">
                            {props.storedCommands.map((order, index) =>
                                <li key={index}>
                                    <Order readOnlyMode={props.isReadOnlyMode} {...order} />
                                </li>
                            )}
                        </ul>

                    </>
                }
            </div>

        </div>
    );
}

export function Empty() {
    return (
        <div className="flex flex-col justify-center items-center md:space-y-12 space-y-8">
            <h2 className="text-gray-800 font-bold text-center text-2xl">Looks like someone needs a coffee</h2>
            <img className="md:w-1/4 w-full"
                 src={EmptyCheckout}/>
            <a className="text-gray-600 hover:text-green-800 focus:text-green-800"
               href="/products">Go back to menu</a>
        </div>
    );
}

const getTotal = (storedCommands: Array<ICustomProductProps>) => {
    return (storedCommands || []).reduce((currentValue, nextValue) => {
        return currentValue + nextValue.price;
    }, 0)
};
