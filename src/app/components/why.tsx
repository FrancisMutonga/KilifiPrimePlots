import React from "react";

interface WhyUsProps {
  className?: string;
}

const WhyUs: React.FC<WhyUsProps> = ({ className }) => {
  const reasons = [
    {
      title: "We Know kilifi",
      icon: "bx bxs-bullseye",
      description:
        "Our local experience and network mean we know where red flags are — and where the true gems are.",
    },
    {
      title: "Own a Genuine property",
      icon: "bx bxs-check-circle",
      description:
        "We make land ownership in Kilifi simple, transparent, and free from dishonest sellers.",
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
      title: "No Markups",
      icon: "bx bxs-time-five",
      description:
        "We cut out unnecessary agents and inflated commissions, ensuring you get land at its true market value.",
    },
    {
      title: "Proven Track Record",
      icon: "bx bxs-graduation",
      description:
        "Over 10 years of helping clients find their dream properties in Kilifi and beyond.",
    },
    
  ];

  return (
    <section className={` py-10 rounded-xl ${className}`} >
      <div className="container mx-auto px-6 lg:px-12 text-kilifigreen">
        <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl  font-extrabold text-center mb-8">
          Why Us?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="text-center p-6 bg-beige/90 rounded-2xl shadow-lg transition-transform hover:scale-105"
            >
              <div className="text-5xl mb-6">
                <i className={reason.icon}></i>
              </div>
              <h3 className="text-xl font-bold mb-4">{reason.title}</h3>
              <p className=" text-semibold text-gray-600">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
