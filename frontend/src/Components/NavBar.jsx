import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm, setFilteredProducts } from "../store/searchSlice";
import { CiShop } from "react-icons/ci";
import { MdLogin, MdSearch, MdShoppingCart } from "react-icons/md";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState(null);
  const products = useSelector(state => state.products.items || []);
  const isLoading = useSelector(state => state.products.loading);
  const searchQuery = useSelector(state => state.search.searchTerm);
  const cartLength = useSelector(state => state.carts.cart.length);




  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      setCurrentUser(JSON.parse(user));
    } else {
      setCurrentUser(null);
    }
  }, [location]); // Check for current user whenever location changes

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    navigate("/login");
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setIsOpen(false);
  };

  const handleHomeClick = (e) => {
    // If we're already on the home page, just scroll to top
    if (location.pathname === '/') {
      e.preventDefault();
      handleScrollToTop();
    } else {
      // Navigate to home and then scroll to top
      navigate('/');
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }, 100);
      setIsOpen(false);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value.trim();
    dispatch(setSearchTerm(value));
    
    // Don't filter if still loading or no products
    if (isLoading) {
      return;
    }
    
    // Check if products array exists and has items
    if (value && products && products.length > 0) {
      try {
        // Split search terms for more accurate matching
        const searchTerms = value.toLowerCase().split(/\s+/);
        
        const filtered = products.filter(product => {
          const title = (product.title || '').toLowerCase();
          const description = (product.description || '').toLowerCase();
          const category = (product.category || '').toLowerCase();
          
          // Match if ALL search terms are found in any of the fields
          return searchTerms.every(term => 
            title.includes(term) ||
            description.includes(term) ||
            category.includes(term)
          );
        });
        
        dispatch(setFilteredProducts(filtered));
      } catch (error) {
        console.error('Error filtering products:', error);
        dispatch(setFilteredProducts([]));
      }
    } else {
      dispatch(setFilteredProducts([]));
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/search');
    }
    setIsOpen(false);
  };

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 transition-all">
      <div className="container mx-auto flex items-center justify-between px-4 py-4 md:py-5">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center text-gray-900 dark:text-white text-xl font-semibold hover:scale-105 transition-transform"
          onClick={handleHomeClick}
        >
          <CiShop className="text-blue-600 dark:text-blue-400 w-8 h-8 mr-2" />
          E-Commerce
        </Link>

        {/* Search bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:flex flex-1 max-w-xs mx-6 relative"
          role="search"
          aria-label="Site search"
        >
          <MdSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            size={20}
          />
          <input
            type="search"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search products..."
            className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Search products"
          />
        </form>

        {/* Hamburger (Mobile) */}
        <div className="md:hidden flex items-center gap-4">
          {/* Cart Icon Mobile */}
          <Link
            to="/cart"
            aria-label="Cart"
            className="text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
          >
            <MdShoppingCart size={28} />
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            className="text-gray-700 dark:text-white focus:outline-none"
          >
            {isOpen ? <HiX className="w-7 h-7" /> : <HiMenu className="w-7 h-7" />}
          </button>
        </div>

        {/* Navigation */}
        <nav
          className={`absolute md:static top-16 left-0 w-full md:w-auto bg-white dark:bg-gray-900 md:bg-transparent md:dark:bg-transparent shadow-md md:shadow-none rounded-b-lg md:rounded-none transition-all duration-300 ease-in-out overflow-hidden ${
            isOpen ? "max-h-72" : "max-h-0 md:max-h-full"
          } md:flex items-center gap-6 text-gray-700 dark:text-gray-300 font-medium text-base px-6 md:px-0`}
        >
          {/* Search bar for mobile */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex md:hidden px-4 py-2 border-b border-gray-200 dark:border-gray-700 relative"
            role="search"
            aria-label="Site search"
          >
            <MdSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              size={20}
            />
            <input
              type="search"                value={searchQuery}
                onChange={handleSearchChange}
              placeholder="Search products..."
              className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Search products"
            />
          </form>

          <Link
            to="/"
            className="block py-2 md:py-0 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            onClick={handleHomeClick}
          >
            Home
          </Link>

          <Link
            to="/cart"
            className="flex items-center gap-1 py-2 md:py-0 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <MdShoppingCart size={20} /> Cart-{cartLength}
          </Link>

          {/* Auth Links / User Info */}
          <div className="flex items-center gap-4 md:ml-4">
            {currentUser ? (
              <>
                <span className="text-gray-700 dark:text-white">
                  Welcome, {currentUser.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400"
                  onClick={() => setIsOpen(false)}
                >
                  <MdLogin size={20} />
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
