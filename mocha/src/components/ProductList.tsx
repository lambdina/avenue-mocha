
import React from 'react';
import {Product} from "./Product";
import {IProductProps, products} from "../types/Product.types";
import {Outlet} from "react-router-dom";


export function ProductList() {
    return (
        <div className="bg-white">
            <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">Products</h2>

                <div
                    className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {products.map((product: IProductProps) => (
                        <Product
                            id={product.id}
                            name={product.name}
                            href={product.href}
                            price={product.price}
                            imageSrc={product.imageSrc}
                            imageAlt={product.imageAlt}/>
                    ))}
                </div>
            </div>
            <Outlet />
        </div>
    )
}