import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { CartSlicePath } from '../store/CartSlice';

const CheckoutPage = () => {
  const cart_data = useSelector(CartSlicePath);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [orderData, setOrderData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    paymentMethod: 'card'
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      const userData = JSON.parse(user);
      setCurrentUser(userData);
      // Pre-fill form with user data if available
      setOrderData(prev => ({
        ...prev,
        fullName: userData.name || '',
        email: userData.email || ''
      }));
    }
    setIsLoading(false);
  }, []);

  // Calculate totals
  const subtotal = cart_data.length > 0 
    ? cart_data.map(item => Math.ceil(item.price) * item.quantity).reduce((acc, item) => acc + item, 0)
    : 0;
  const tax = Math.ceil(subtotal * 0.1); // 10% tax
  const shipping = subtotal > 500 ? 0 : 50; // Free shipping over ₹500
  const total = subtotal + tax + shipping;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!orderData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!orderData.email.trim()) newErrors.email = 'Email is required';
    if (!orderData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (!orderData.address.trim()) newErrors.address = 'Address is required';
    if (!orderData.city.trim()) newErrors.city = 'City is required';
    if (!orderData.state.trim()) newErrors.state = 'State is required';
    if (!orderData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (orderData.email && !emailRegex.test(orderData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10}$/;
    if (orderData.phoneNumber && !phoneRegex.test(orderData.phoneNumber.replace(/\D/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    
    // Check if user is logged in
    if (!currentUser) {
      alert('Please log in to place an order');
      navigate('/login');
      return;
    }
    
    if (!validateForm()) return;
    
    if (cart_data.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    setIsProcessing(true);

    // Simulate order processing
    setTimeout(() => {
      // Create order object
      const order = {
        id: Date.now(),
        userId: currentUser.id || currentUser.email, // Use user ID or email as identifier
        userEmail: currentUser.email,
        userName: currentUser.name,
        ...orderData,
        items: cart_data,
        subtotal,
        tax,
        shipping,
        total,
        orderDate: new Date().toISOString(),
        status: 'confirmed'
      };

      // Save order to localStorage (in real app, this would be sent to backend)
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      existingOrders.push(order);
      localStorage.setItem('orders', JSON.stringify(existingOrders));

      // Clear cart
      localStorage.setItem('cart', JSON.stringify([]));
      
      setIsProcessing(false);
      
      // Navigate to success page or show success message
      alert(`Order placed successfully! Order ID: ${order.id}`);
      navigate('/');
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-lg shadow-sm p-8">
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Login Required</h2>
            <p className="text-gray-600 mb-6">
              You need to be logged in to place an order. Please log in or create an account to continue.
            </p>
            <div className="space-y-3">
              <Link 
                to="/login" 
                className="block w-full px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition duration-200"
              >
                Log In
              </Link>
              <Link 
                to="/signup" 
                className="block w-full px-6 py-3 border border-indigo-600 text-indigo-600 font-medium rounded-md hover:bg-indigo-50 transition duration-200"
              >
                Create Account
              </Link>
              <Link 
                to="/cart" 
                className="block w-full px-6 py-3 text-gray-600 font-medium rounded-md hover:bg-gray-100 transition duration-200"
              >
                Back to Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (cart_data.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some products to your cart before checking out.</p>
          <Link 
            to="/" 
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition duration-200"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
          
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-12">
            {/* Checkout Form */}
            <div className="lg:col-span-1">
              {/* User Info Display */}
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <svg
                    className="h-5 w-5 text-indigo-600 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-indigo-900">
                      Logged in as: {currentUser.name}
                    </p>
                    <p className="text-sm text-indigo-600">
                      {currentUser.email}
                    </p>
                  </div>
                </div>
              </div>
              
              <form onSubmit={handlePlaceOrder} className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={orderData.fullName}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                          errors.fullName ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="Enter your full name"
                      />
                      {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={orderData.email}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                          errors.email ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="Enter your email address"
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    </div>

                    <div>
                      <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={orderData.phoneNumber}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                          errors.phoneNumber ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="Enter your phone number"
                      />
                      {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h2>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={orderData.address}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                          errors.address ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="Enter your street address"
                      />
                      {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                          City *
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={orderData.city}
                          onChange={handleInputChange}
                          className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                            errors.city ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="City"
                        />
                        {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                      </div>

                      <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                          State *
                        </label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={orderData.state}
                          onChange={handleInputChange}
                          className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                            errors.state ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="State"
                        />
                        {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={orderData.zipCode}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                          errors.zipCode ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="ZIP Code"
                      />
                      {errors.zipCode && <p className="mt-1 text-sm text-red-600">{errors.zipCode}</p>}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h2>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        id="card"
                        name="paymentMethod"
                        type="radio"
                        value="card"
                        checked={orderData.paymentMethod === 'card'}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      />
                      <label htmlFor="card" className="ml-3 block text-sm font-medium text-gray-700">
                        Credit/Debit Card
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="cod"
                        name="paymentMethod"
                        type="radio"
                        value="cod"
                        checked={orderData.paymentMethod === 'cod'}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      />
                      <label htmlFor="cod" className="ml-3 block text-sm font-medium text-gray-700">
                        Cash on Delivery
                      </label>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1 mt-8 lg:mt-0">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
                
                {/* Cart Items */}
                <div className="space-y-3 mb-4">
                  {cart_data.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="h-12 w-12 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {item.title}
                        </p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        ₹{Math.ceil(item.price) * item.quantity}
                      </p>
                    </div>
                  ))}
                </div>

                <hr className="my-4" />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="text-gray-900">₹{tax}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-900">
                      {shipping === 0 ? 'Free' : `₹${shipping}`}
                    </span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between text-base font-semibold">
                    <span className="text-gray-900">Total</span>
                    <span className="text-gray-900">₹{total}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 space-y-3">
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                      isProcessing 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    } transition duration-200`}
                  >
                    {isProcessing ? 'Processing...' : 'Place Order'}
                  </button>
                  
                  <Link
                    to="/cart"
                    className="w-full py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 text-center block"
                  >
                    Back to Cart
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
