import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../Components/Home/ProductCard';

const SearchResults = () => {
  const searchTerm = useSelector(state => state.search.searchTerm);
  const filteredProducts = useSelector(state => state.search.filteredProducts);
  const allProducts = useSelector(state => state.products.items);

  const displayProducts = searchTerm.trim() 
    ? filteredProducts 
    : allProducts;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">
        {searchTerm.trim() 
          ? `Search Results for "${searchTerm}" (${filteredProducts.length} items)` 
          : 'All Products'}
      </h2>
      
      {displayProducts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 text-lg">
            No products found matching "{searchTerm}"
          </p>
        </div>
      ) : (
        <div  className="flex flex-wrap justify-center gap-4">
          {displayProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
