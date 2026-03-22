import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // TIMELINE (best for sync animation)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 20%",
          scrub: true,
        },
      });

      // ALL ANIMATIONS SYNCED
      tl.from("#title-service-1", {
        y: -150,
        opacity: 0,
      }, 0)

      .from("#title-service-2", {
        x: -300,
        opacity: 0,
      }, 0)

      .from("#title-service-3", {
        x: 300,
        opacity: 0,
      }, 0)

      .from("#title-service-4", {
        y: 150,
        opacity: 0,
      }, 0);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="text-[5rem] h-[80vh] mt-40 overflow-hidden font-light leading-snug text-center mb-1"
    >
      <div id="title-service-1">
        <p>Architecture</p>
      </div>

      <div
        id="title-service-2"
        className="flex items-center justify-center gap-3"
      >
        <p className="font-normal">Creative</p>
        <div className="w-10 h-1 md:w-32 bg-yellow-500"></div>
        <p>Deployment</p>
      </div>

      <div
        id="title-service-3"
        className="flex items-center justify-center gap-3"
      >
        <p>APIs</p>
        <div className="w-10 h-1 md:w-32 bg-yellow-500"></div>
        <p className="italic">Frontends</p>
        <div className="w-10 h-1 md:w-32 bg-yellow-500"></div>
        <p className="font-medium">Scalability</p>
      </div>

      <div id="title-service-4">
        <p>Databases</p>
      </div>
    </section>
  );
};

export default Services;