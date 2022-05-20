import {ICustomProductProps, IProductProps, products} from "../types/Product.types";
import AcUnitIcon from '@mui/icons-material/AcUnit';
import CheckCircleIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import React from "react";

export const Order: React.FC<ICustomProductProps> = (props) => {
    const productInfo = products.find((product: IProductProps) => product.id === props.id);

    return (
        <div>
            {props.quantity > 1 &&
                <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-semibold bg-gray-600 text-white">
                    x{props.quantity}
                </div>
            }
            <div className="container w-full md:h-48 rounded-md shadow shadow-lg">
            {productInfo &&
                <div className="grid grid-cols-1 md:flex md:justify-evenly md:space-x-6">
                    <img className="justify-self-start md:w-40 md:h-40"
                         src={productInfo.imageSrc}
                         alt={productInfo.imageAlt}/>
                    <div className="space-y-2 justify-self-start md:w-2/5">
                        <p className="text-xl font-bold text-gray-800 hover:text-green-800">{productInfo.name}</p>
                        <p className="text-lg font-bold text-gray-600 hover:text-green-800">{props.price} €</p>
                        <p className="text-sm text-gray-600 font-regular hover:text-green-800">{productInfo.description}</p>
                    </div>
                    <div className="space-y-2 pt-4 md:self-center">
                        {props.isCold &&
                            <div className="flex space-x-1 text-blue-800">
                                <AcUnitIcon />
                                <p className="text-sm text-gray-400" >Cold</p>
                            </div>
                        }
                        {!props.isCold &&
                            <div className="flex space-x-1 text-orange-400">
                                <WhatshotIcon />
                                <p className="text-sm text-gray-600" >Hot</p>
                            </div>
                        }

                        <div className={"flex space-x-1 " + (props.isCreamy ? "text-green-400" : "text-red-400")}>
                            {props.isCreamy && <CheckCircleIcon />}
                            {!props.isCreamy && <HighlightOffIcon />}
                            <p className="text-sm text-gray-600">Cream</p>
                        </div>

                        {props.isCold && props.nbIces &&
                            <p className="text-sm text-gray-600 pl-2"> <span className="font-semibold">{props.nbIces}</span> ices</p>
                        }
                        {props.nbSugars &&
                            <p className="text-sm text-gray-600 pl-2"> <span className="font-semibold">{props.nbSugars}</span> sugars</p>
                        }
                        <div
                            className="w-7 h-7 text-sm rounded-full flex items-center justify-center font-semibold bg-gray-600 text-white">
                            {props.size}
                        </div>
                    </div>

                    <button className="flex justify-self-end font-semibold text-gray-800 hover:text-green-800"
                            onClick={props.removeItem}>Delete</button>
                </div>
            }
            </div>

        </div>
    );
}