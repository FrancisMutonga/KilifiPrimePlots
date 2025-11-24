"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import emailjs from "emailjs-com";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaWhatsapp,
  FaInstagram,
} from "react-icons/fa";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID!,       
        process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID!,      
        formData,
        process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY!       
      )
      .then(() => setStatus("Message sent!"))
      .catch(() => setStatus("Error sending message."));
  };

  return (
    <div className="mx-auto bg-forest p-8 mt-20">
      <section className="mb-12">
        <h2 className="text-3xl lg:text-5xl text-kilifigreen font-extrabold text-center mb-8">
          Contact Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* FORM */}
          <form onSubmit={handleSubmit} className="bg-white/90 p-8 space-y-8 rounded-2xl shadow-lg">
            <h3 className="text-lg font-bold text-black">Write us a Message</h3>

            {/* NAME */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="text-sm font-bold text-black">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
                  required
                />
              </div>

              <div>
                <label htmlFor="lastName" className="text-sm font-bold text-black">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
                  required
                />
              </div>
            </div>

            {/* EMAIL + PHONE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="text-sm font-bold text-black">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="text-sm font-bold text-black">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
                  required
                />
              </div>
            </div>

            {/* MESSAGE */}
            <div>
              <label htmlFor="message" className="text-sm font-bold text-black">
                Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={handleChange}
                className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
                rows={4}
                required
              />
            </div>

            {/* SUBMIT */}
            <button type="submit" className="w-full py-3 bg-blue-500 text-white rounded-2xl hover:bg-blue-700">
              Submit
            </button>

            {status && <p className="text-center pt-2 text-lg text-kilifigreen">{status}</p>}
          </form>

          {/* CONTACT INFO CARD */}
          <div className="bg-beige p-8 space-y-8 rounded-2xl shadow-xl text-black">
            <h3 className="text-2xl lg:text-4xl font-bold text-kilifigreen text-center">
              Our Contact Information
            </h3>
            <div className="space-y-4 text-kilifigreen">
              <div className="flex items-center">
                <FaPhoneAlt className="mr-4" />
                <span className="text-lg">+254708091755</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="mr-4" />
                <span className="text-lg">Kilifiprimeplots@gmail.com</span>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="mr-4" />
                <span className="text-lg">Baobao Plaza, Kilifi, Kenya</span>
              </div>
              <div className="flex gap-12 justify-center text-xl">
                <FaFacebookF />
                <FaWhatsapp />
                <FaInstagram />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
