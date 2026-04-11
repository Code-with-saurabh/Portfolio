import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Resume() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;

    // Section reveal
    gsap.fromTo(
      el,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
      }
    );

    // Big RESUME animation
    gsap.fromTo(
      titleRef.current,
      { y: 120, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
        },
      }
    );

    // Right text animation
    gsap.fromTo(
      textRef.current,
      { x: 100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 85%",
        },
      }
    );

    // Buttons animation
    gsap.fromTo(
      btnRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: btnRef.current,
          start: "top 90%",
        },
      }
    );

    ScrollTrigger.refresh();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="resume"
      className="flex flex-col justify-center min-h-screen py-24 bg-black rounded-b-[45px] text-white"
    >
      {/* Header */}
      <div className="px-10">
        <p className="tracking-[0.5rem] uppercase text-sm font-light mb-6">
          A SUMMARY OF MY EXPERIENCE
        </p>

        <h1
          ref={titleRef}
          className="uppercase font-semibold text-[4rem] sm:text-[6rem] md:text-[10rem] leading-none"
        >
          RESUME
        </h1>
      </div>

      {/* Divider + Right Text */}
      <div className="relative px-10 mt-10">
        <div className="absolute inset-x-0 top-0 h-[2px] bg-white/80 rounded-full"></div>

        <div
          ref={textRef}
          className="py-12 text-right max-w-3xl ml-auto text-lg sm:text-xl font-light leading-relaxed"
        >
          <p>You can preview my latest resume online</p>
          <p>or download a copy for your records.</p>
        </div>
      </div>

      {/* Buttons */}
      <div
        ref={btnRef}
        className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-10 px-10"
      >
        <a
          href="https://drive.google.com/file/d/1ZT5KAkX83n9b6P7uAWHNMMgvykX0FDZa/view"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-4 uppercase tracking-widest border border-white rounded-full hover:bg-white hover:text-black transition-all duration-300 w-full sm:w-auto text-center"
        >
          View Resume
        </a>

        <a
          href="./SAURABH SHARMA_Resume.pdf"
          download
          className="px-8 py-4 uppercase tracking-widest bg-white text-black rounded-full hover:bg-yellow-500 transition-all duration-300 w-full sm:w-auto text-center"
        >
          Download PDF
        </a>
      </div>
    </section>
  );
}

export default Resume;
