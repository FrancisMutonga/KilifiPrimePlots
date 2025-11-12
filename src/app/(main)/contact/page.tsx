import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF,  FaWhatsapp, FaInstagram } from 'react-icons/fa';

const ContactPage: React.FC = () => {
  return (
    <div className=" mx-auto bg-forest p-8 mt-20">
      {/* Contact Form Section */}
      <section className="mb-12 " >
        <h2 className="text-3xl lg:text-5xl text-kilifigreen font-extrabold text-center mb-8">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <form className="bg-white/90 p-8 space-y-8 rounded-lg shadow-lg">
            <h3 className="text-lg font-extrabold text-black text-left ">Write us a Message</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Fields */}
              <div className="flex flex-col">
                <label className="text-sm font-bold text-black" htmlFor="first-name">
                  First Name
                </label>
                <input
                  id="first-name"
                  type="text"
                  className="mt-2 p-3 border border-gray-300 rounded-lg"
                  placeholder="Enter your first name"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-bold text-black" htmlFor="last-name">
                  Last Name
                </label>
                <input
                  id="last-name"
                  type="text"
                  className="mt-2 p-3 border border-gray-300 rounded-lg"
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </div>

            {/* Email and Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-sm font-bold text-black" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="mt-2 p-3 border border-gray-300 rounded-lg"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-bold text-black" htmlFor="phone">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  className="mt-2 p-3 border border-gray-300 rounded-lg"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </div>

            {/* Message Field */}
            <div className="flex flex-col mb-6">
              <label className="text-sm font-bold text-black" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                className="mt-2 p-3 border border-gray-300 rounded-lg"
                placeholder="Enter your message"
                rows={4}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
            >
              Submit
            </button>
          </form>

          {/* Contact Info Card */}
          <div className="bg-beige p-8  space-y-8 Sitems-start rounded-2xl shadow-xl text-black ">
            <h3 className="text-2xl lg:text-4xl font-bold  text-kilifigreen text-center ">Our Contact Information</h3>
            <div className="space-y-4 text-kilifigreen ">
              <div className="flex items-center ">
                <FaPhoneAlt className="text-kilifigreen mr-4" />
                <span className="text-lg">+254708091755.</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-kilifigreen mr-4" />
                <span className="text-lg">  Kilifiprimeplots@gmail.com</span>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-kilifigreen mr-4" />
                <span className="text-lg">Baobao Plaza,Kifili, Kenya</span>
              </div>
              <div className="flex gap-12 items-startjustify-center text-xl">
                <a href="https://www.facebook.com/people/Kilifi-Prime-Plots/61558718026419/" target="_blank" rel="noopener noreferrer">
                  <FaFacebookF className="text-kilifigreen hover:text-blue-800" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp className="text-kilifigreen hover:text-blue-600" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <FaInstagram className="text-kilifigreen hover:text-blue-900" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
