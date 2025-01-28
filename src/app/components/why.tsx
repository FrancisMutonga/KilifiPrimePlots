import React from "react";

interface WhyUsProps {
  className?: string;
}

const WhyUs: React.FC<WhyUsProps> = ({ className }) => {
  const reasons = [
    {
      title: "Prime Locations",
      icon: "bx bxs-bulb",
      description:
        "Access to the most sought-after plots in Kilifi, from serene beach escapes to vibrant commercial hubs.",
    },
    {
      title: "Transparent Process",
      icon: "bx bxs-leaf",
      description:
        "We prioritize honesty and guide you through a seamless buying experience, with no hidden costs.",
    },
    {
      title: "Expert Guidance",
      icon: "bx bxs-user",
      description:
        "We offer personalized guidance throughout the project journey, ensuring that your vision becomes a reality.",
    },
    {
      title: "Affordable Pricing",
      icon: "bx bxs-time-five",
      description:
        "Flexible pricing and payment plans tailored to your budget.",
    },
    {
      title: "Proven Track Record",
      icon: "bx bxs-graduation",
      description:
        "Over 10 years of helping clients find their dream properties in Kilifi and beyond.",
    },
    {
      title: "Community Focused",
      icon: "bx bxs-category",
      description:
        "We are deeply rooted in Kilifi, supporting sustainable development and community growth.",
    },
  ];

  return (
    <section className={`bg-beige py-10 rounded-xl ${className}`} style={{ opacity: 0.75 }}>
      <div className="container mx-auto px-6 lg:px-12 text-kilifigreen">
        <h2 className="text-3xl  font-extrabold text-center mb-8">
          Why Us?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="text-center p-6  rounded-lg shadow-lg transition-transform hover:scale-105"
            >
              <div className="text-5xl mb-6">
                <i className={reason.icon}></i>
              </div>
              <h3 className="text-xl font-bold mb-4">{reason.title}</h3>
              <p className=" text-semibold">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
