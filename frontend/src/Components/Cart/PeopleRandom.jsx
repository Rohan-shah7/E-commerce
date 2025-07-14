import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { addProducts, setLoading } from '../../store/productsSlice';

const PeopleRandom = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items || []);
  const isLoading = useSelector((state) => state.products.loading);
  const [randomProduct, setRandomProduct] = useState(null);

  // Fetch products if not already loaded
  useEffect(() => {
    const fetchProductsIfNeeded = async () => {
      if (products.length === 0 && !isLoading) {
        try {
          dispatch(setLoading(true));
          const response = await axios.get("https://fakestoreapi.com/products");
          dispatch(addProducts(response.data));
        } catch (error) {
          console.error("Error fetching products for PeopleRandom:", error);
          dispatch(setLoading(false));
        }
      }
    };

    fetchProductsIfNeeded();
  }, [dispatch, products.length, isLoading]);

  // Set random product when products are available
  useEffect(() => {
    if (products.length > 0) {
      const randomIndex = Math.floor(Math.random() * products.length);
      setRandomProduct(products[randomIndex]);
    }
  }, [products]);

  if (isLoading) {
    return (
      <div className="max-w-sm mx-auto flex flex-col justify-center items-center h-[500px] rounded-xl border border-gray-200 bg-white shadow-md p-6">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-44 w-44 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    );
  }

  if (!randomProduct) {
    return (
      <div className="max-w-sm mx-auto flex flex-col justify-center items-center h-[500px] rounded-xl border border-gray-200 bg-white shadow-md p-6">
        <div className="text-center text-gray-500">
          <svg
            className="mx-auto h-12 w-12 text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8l-2-2m0 0l-2 2m2-2v6m-6 4v1a3 3 0 01-6 0v-1m6 0a5 5 0 00-10 0"
            />
          </svg>
          <p className="text-sm">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-sm mx-auto flex flex-col justify-between h-[500px] rounded-xl overflow-hidden border border-gray-200 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
    <div className="flex flex-col items-center p-6 flex-grow">
      <img
        className="h-44 w-44 object-contain mb-4"
        src={randomProduct.image}
        alt={randomProduct.title}
      />
      <h2 className="text-lg font-semibold text-gray-900 text-center hover:underline line-clamp-2">
        {randomProduct.title}
      </h2>
      <p className="mt-2 text-sm text-gray-600 text-center line-clamp-2">
        {randomProduct.description}
      </p>
  
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-400 line-through">
          ₹{Math.ceil(randomProduct.price + 10)}
        </p>
        <p className="text-xl font-bold text-red-600">
          ₹{Math.ceil(randomProduct.price)}
        </p>
      </div>
    </div>
  
    {/* Fixed position at the bottom */}
    <div className="p-6 pt-0">
      <Link
        to={`/product/${randomProduct.id}`}
        className="inline-flex items-center justify-center w-full px-4 py-2 bg-indigo-600 text-white font-medium text-sm rounded-md hover:bg-indigo-700 transition duration-200"
      >
        <svg
          className="mr-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 7h13L17 13M9 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z"
          />
        </svg>
        Add to Cart
      </Link>
    </div>
  </div>
  );
};

export default PeopleRandom;