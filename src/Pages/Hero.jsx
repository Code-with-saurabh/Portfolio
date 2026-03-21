import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Services from "./Services";

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // Animate heading
      gsap.from(".hero-title span", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });

      // Animate subtitle text
      gsap.from(".hero-subtext span", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        delay: 0.5,
        ease: "power2.out",
      });

      // Animate top line
      gsap.from(".hero-line", {
        scaleX: 0,
        duration: 1,
        transformOrigin: "left",
        ease: "power2.out",
      });

    }, heroRef);

    return () => ctx.revert(); // cleanup
  }, []);

  return (
    <section ref={heroRef} id="home" className="flex flex-col justify-end  h-[100vh]">
      <header>
        
        <div className="[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]">
          <div className="flex flex-col justify-center gap-12 pt-16 sm:gap-16">
            
            <p className="tracking-[0.5rem] uppercase px-10 text-black text-sm sm:text-base md:text-lg lg:text-xl font-medium">
              Full Stack MERN Developer
            </p>

            <div className="px-3">
              <h1
                className="hero-title flex flex-col gap-12 uppercase font-normal banner-text-responsive text-[5rem] sm:text-[3rem] md:text-[10rem] sm:gap-16 md:block pb-5 text-black"
                aria-label="Saurabh Sharma"
              >
                <span>Saurabh</span>
                <span> Sharma</span>
              </h1>
            </div>

          </div>
        </div>

        <div className="relative px-10 text-black text-[1.5rem]">
          
          <div className="hero-line absolute inset-x-0 border-t-2"></div>

          <div className="py-12 sm:py-16 text-end">
            <div className="hero-subtext font-light uppercase value-text-responsive text-black">
              
              <span className="block leading-relaxed tracking-wide text-pretty">
                Building Premium Scalable SaaS Platforms &amp;
              </span>

              <span className="block leading-relaxed tracking-wide text-pretty">
                Performance-First Web Applications.
              </span>

              <span className="block leading-relaxed tracking-wide text-pretty">
                React.js · Node.js · MongoDB · System Architecture
              </span>

            </div>
          </div>

        </div>

      </header>
  
    </section>
  );
};

export default Hero;