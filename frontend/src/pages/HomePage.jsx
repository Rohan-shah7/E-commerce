import React, { useEffect } from "react";
import HeroSection from "../Components/Home/HeroSection";
import ProductCard from "../Components/Home/ProductCard";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { addProducts, setLoading, setError } from "../store/productsSlice";
import Loader from "../Components/Loader";

const HomePage = () => {
  const dispatch = useDispatch();
  const {
    items: products,
    loading,
    error,
  } = useSelector((state) => state.products);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      if (products.length > 0) return;

      try {
        dispatch(setLoading(true));
        const response = await axios.get("https://fakestoreapi.com/products", {
          signal: controller.signal,
        });
        dispatch(addProducts(response.data));
      } catch (error) {
        if (error.name !== "CanceledError") {
          dispatch(setError(error.message));
        }
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchProducts();
    return () => controller.abort();
  }, [dispatch, products.length]);

  return (
    <div className="bg-gradient-to-b from-white via-gray-50 to-purple-50 min-h-screen">
      <HeroSection />

      {/* Product Section */}
      <section className="text-gray-700">
        <div className=" p-10">
          {/* Title */}
          <div className="text-center mb-12">
            <h2 className="text-indigo-500 uppercase tracking-widest text-sm font-medium">
              Explore Our Collection
            </h2>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2">
              Featured Products
            </h1>
            <p className="mt-4 max-w-xl mx-auto text-gray-600">
              Browse through our handpicked selection of products that blend
              quality and affordability.
            </p>
          </div>

          {/* Content */}
          {loading ? (
            <div className="flex justify-center items-center w-auto">
              <Loader />
            </div>
          ) : error ? (
            <div className="flex justify-center items-center w-auto text-red-600">
              {error}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-stretch ">
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
