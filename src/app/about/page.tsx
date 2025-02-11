"use client";
import { FaCheckCircle, FaSearchLocation, FaHandshake, FaFileAlt, FaShieldAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const services = [
  {
    title: "Property Identification",
    description: "We identify promising plots, verify details, and ensure they meet quality standards.",
    icon: FaSearchLocation,
  },
  {
    title: "Direct Negotiation",
    description: "We engage with landowners to confirm pricing and property details on your behalf.",
    icon: FaHandshake,
  },
  {
    title: "Document Verification",
    description: "All title deeds and subdivision documents are verified for authenticity.",
    icon: FaFileAlt,
  },
  {
    title: "Official Land Search",
    description: "We conduct official land searches and provide a stamped report for every property.",
    icon: FaCheckCircle,
  },
  {
    title: "Fraud Prevention",
    description: "We act as intermediaries to ensure a safe, transparent buying process.",
    icon: FaShieldAlt,
  },
];

const whyChooseUs = [
  "Prime, Verified Properties: All our listings have been thoroughly vetted to save you time and risk.",
  "Transparency and Trust: No hidden fees or inflated prices—just honest, straightforward service.",
  "Local Expertise: We know Kilifi, and we focus on the best areas for growth and investment."
];

const AboutPage = () => {
  return (
    <div className="min-h-screen py-16 px-6 md:px-16 lg:px-32 mt-10">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-kilifigreen mb-4">Your Kilifi Land Ownership Partner</h1>
        <p className="text-beige text-lg max-w-3xl mx-auto">
          We connect you with carefully researched and verified properties in Kilifi, ensuring safe and transparent investments.
        </p>
      </motion.div>

      {/* Services Section */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-beige/70 p-6 rounded-2xl shadow-lg flex flex-col items-center text-center hover:shadow-xl transition"
          >
            <service.icon className="text-kilifigreen text-5xl mb-4" />
            <h3 className="text-xl text-kilifigreen font-bold mb-2">{service.title}</h3>
            <p className="text-gray-600 text-sm">{service.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Commitment Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        className="mt-16 text-center bg-kilifigreen text-white py-12 px-6 rounded-2xl shadow-lg"
      >
        <h2 className="text-3xl font-bold mb-4">Our Commitment</h2>
        <p className="max-w-2xl mx-auto text-lg">
          No price mark-ups, no hidden fees—just verified properties and a secure buying process you can trust.
        </p>
      </motion.div>

      {/* Why Choose Us Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        className="mt-16 text-center py-12 px-6 rounded-2xl shadow-lg bg-white/50"
      >
        <h2 className="text-3xl font-bold mb-6 text-kilifigreen">Why Choose Us?</h2>
        <ul className="max-w-2xl mx-auto text-lg text-gray-700 space-y-4">
          {whyChooseUs.map((point, index) => (
            <li key={index} className="flex items-center gap-3">
              <FaCheckCircle className="text-kilifigreen text-xl" /> {point}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default AboutPage;
