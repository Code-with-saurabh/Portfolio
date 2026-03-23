import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

const Works = () => {
  const containerRef = useRef(null);

  const projects = [
    {
      title: "React Ecommerce Site",
      link: "https://ecommercebazaar.netlify.app/",
      tech: ["React.js", "Nodejs", "express js", "E-Commerce"],
      image: "/images/homepage.png",
    },
    {
      title: "Chat-app",
      link: "https://github.com/Code-with-saurabh/Chat-app",
      tech: ["React", "Nodejs", "Express", "JavaScript", "socketjs"],
      image: "/images/chat.png",
    },
  ];

  // Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  //GSAP Scroll Animation
  useEffect(() => {
    const elements = gsap.utils.toArray(".reveal");

    elements.forEach((el) => {
      gsap.fromTo(
        el,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    });
  }, []);

  return (
    <section
      id="work"
      className="flex flex-col min-h-screen"
      ref={containerRef}
    >
      {/* HEADER */}
      <header>
        <div className="flex flex-col gap-12 pt-16 sm:gap-16">
          <p className="tracking-[0.5rem] uppercase  px-4 text-black text-md font-light reveal mb-[-55px] lg:text-1xl">
            Logic meets Aesthetics, Seamlessly
          </p>

          <div className="px-3">
            <h1 className="uppercase font-normal text-[4rem] sm:text-[3rem] md:text-[8rem] pb-5 text-black reveal">
              Works
            </h1>
          </div>
        </div>

        <div className="relative px-10 text-black">
          <div className="absolute inset-x-0 border-t-2"></div>

          <div className="text-[1.5rem] py-12 sm:py-16 text-end reveal">
            <span className="block">
              Featured projects that have been meticulously
            </span>
            <span className="block">crafted with passion to drive</span>
            <span className="block">results and impact.</span>
          </div>
        </div>
      </header>

      {/* PROJECTS */}
      <div className="relative flex flex-col font-light">
        {projects.map((project, index) => (
          <a
            key={index}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex flex-col gap-2 py-6 group reveal"
            onMouseMove={(e) => {
              const img = e.currentTarget.querySelector(".floating-img");
              if (img) {
                img.style.left = ((e.clientX-500)+400) + "px";
                img.style.top = ((e.clientY-500)) + "px";
                 
              }
            }}
          >
            {/* Hover Background */}
            <div className="absolute inset-0 bg-black scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500 -z-10"></div>

            {/* Title */}
            <div className="flex justify-between px-10 text-black group-hover:text-white transition-all duration-500">
              <h2 className="text-[24px] lg:text-[30px]">{project.title}</h2>

              <span>↗</span>
            </div>

            {/* Divider */}
            <div className="w-full h-[1px] bg-black/70 group-hover:bg-white transition-all"></div>

            {/* Tech */}
            <div className="flex px-10 text-xs md:text-sm gap-x-5 uppercase">
              {project.tech.map((tech, i) => (
                <p key={i} className="group-hover:text-white transition">
                  {tech}
                </p>
              ))}
            </div>

            {/* Image (Mobile) */}
            <div className="relative flex items-center justify-center px-10 h-[300px] md:hidden">
              <img
                src={project.image}
                alt={project.title}
                className="object-cover w-full h-full rounded-md brightness-50"
              />
              <img
                src={project.image}
                alt="preview"
                className="absolute px-10 rounded-xl"
              />
            </div>

            {/* ✅ ADDED: Desktop Hover Floating Image */}

            <div className="floating-img hidden md:block fixed pointer-events-none opacity-0 group-hover:opacity-100 transition duration-200 z-[9999] -translate-x-1/2 -translate-y-1/2">
              <img
                src={project.image}
                alt="preview"
                className="w-[400px] h-[300px] object-cover rounded-lg shadow-2xl"
              />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Works;
