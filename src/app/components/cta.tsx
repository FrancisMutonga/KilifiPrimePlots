"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section className="rounded-2xl py-16 px-6  overflow-hidden w-full">
      <div className="max-w-5xl mx-auto text-center space-y-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-kilifigreen"
        >
          Own Your Piece of Paradise Today 🌍
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto"
        >
          Secure your future with affordable and verified land investments across Kenya.
          Whether you&apos;re buying your first plot or expanding your portfolio — we&apo;ve got you covered.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center gap-6 flex-wrap"
        >
          <Link
            href="/listings"
            className="inline-block bg-green-700 text-white px-8 py-3 rounded-full font-semibold shadow-md hover:bg-green-800 transition duration-300"
          >
            View Available Plots
          </Link>
          <Link
            href="/contact"
            className="inline-block bg-beige text-green-700 border border-green-700 px-8 py-3 rounded-full font-semibold shadow-md hover:bg-green-50 transition duration-300"
          >
            Talk to an Agent
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
