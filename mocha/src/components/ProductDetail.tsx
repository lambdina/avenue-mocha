import React, {useState} from "react";
import {areProductsEqual, ICustomProductProps, IProductProps} from "../types/Product.types";
import {useParams} from "react-router-dom";
import {products} from "../types/Product.types";
import {ToggleButton} from "./ToggleButton";
import {CounterButton} from "./CounterButton";
import {getStoredCommands, getStoredCommandsWithId} from "../helpers/Product.helpers";


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

    const setSize = (e: any) => {
        callback((prev: string) => e.target.value);
    }

    return (
        <div className="flex items-baseline mt-4 mb-6">
            <div className="space-x-2 flex text-sm">
                {["XS", "S", "M", "L", "XL"].map((stringSize, index) => (
                    <label>
                        {index === 2 &&
                            <input className="sr-only peer" name="size" type="radio" value="xs" checked onClick={setSize}/>}
                        {index !== 2 &&
                            <input className="sr-only peer" name="size" type="radio" value="s" onClick={setSize}/>}
                        <div
                            className="w-9 h-9 rounded-full hover:border-2 hover:border-emerald-800 hover:text-emerald-800 flex items-center justify-center text-gray-700 peer-checked:font-semibold peer-checked:bg-emerald-800 peer-checked:text-white">
                            {stringSize}
                        </div>
                    </label>
                ))}
            </div>
        </div>
    );
}

const ProductDetail = () => {
    const [isCold, setIsCold] = useState(false);
    const [isCreamy, setCream] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [nbSugars, setSugars] = useState(2);
    const [nbIces, setIces] = useState(0);
    const [isSubmit, setSubmit] = useState(false);
    const [size, setSize] = useState("XS");

    let params = useParams();
    const productId: string | undefined = params.productId;
    const product: IProductProps | undefined = products.find(product => product.id === productId)
    const [productSiblings, setProductSiblings] = useState<ICustomProductProps[]>(getStoredCommandsWithId(productId));
    const [priceNumber, setPriceNumber] = useState(productSiblings.reduce((acc, curr) =>
                                                { return acc + curr.price }, 0));
    const [totalQuantity, setTotalQuantity] = useState(productSiblings.reduce((acc, curr) =>
                                                { return acc + curr.quantity }, 1));


    if (!(productId && product))
        return (
            <>
                404, product not found.
            </>
        );

    const handleSubmit = (e: any) => {
        setPriceNumber((prev: number) => prev + (+product.price * quantity));
        setTotalQuantity((prev: number) => prev + quantity);
        const customProduct: ICustomProductProps = {
            productId: product.id,
            isCold: isCold,
            isCreamy: isCreamy,
            quantity: quantity,
            nbSugars: nbSugars,
            nbIces: nbIces,
            size: size,
            price: +product.price * quantity
        }
        const newProductsSiblings: Array<ICustomProductProps> = Object.assign([], productSiblings);
        let duplicate: boolean = false;

        for (let i = 0 ; i < newProductsSiblings.length; i++) {
            if (areProductsEqual(customProduct, newProductsSiblings[i])) {
                newProductsSiblings[i].quantity += customProduct.quantity;
                duplicate = true;
                break;
            }
        }
        if (!duplicate) {
            newProductsSiblings.push(customProduct);
        }
        setProductSiblings(newProductsSiblings);

        let storedCommands: Array<ICustomProductProps> = getStoredCommands();
        storedCommands = storedCommands.filter((order) => order.productId !== customProduct.productId); // avoid duplicates
        localStorage.setItem("orders", JSON.stringify(newProductsSiblings.concat(storedCommands))); // cause here we joined the arrays

        setSubmit(true);
    }

    return (
        <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4 space-y-4 md:space-y-6">
            <div className="flex lg:flex-row flex-col gap-8">
                <ProductImage imageSrc={product.imageSrc} imageAlt={product.imageAlt} />

                <div className="md:overflow-y-auto w-full px-4 sm:w-full  lg:w-8/12 md:h-8/12 lg:w-6/12 justify-items-start md:space-y-8 space-y-4">
                    <div className="flex justify-between md:py-6 py-4">
                        <h2 className="text-slate-800 font-bold lg:text-4xl text-3xl lg:leading-9 leading-7 mt-4">{product.name}</h2>
                        <p className="text-emerald-800 font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 mt-6 ">{(+product.price * quantity).toString()}€</p>
                    </div>

                    <div>
                        <ToggleButton label={"Cold drink"} callback={setIsCold} isDisabled={true} />
                        <ToggleButton label={"Cream"} callback={setCream} isDisabled={false} />
                    </div>

                    <div>
                        <p className="flex justify-self-start text-sm font-bold text-gray-600">Size</p>
                        <ProductSize callback={setSize} />
                    </div>

                    <div className="flex">
                        <CounterButton callback={setQuantity} initial={quantity} />
                        <p className="justify-self-start text-sm font-bold text-gray-600 pl-4">Quantity</p>
                    </div>


                    <div className="flex">
                        <CounterButton callback={setSugars} initial={nbSugars}/>
                        <p className="justify-self-start text-sm font-bold text-gray-600 pl-4">Sugars</p>
                    </div>
                    {isCold &&
                        <div className="flex">
                            <CounterButton callback={setIces} initial={nbIces}/>
                            <p className="justify-self-start text-sm font-bold text-gray-600 pl-4">Ices</p>
                        </div>
                    }

                    {!isSubmit && totalQuantity <= 1 &&
                        <button
                            className="bg-gray-800 focus:ring-2 hover:bg-emerald-800  focus:bg-emerald-800 font-medium text-base rounded-full leading-4 text-white w-full py-5 lg:mt-12 mt-6"
                            onClick={handleSubmit}>
                            Add to shopping bag
                        </button>
                    }
                    {(isSubmit || totalQuantity > 1) &&
                        <button
                            className="bg-emerald-800 focus:ring-2 hover:bg-emerald-800 focus:bg-emerald-800 font-medium text-base rounded-full leading-4 text-white w-full py-5 lg:mt-12 mt-6"
                            onClick={handleSubmit}>
                            Successfully added {totalQuantity - 1} {product.name} ({priceNumber.toString()} €)
                        </button>
                    }

                </div>
            </div>

            <div className="block pt-6">
                <p className="flex text-2xl justify-self-start font-bold text-gray-800 pb-2">Description</p>
                <p className="inline-flex justify-self-start text-gray-600">{product.description}</p>
            </div>

            <div>
                <p className="flex text-xl justify-self-start font-bold text-gray-800 pb-2">Nutrition</p>
                <p className="inline-flex justify-self-start text-gray-600">{product.nutritionInfo}</p>
            </div>

            <div>
                <p className="flex text-xl justify-self-start font-bold text-gray-800 pb-2">Preparation time</p>
                <p className="inline-flex justify-self-start text-gray-600">12 min</p>
            </div>

        </div>
    );
};

export default ProductDetail;