import React, { useState } from "react";
import {IProductProps} from "../types/Product.types";
import {useParams} from "react-router-dom";
import {products} from "../types/Product.types";
import {ToggleButton} from "./ToggleButton";
import {CounterButton} from "./CounterButton";

const ProductImage: React.FC<{imageSrc: string, imageAlt: string}> = ({imageSrc, imageAlt}) => {
    return (

        <div className="w-full sm:w-96 md:w-8/12  lg:w-6/12 flex lg:flex-row flex-col lg:gap-8 sm:gap-6 gap-4">
            <div className=" w-full lg:w-8/12 flex justify-center items-center">
                <img src={imageSrc} alt={imageAlt} />
            </div>
        </div>
    );
}

const ProductSize: React.FC<{callback: any}> = ({callback}) => {

    // TODO: put value in parameter of the callback x)

    return (
        <div className="flex items-baseline mt-4 mb-6">
            <div className="space-x-2 flex text-sm">
                <label>
                    <input className="sr-only peer" name="size" type="radio" value="xs" checked onClick={callback}/>
                    <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-gray-700 peer-checked:font-semibold peer-checked:bg-gray-700 peer-checked:text-white">
                        XS
                    </div>
                </label>
                <label>
                    <input className="sr-only peer" name="size" type="radio" value="s" onClick={callback}/>
                    <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-gray-700 peer-checked:font-semibold peer-checked:bg-gray-700 peer-checked:text-white">
                        S
                    </div>
                </label>
                <label>
                    <input className="sr-only peer" name="size" type="radio" value="m" onClick={callback}/>
                    <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-gray-700 peer-checked:font-semibold peer-checked:bg-gray-700 peer-checked:text-white">
                        M
                    </div>
                </label>
                <label>
                    <input className="sr-only peer" name="size" type="radio" value="l" onClick={callback}/>
                    <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-gray-700 peer-checked:font-semibold peer-checked:bg-gray-700 peer-checked:text-white">
                        L
                    </div>
                </label>
                <label>
                    <input className="sr-only peer" name="size" type="radio" value="xl" onClick={callback}/>
                    <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-gray-700 peer-checked:font-semibold peer-checked:bg-gray-700 peer-checked:text-white">
                        XL
                    </div>
                </label>
            </div>
        </div>
    );
}

const ProductDetail = () => {

    const [rotate, setRotate] = useState(false);
    const [count, setCount] = useState(0);
    let params = useParams();
    const productId: string | undefined = params.productId;

    if (!productId)
        return (
            <>
                404, product not found.
            </>
        );

    const product: IProductProps | undefined = products.find(product => product.id === productId)

    if (!product)
        return (
            <>
                404, product not found.
            </>
        );

    const addCount = () => {
        setCount((prev) => prev + 1);
    };

    const minusCount = () => {
        if (count > 0) {
            setCount((prev) => prev - 1);
        }
    };

    return (
        <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
            <div className="flex lg:flex-row flex-col gap-8">
                <ProductImage imageSrc={product.imageSrc} imageAlt={product.imageAlt} />

                <div className="md:overflow-y-auto w-full px-4 sm:w-full  lg:w-8/12 md:h-8/12 lg:w-6/12 justify-items-start md:space-y-8 space-y-4">
                    <div className="flex justify-between md:py-6 py-4">
                        <h2 className="font-bold lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800 mt-4">{product.name}</h2>
                        <p className=" font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 mt-6 ">{product.price}</p>
                    </div>

                    <div>
                        <ToggleButton label={"Cold drink"} callback={(e: any) => {}} isDisabled={true} />
                        <ToggleButton label={"Cream"} callback={(e: any) => {}} isDisabled={false} />
                    </div>

                    <div>
                        <p className="flex justify-self-start text-sm font-bold text-gray-600">Size</p>
                        <ProductSize callback={(e: any) => {}} />
                    </div>

                    <div>
                        <p className="flex justify-self-start text-sm font-bold text-gray-600 pb-2">Quantity</p>
                        <CounterButton callback={(e: any) => {}} />
                    </div>
                    <div>
                        <p className="flex justify-self-start text-sm font-bold text-gray-600 pb-2">Ices</p>
                        <CounterButton callback={(e: any) => {}} />
                    </div>
                    <div>
                        <p className="flex justify-self-start text-sm font-bold text-gray-600 pb-2">Sugars</p>
                        <CounterButton callback={(e: any) => {}} />
                    </div>

                    <button className="focus:ring-2 hover:bg-green-800 focus:ring-offset-2 focus:ring-green-600 focus:bg-green-800 font-medium text-base leading-4 text-white bg-gray-600 w-full py-5 lg:mt-12 mt-6">Add to shopping bag</button>

                    <div className="block">
                        <p className="flex justify-self-start font-bold text-gray-600 pb-2">Description</p>
                        <p className="inline-flex justify-self-start text-gray-600">{product.description}</p>
                    </div>

                    <div>
                        <p className="flex justify-self-start font-bold text-gray-600 pb-2">Nutrition</p>
                        <p className="inline-flex justify-self-start text-gray-600">{product.nutritionInfo}</p>
                    </div>

                    <div>
                        <p className="flex justify-self-start font-bold text-gray-600 pb-2">Preparation time</p>
                        <p className="inline-flex justify-self-start text-gray-600">12 min</p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProductDetail;