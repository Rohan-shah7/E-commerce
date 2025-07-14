import React, { useState } from "react";
import { CiShop } from "react-icons/ci";

const categories = [
  {
    title: "CATEGORIES",
    links: ["First Link", "Second Link", "Third Link", "Fourth Link"],
  },
  {
    title: "RESOURCES",
    links: ["Docs", "Guides", "API", "Support"],
  },
  {
    title: "COMPANY",
    links: ["About", "Careers", "Contact", "Privacy"],
  },
  {
    title: "SOCIAL",
    links: ["Facebook", "Twitter", "Instagram", "LinkedIn"],
  },
];

const Footer = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <footer className="bg-white border-t border-gray-200 pt-10 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between gap-8">
          {/* Brand */}
          <div className="w-full sm:w-1/2 md:w-1/4">
            <a
              href="#"
              className="flex items-center text-gray-800 text-2xl font-bold hover:text-purple-600 transition"
            >
              <CiShop className="w-8 h-8 mr-2" />
              eCommerce
            </a>
            <p className="mt-3 text-sm text-gray-500">
              Explore the latest trends and deals at our store.
            </p>
          </div>

          {/* Categories */}
          {categories.map((cat, index) => (
            <div key={index} className="w-full sm:w-1/2 md:w-1/4">
              {/* Accordion toggle for mobile */}
              <button
                onClick={() => toggleIndex(index)}
                className="md:hidden w-full flex justify-between items-center font-semibold text-gray-800 mb-2 focus:outline-none"
              >
                {cat.title}
                <span
                  className={`transform transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>

              {/* Desktop Title */}
              <h3 className="hidden md:block text-sm font-semibold text-gray-800 mb-2">
                {cat.title}
              </h3>

              {/* Links */}
              <ul
                className={`space-y-2 text-sm text-gray-600 transition-all duration-300 ${
                  openIndex === index ? "block" : "hidden"
                } md:block`}
              >
                {cat.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="hover:text-purple-600 transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 mt-10"></div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between py-6 text-sm text-gray-500">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} Rohan Shah eCommerce —
            <a
              href="https://twitter.com/rohanshah2090"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 text-purple-600 hover:underline"
            >
              @rohan_shah
            </a>
          </p>

          {/* Socials */}
          <div className="flex space-x-5 mt-4 sm:mt-0">
            {[
              { name: "Facebook", color: "text-blue-600" },
              { name: "Twitter", color: "text-sky-400" },
              { name: "Instagram", color: "text-pink-500" },
              { name: "LinkedIn", color: "text-blue-800" },
            ].map((item, i) => (
              <a
                key={i}
                href="#"
                className={`hover:${item.color} transform hover:scale-110 transition duration-300`}
                aria-label={item.name}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  {/* Icons can be customized */}
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
