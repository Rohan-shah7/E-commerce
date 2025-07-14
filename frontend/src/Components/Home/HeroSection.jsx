import React from "react";

const HeroSection = () => {
  return (
    <section className="text-gray-700 body-font bg-gradient-to-br from-white via-gray-50 to-purple-50">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        {/* Text Content */}
        <div className="lg:flex-grow md:w-1/2 lg:pr-16 flex flex-col md:items-start md:text-left items-center text-center animate-fadeIn">
          <h1 className="title-font sm:text-5xl text-4xl mb-6 font-extrabold text-gray-900 leading-tight">
            Shop Smart. <br className="hidden lg:inline-block" />
            Live Stylish.
          </h1>
          <p className="mb-8 text-base text-gray-600 leading-relaxed max-w-xl">
            Discover the best deals on trendsetting products. Your one-stop
            destination for style, savings, and satisfaction.
          </p>
          <div className="flex justify-center">
            <button className="inline-flex text-white bg-blue-600 border-0 py-2 px-6 focus:outline-none hover:scale-105 transition-transform duration-300 rounded-full text-lg shadow-md">
              Get Started
            </button>
            <button className="ml-4 inline-flex text-indigo-600 bg-white border border-gray-300 py-2 px-6 focus:outline-none hover:bg-gray-100 rounded-full text-lg shadow-sm hover:scale-105 transition-transform duration-300">
              Learn More
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mt-10 md:mt-0 animate-slideIn">
          <img
            className="object-cover object-center rounded-xl shadow-lg"
            alt="ecommerce hero"
            src="https://images.unsplash.com/photo-1483181957632-8bda974cbc91?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
