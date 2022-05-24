import React, {FunctionComponent, useEffect, useState} from 'react';
import './App.css';
import {ResponsiveNavBar} from "./components/Navbar";
import {ProductList} from "./components/ProductList";
import {Route, Routes, BrowserRouter, useParams} from 'react-router-dom';
import ProductDetail from "./components/ProductDetail";
import {Checkout} from "./components/Checkout";
import {UserProfile} from "./components/UserProfile";
import {Login, Register} from "./components/Auth";
import axios, {AxiosResponse} from "axios";
import {API_URL} from "./services/api.services.url";
import Cookies from "js-cookie";

const AuthProvider: React.FC<{Component: FunctionComponent}> = ({Component}) => {

    const [retries, setRetry] = useState(0);
    const max_retries = 1;
    const [isLoggedIn, setSuccessfullyLoggedIn] = useState(!!localStorage.getItem("user"));
    const token = Cookies.get("token");

    useEffect(() => {

        if (!isLoggedIn && retries < max_retries) {

            if (token) {

                console.log("ici");

                localStorage.setItem("token", token);
                axios.get(API_URL + "/users", {
                    auth: {
                        username: token,
                        password: "x" // We don't care
                    }
                }).then((response: AxiosResponse) => { setSuccessfullyLoggedIn(true); console.log("on resposne", response.data); localStorage.setItem("user", JSON.stringify(response.data)); })
                    .catch((err: any) => {console.log("ooops", err);})
            }
            setRetry((prev: number) => prev + 1);
        }

    }, [retries, setRetry, isLoggedIn, setSuccessfullyLoggedIn, token])
    return (
      <Component />
    );

}

function App() {
    return (
        <div className="App">
            <header className="pb-12">
                <AuthProvider Component={ResponsiveNavBar} />
            </header>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ProductList />} />
                    <Route path="/products" element={<ProductList />} />
                    <Route path="/products/:productId" element={<ProductDetail />} />
                    <Route path="/checkout" element={<AuthProvider Component={Checkout} />} />
                    <Route path="/login" element={<Login />}/>
                    <Route path="/register" element={<Register />}/>
                    <Route path="/profile" element={<AuthProvider Component={UserProfile} />}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
