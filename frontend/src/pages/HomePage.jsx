import React, { useEffect, useState } from "react";
import HeroSection from "../Components/Home/HeroSection";
import ProductCard from "../Components/Home/ProductCard"
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { addProducts, setLoading, setError } from "../store/productsSlice";
import Loader from "../Components/Loader";

const HomePage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    const controller = new AbortController();
    
    const fetchProducts = async () => {
      // If we already have products, don't fetch again
      if (products.length > 0) {
        dispatch(setLoading(false));
        return;
      }

      try {
        dispatch(setLoading(true));
        const response = await axios.get("https://fakestoreapi.com/products", {
          signal: controller.signal
        });
        dispatch(addProducts(response.data));
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error("Error fetching products:", error);
          dispatch(setError(error.message));
        }
      }
    };
    
    fetchProducts();

    // Cleanup function to abort fetch if component unmounts
    return () => {
      controller.abort();
    };
  }, [dispatch, products.length]);

  return (
    <div className="bg-gradient-to-b from-white via-gray-50 to-purple-50 min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Product Section */}
      <section className="text-gray-700 body-font">
        <div className="container px-5 py-16 mx-auto">
          {/* Section Title */}
          <div className="flex flex-col text-center w-full mb-12">
            <h2 className="text-base text-indigo-500 tracking-widest font-medium uppercase mb-2">
              Explore Our Collection
            </h2>
            <h1 className="sm:text-4xl text-3xl font-extrabold title-font text-gray-900">
              Featured Products
            </h1>
            <p className="mt-4 text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
              Browse through our handpicked selection of products that blend quality and affordability.
            </p>
          </div>

          {/* Product Grid */}
          {loading ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <Loader />
            </div>
          ) : error ? (
            <div className="text-center text-red-600 min-h-[300px] flex items-center justify-center">
              <p>{error}</p>
            </div>
          ) : (
            <div className=" flex flex-wrap justify-center gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
