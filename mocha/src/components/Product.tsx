import React, {useState} from 'react';
import {IProductProps} from "../types/Product.types";
import {Link} from "react-router-dom";



export const Product: React.FC<IProductProps> = (props: IProductProps) => {

    const href: string = "/products/" + props.id;

   return (
       <Link key={props.id} to={href} className="group">
           <div
               className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">

               <img
                   src={props.imageSrc}
                   alt={props.imageAlt}
                   className="w-full h-full object-center object-cover transition duration-200 transform hover:scale-110"
               />
           </div>

           <h3 className="mt-4 text-sm text-gray-700">{props.name}</h3>
           <p className="mt-1 text-lg font-medium text-gray-900">{props.price}€</p>
       </Link>
   );
}