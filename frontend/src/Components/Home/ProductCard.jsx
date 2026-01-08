import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { highlightText } from "../../utils/textHighlight";

const ProductCard = ({ product }) => {
  const searchTerm = useSelector((state) => state.search.searchTerm);

  const createMarkup = (text) => ({
    __html: highlightText(text, searchTerm),
  });

  return (
    <div className="h-full bg-white rounded-2xl shadow-lg overflow-hidden 
    transition-transform transform hover:scale-[1.03] hover:shadow-2xl duration-300 
    border border-gray-200 flex flex-col">

      {/* Product Image */}
      <div className="h-56 w-full flex items-center justify-center bg-white">
        <img
          alt={product.title}
          src={product.image}
          className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-grow">
        <h2
          className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 line-clamp-1"
          dangerouslySetInnerHTML={createMarkup(product.title)}
        />

        <p
          className="text-sm text-indigo-500 mb-1 capitalize"
          dangerouslySetInnerHTML={createMarkup(product.category)}
        />

        <p
          className="text-sm text-gray-600 mb-4 line-clamp-2"
          dangerouslySetInnerHTML={createMarkup(product.description)}
        />
      </div>

      {/* Footer */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
        <span className="text-lg font-bold text-green-600">
          ${product.price}
        </span>

        <Link
          to={`/product/${product.id}`}
          className="text-sm bg-gradient-to-r from-blue-500 to-indigo-500 
          hover:from-indigo-500 hover:to-blue-600 text-white font-semibold 
          py-2 px-4 rounded-full shadow-md transition duration-300"
        >
          View More
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
