import axios from "axios";
import {API_URL} from "./api.services.url";
import {ICustomProductProps} from "../types/Product.types";

export async function getUserOrders(token: string) {

    return await axios.get(API_URL + "/orders",
        {
            auth: {
                username: token,
                password: "x" // We don't care
            }
        });
}

export async function postOrder(token: string, orders: Array<ICustomProductProps>) {
    const payload = {
        orders: orders
    }
    console.log(JSON.stringify(payload));
    return await axios.post(API_URL + "/order", JSON.stringify(payload),
        {
            auth: {
                username: token,
                password: "x" // We don't care
            },
            headers: {
                "Content-Type": "application/json"
            }
        })
}