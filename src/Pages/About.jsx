import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
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

  //GSAP Reveal Animation
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
        }
      );
    });
  }, []);

  return (
    <section className="bg-black text-white min-h-screen rounded-b-[40px]">

      {/* TOP HEADER */}
      <div className="px-6 md:px-12 pt-16">
        <p className="text-xs tracking-[0.4rem] uppercase text-white/70 mb-6 reveal">
          Code with purpose, Built to scale
        </p>

        <h1 className="text-[60px] md:text-[120px] font-medium leading-none uppercase reveal">
          About
        </h1>
      </div>

      {/* DIVIDER */}
      <div className="border-t border-white/30 mt-6"></div>

      {/* RIGHT TEXT */}
      <div className="px-6 md:px-12 py-12 flex justify-end">
        <div className="text-right max-w-2xl space-y-2 text-sm md:text-lg uppercase tracking-wide ">
          <p className="text-[1.5rem]">Passionate about clean architecture</p>
          <p className="text-[1.5rem]">I build scalable, high-performance solutions</p>
          <p className="text-[1.5rem]">From prototype to production</p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="px-6 md:px-12 pb-20 flex flex-col lg:flex-row items-center gap-12">

        {/* IMAGE */}
        <div className="w-full lg:w-[400px] flex justify-center reveal">
          <img
            src="/images/Saurabh-Sharma.jpg"
            alt="profile"
            className="rounded-3xl w-[300px] md:w-[400px] object-cover"
          />
        </div>

        {/* TEXT */}
        <div className="w-[full] lg:w-[700px] text-white/80 leading-relaxed space-y-6">
          <p className="text-[1.5rem] reveal min-w-[60vw]">
            I am a Full Stack Developer specializing in the MERN stack
            (MongoDB, Express, React, Node.js). Unlike typical frontend
            developers, I understand the full application lifecycle—from
            designing efficient database schemas and secure REST APIs to
            implementing pixel-perfect, responsive user interfaces.
          </p>

          <p className="text-[1.5rem] reveal min-w-[60vw]">
            My focus is on building production-ready software, not just
            prototypes. I prioritize clean architecture, long-term
            maintainability, and performance optimization. Whether integrating
            complex payment gateways or optimizing load times, I write code
            that solves real business problems and scales with your growth.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;