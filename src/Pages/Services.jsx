import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "top 25%",
          scrub: 1,
        },
      });

      tl.from(".service-1", {
        y: -120,
        opacity: 0,
        duration: 1,
      }, 0)
        .from(".service-2", {
          x: -200,
          opacity: 0,
          duration: 1,
        }, 0)
        .from(".service-3", {
          x: 200,
          opacity: 0,
          duration: 1,
        }, 0)
        .from(".service-4", {
          y: 120,
          opacity: 0,
          duration: 1,
        }, 0);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        w-full 
        min-h-[70vh] 
        flex flex-col justify-center 
        overflow-hidden 
        mt-10
        lg:mt-24 mb-10
      "
    >
      <div className="max-w-[1400px] mx-auto px-4 text-center space-y-6">

        {/* TEXT SIZE FIXED FOR ALL SCREENS */}
        <div className="text-[clamp(2rem,6vw,5rem)] leading-tight font-light">

          <div className="service-1">
            <p>Architecture</p>
          </div>

          <div className="service-2 flex items-center justify-center gap-3 flex-wrap">
            <p className="font-normal">Creative</p>
            <div className="w-8 md:w-24 h-[2px] bg-yellow-500"></div>
            <p>Deployment</p>
          </div>

          <div className="service-3 flex items-center justify-center gap-3 flex-wrap">
            <p>APIs</p>
            <div className="w-8 md:w-24 h-[2px] bg-yellow-500"></div>
            <p className="italic">Frontends</p>
            <div className="w-8 md:w-24 h-[2px] bg-yellow-500"></div>
            <p className="font-medium">Scalability</p>
          </div>

          <div className="service-4">
            <p>Databases</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Services;