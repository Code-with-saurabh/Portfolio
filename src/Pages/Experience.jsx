import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const experiences = [
    {
      role: "Senior Faculty",
      company: "Easy Skill Career Academy",
      duration: "2025 - Present",
      desc: "Developed responsive UI, improved UX, and integrated APIs using React and modern tools.",
    },
    {
      role: "Full Stack Developer",
      company: "Rainbow Services",
      duration: "2023-2024",
      desc: "Building scalable MERN stack applications, optimizing performance, and delivering production-ready solutions.",
    },
  ];

  //GSAP Reveal
  useEffect(() => {
    const elements = gsap.utils.toArray(".reveal");

    elements.forEach((el) => {
      gsap.fromTo(
        el,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        }
      );
    });
  }, []);

  return (
    <section className="min-h-screen bg-black text-white px-6 sm:px-12 lg:px-24 py-20" style={{ borderRadius: "45px" }}>
      <div className="max-w-7xl mx-auto flex flex-col gap-20">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between gap-10">

          {/* Left */}
          <div className="flex flex-col gap-6 md:gap-12">
            <p className="tracking-[0.5rem] uppercase text-sm font-light reveal">
              Professional Journey
            </p>

            <h1 className="uppercase   text-[3.5rem] sm:text-[4.5rem] md:text-[6.5rem] leading-tight reveal">
              Experience
            </h1>
          </div>

          {/* Right */}
          <div className="relative max-w-xl">
            <div className="absolute inset-x-0 top-0 border-t border-white"></div>

            <div className="pt-12 text-right uppercase font-light space-y-3 text-lg">
              <p className="reveal">
                Full Stack Developer with hands-on experience
              </p>
              <p className="reveal">
                in modern web technologies and
              </p>
              <p className="reveal">
                agile development practices..
              </p>
            </div>
          </div>
        </div>

        {/* TIMELINE */}
        <div className="relative flex flex-col gap-12">

          {/* Vertical Line */}
          <div className="absolute left-2 top-0 bottom-0 w-[1px] bg-white/20"></div>

          {experiences.map((exp, index) => (
            <div
              key={index}
              className="relative pl-10 group reveal"
            >
              {/* Dot */}
              <div className="absolute left-0 top-2 w-3 h-3 bg-white rounded-full group-hover:scale-125 transition"></div>

              {/* Card */}
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 transition hover:bg-white/10">

                <div className="flex justify-between flex-wrap gap-2 mb-2">
                  <h3 className="text-xl font-medium">
                    {exp.role}
                  </h3>
                  <span className="text-sm text-white/60">
                    {exp.duration}
                  </span>
                </div>

                <p className="text-sm text-white/70 mb-2">
                  {exp.company}
                </p>

                <p className="text-white/80 leading-relaxed">
                  {exp.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Experience;