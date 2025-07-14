import React, { useEffect, useState } from "react";
import HomePage from "./pages/HomePage";
import ErrorPage from "./Pages/ErrorPage";
import { BrowserRouter, Route, Routes } from "react-router";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addProducts } from "./store/productsSlice";
import SingleProduct from "./pages/SingleProduct";
import Loader from "./Components/Loader";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import SearchResults from "./pages/SearchResults";
import CheckoutPage from "./pages/CheckoutPage";

export const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};
export default App;