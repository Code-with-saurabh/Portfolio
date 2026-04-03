import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import SmoothScroll from "./Components/SmoothScroll";
import About from "./Pages/About";
import Experience from "./Pages/Experience";
import Hero from "./Pages/Hero";
import Services from "./Pages/Services";
import Works from "./Pages/Works";
import Resume from "./Pages/Resume";
import Lets from "./Pages/Lets";
import Contact from "./Pages/Contact";
import Navbar from "./Components/Navbar.jsx";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const sectionRef = useRef(null);
  const sectionRef1 = useRef(null);
  const sectionRef2 = useRef(null);
  const sectionRef3 = useRef(null);
  useEffect(() => {
    const sections = [
      sectionRef1.current,
      sectionRef2.current,
      sectionRef3.current,
    ];
    // const el = sectionRef.current;


    // gsap.fromTo(
    //   el,
    //   {
    //     scale: 1.15,
    //     y: 120,
    //     opacity: 0.85,
    //   },
    //   {
    //     scale: 1,
    //     y: 0,
    //     opacity: 1,
    //     ease: "power3.out",
    //     scrollTrigger: {
    //       trigger: el,
    //       start: "top 85%",
    //       end: "top 30%",
    //       scrub: true,
    //     },
    //   }
    // );


    // gsap.fromTo(
    //   el,
    //   {
    //     scale: 1.1,
    //   },
    //   {
    //     scale: 0.95,
    //     ease: "none",
    //     scrollTrigger: {
    //       trigger: el,
    //       start: "top 70%",
    //       end: "bottom 0%",
    //       scrub: true,
    //     },
    //   }
    // );

    sections.forEach((el) => {
      if (!el) return;

      // First animation
      gsap.fromTo(
        el,
        {
          scale: 1.15,
          y: 120,
          opacity: 0.85,
        },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "top 30%",
            scrub: true,
          },
        }
      );

      // Second animation
      gsap.fromTo(
        el,
        { scale: 1.1 },
        {
          scale: 0.95,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 70%",
            end: "bottom 0%",
            scrub: true,
          },
        }
      );
    });


    ScrollTrigger.refresh();

  }, []);


  return (
    <SmoothScroll>
      <Navbar />
      <div className="main bg-[#d6d6d6] min-h-[200vh]">
        <Hero />

        <Services />


        <div
          id="experience"
          ref={sectionRef}
          style={{ lineHeight: 0, borderRadius: "45px" }}
          className="bg-black next-line-section-saurabh h-full origin-center will-change-transform"
        >
          <Experience />

          <div
            id="about"
            className="lineee h-[2px] w-full bg-[#ffffffdb]"
            style={{ borderRadius: "20px" }}
          ></div>

          <About />
        </div>

        <Works />

        <div
          ref={sectionRef}
          style={{ lineHeight: 0, borderRadius: "45px" }}
          className=" Resume bg-black next-line-section-saurabh h-[80vh] origin-center will-change-transform mt-[20px] mb-[140px]"
        >
          <Resume />
        </div>

        <Lets />

        <div
          ref={sectionRef}
          style={{ lineHeight: 0, borderRadius: "45px" }}
          className=" Contact bg-black next-line-section-saurabh h-[80vh] origin-center will-change-transform mt-[20px] mb-[140px]"
        >
          <Contact />
        </div>


      </div>
    </SmoothScroll>
  );
};

export default App;
