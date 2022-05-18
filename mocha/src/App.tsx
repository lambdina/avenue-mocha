import React from 'react';
import './App.css';
import {ResponsiveNavBar} from "./components/Navbar";
import {ProductList} from "./components/ProductList";

import { Route, Routes, BrowserRouter } from 'react-router-dom';
import ProductDetail from "./components/ProductDetail";

function App() {
    return (
        <div className="App">
            <header>
                <ResponsiveNavBar />
            </header>
            <BrowserRouter>
                <Routes>
                    <Route path="products" element={<ProductList />} >
                        <Route path=":productId" element={<ProductDetail />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
