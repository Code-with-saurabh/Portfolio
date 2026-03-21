import React from "react";

const Experience = () => {
  return (
    <section
      
      className="min-h-full bg-black flex items-center px-6 sm:px-12 lg:px-24"
    >
      <header className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
        {/* Left side - heading */}
        <div className="flex flex-col justify-center gap-6 md:gap-12 md:flex-[1]">
          <p className="tracking-[0.5rem] uppercase text-white text-sm font-light mb-2">
            Professional Journey
          </p>

          <h1
            className="uppercase font-normal banner-text-responsive text-[4rem] sm:text-[5rem] md:text-[7rem] leading-tight text-white"
            aria-label="Experience"
          >
            Experience
          </h1>
        </div>
 
        {/* Right side - description */}
        <div className="relative md:flex-[1] px-3 max-w-xl">
          <div className="absolute inset-x-0 top-0 border-t-2 border-white"></div>

          <div className="pt-12 sm:pt-16 text-white uppercase font-light space-y-4 text-right text-lg sm:text-xl">
            <p className="tracking-wide">
              Full Stack Developer with hands-on experience
            </p>
            <p className="tracking-wide">in modern web technologies and</p>
            <p className="tracking-wide">agile development practices.</p>
          </div>
        </div>
      </header>
    </section>
  );
};

export default Experience;