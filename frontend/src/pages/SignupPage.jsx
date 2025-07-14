import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({
    name: '',
    email: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
      
    }));

    // Real-time validation
    validateField(name, value);
  };

  const validateField = (fieldName, value) => {
    let errorMessage = '';

    if (fieldName === 'name') {
      if (!value.trim()) {
        errorMessage = 'Name is required';
      } else if (value.trim().length < 2) {
        errorMessage = 'Name must be at least 2 characters long';
      }
    } else if (fieldName === 'email') {
      if (!value.trim()) {
        errorMessage = 'Email is required';
      } else {
        const emailRegex = /^[a-zA-Z0-9]+@gmail\.com$/;

        if (!emailRegex.test(value)) {
          errorMessage = 'Please enter a valid email address';
        }
      }
    }

    setValidationErrors(prev => ({
      ...prev,
      [fieldName]: errorMessage
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Check if there are any validation errors
    if (validationErrors.name || validationErrors.email) {
      setError('Please fix the errors above before submitting');
      return;
    }

    // Final validation check
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setError('Please enter a valid name');
      return;
    }

    const emailRegex = /^[a-zA-Z0-9]+@gmail\.com$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Get existing users from localStorage or initialize empty array
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');

    // Check if email already exists
    if (existingUsers.some(user => user.email === formData.email)) {
      setError('Email already exists');
      return;
    }

    // Add new user
    const newUser = {
      name: formData.name,
      email: formData.email,
      password: formData.password // In a real app, you should hash the password
    };

    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));

    // Automatically log in the user
    localStorage.setItem('currentUser', JSON.stringify(newUser));

    // Redirect to home page
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-purple-50 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-sm border border-gray-100">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              sign in to your account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit} autoComplete="off">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="off"
                className={`appearance-none relative block w-full px-3 py-3 border ${
                  validationErrors.name ? 'border-red-500' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
              />
              {validationErrors.name && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.name}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="off"
                className={`appearance-none relative block w-full px-3 py-3 border ${
                  validationErrors.email ? 'border-red-500' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
              {validationErrors.email && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="new-password"
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                autoComplete="new-password"
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign up
            </button>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
