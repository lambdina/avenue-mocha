import React from 'react';
import './App.css';
import {ResponsiveNavBar} from "./components/Navbar";
import {ProductList} from "./components/ProductList";
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import ProductDetail from "./components/ProductDetail";
import {Checkout} from "./components/Checkout";
import {Auth} from "./components/Auth";
import {UserProfile} from "./components/UserProfile";

function App() {
    return (
        <div className="App">
            <header>
                <ResponsiveNavBar />
            </header>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ProductList />} />
                    <Route path="/products" element={<ProductList />} />
                    <Route path="/products/:productId" element={<ProductDetail />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/auth" element={<Auth />}/>
                    <Route path="/profile" element={<UserProfile />}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
