import {ICustomProductProps, IProductProps, products} from "../types/Product.types";
import AcUnitIcon from '@mui/icons-material/AcUnit';
import CheckCircleIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import React from "react";

interface IOrder extends ICustomProductProps {
    readOnlyMode: boolean
}

export const Order: React.FC<IOrder> = (props) => {
    const productInfo = products.find((product: IProductProps) => product.id === props.productId);

    return (
        <div>
            {props.quantity > 1 &&
                <div
                    className="w-10 h-10 rounded-full border border-emerald-800 flex items-center justify-center font-semibold bg-white text-emerald-800">
                    x {props.quantity}
                </div>
            }
            <div className="container md:h-48 rounded-md shadow shadow-lg p-2 px-4 lg:p-0 lg:px-0 lg:pr-6">
                {productInfo &&
                    <div className="grid grid-cols-1 md:flex md:justify-evenly md:space-x-6">
                        <img className="justify-self-start md:w-40 md:h-40"
                             src={productInfo.imageSrc}
                             alt={productInfo.imageAlt}/>
                        <div className="space-y-2 justify-self-start md:w-2/5">
                            <p className="text-xl font-bold text-gray-800 hover:text-green-800">{productInfo.name}</p>
                            <p className="text-lg font-bold text-emerald-800 hover:text-green-800">{props.price} €</p>
                            <p className="text-sm text-gray-600 font-regular hover:text-green-800">{productInfo.description}</p>
                        </div>


                        <div className="space-y-2 pt-4 md:self-center">

                            {props.readOnlyMode &&
                                <div className="flex pt-2 pr-4 lg:pr-0 text-xs text-gray-600">
                                    <LocationOnIcon style={{color: "#00704A"}}/>
                                    <span className="pt-1">12 rue de bellecour, 69002 Lyon</span>
                                </div>
                            }
                            {props.isCold &&
                                <div className="flex space-x-1 text-blue-800">
                                    <AcUnitIcon />
                                    <p className="text-sm text-gray-400" >Cold</p>
                                </div>
                            }
                            {!props.isCold &&
                                <div className="flex space-x-1">
                                    <WhatshotIcon style={{color: "#00704A"}} />
                                    <p className="text-sm text-gray-600" >Hot</p>
                                </div>
                            }

                            <div className={"flex space-x-1 " + (props.isCreamy ? "text-green-400" : "text-red-400")}>
                                {props.isCreamy && <CheckCircleIcon style={{color: "#00704A"}} />}
                                {!props.isCreamy && <HighlightOffIcon style={{color: "#00704A"}} />}
                                <p className="text-sm text-gray-600">Cream</p>
                            </div>

                            {props.isCold && props.nbIces &&
                                <p className="text-sm text-gray-600 pl-2"> <span className="font-semibold text-emerald-800">{props.nbIces}</span> ices</p>
                            }
                            {props.nbSugars &&
                                <p className="text-sm text-gray-600 pl-2"> <span className="font-semibold text-emerald-800">{props.nbSugars}</span> sugars</p>
                            }
                            <div
                                className="w-7 h-7 text-sm rounded-full flex items-center justify-center font-semibold bg-emerald-800 text-white">
                                {props.size}
                            </div>
                        </div>
                        {!props.readOnlyMode &&
                            <div
                                className="flex justify-self-end lg:self-auto font-semibold text-gray-800 hover:text-green-800 transition duration-200 transform hover:scale-110">
                                <RemoveCircleRoundedIcon style={{color: "#991B1B"}} onClick={props.removeItem}/>
                            </div>
                        }
                    </div>
                }

            </div>

        </div>
    );
}

export const TinyOrder: React.FC<{id: string}> = (props) => {

    const product = products.find((product) => (product.id === props.id));

    return (
        <li>
            {product &&
                <a href="#"
                   className="lg:flex justify-around w-full shadow-inner shadow-lg space-x-4 border-border-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150">
                    <div className="flex inline-block mr-2 justify-self-start space-x-4">
                        <img src={product.imageSrc}
                             alt="" className="h-8 font-bold pr-2"/>
                        {product.name}
                        <span className="text-gray-600 text-xs py-1">42 min ago</span>
                    </div>
                    <div className="flex pl-4 lg:pl-0 justify-self-end text-xs text-gray-600">
                        <LocationOnIcon style={{color: "#00704A"}}/>

                        <span className="pt-1">12 rue de bellecour, 69002 Lyon</span>
                    </div>
                </a>
            }
        </li>
    );
}