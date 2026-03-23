import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Contact() {
  const sectionRef = useRef(null);
  const marqueeRef = useRef(null);


  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/saurabh-sharma-64643128b",
    },
    {
      name: "GitHub",
      url: "https://github.com/Code-with-saurabh",
    },
    {
      name: "WhatsApp",
      url: "https://wa.me/919327115687",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/_mr_sharma__16",
    },
    {
      name: "Twitter",
      url: "https://x.com/Mr_Saurabh_16",
    },

  ];

  useEffect(() => {
    // 🔹 SECTION REVEAL
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );

    // 🔥 SAME LOGIC AS LETS
    let speed = 0.05;
    let currentSpeed = speed;
    let direction = 1;

    ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const velocity = self.getVelocity();

        direction = velocity > 0 ? 1 : -1;
        currentSpeed = Math.min(Math.abs(velocity) / 2000, 3);
      },
    });

    // ✅ SAME MARQUEE FUNCTION
    const createMarquee = (element, dir = 1) => {
      let x = 0;

      const wrap = gsap.utils.wrap(-50, 0);

      const ticker = () => {
        currentSpeed += (speed - currentSpeed) * 0.05;

        x += currentSpeed * dir * direction;
        x = wrap(x);

        gsap.set(element, {
          xPercent: x,
        });
      };

      gsap.ticker.add(ticker);

      return () => gsap.ticker.remove(ticker);
    };

    const cleanMarquee = createMarquee(marqueeRef.current, -1); // same as top

    return () => {
      cleanMarquee();
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="flex flex-col justify-between min-h-screen bg-black text-white"
    >
      {/* 🔝 HEADER */}
      <div>
        <div className="px-10 pt-16">
          <p className="tracking-[0.5rem] uppercase text-lg font-light mb-6">
            You Dream It, I Code It
          </p>

          <h1 className="uppercase text-[clamp(3rem,10vw,9rem)] leading-none">
            CONTACT
          </h1>
        </div>

        {/* Divider */}
        <div className="relative px-10 mt-10">
          <div className="absolute inset-x-0 top-0 h-[2px] bg-white/70"></div>

          <div className="py-12 text-right max-w-3xl ml-auto font-light uppercase text-[2rem] leading-relaxed">
            <p>Got a question or project idea?</p>
            <p>We’d love to hear from you and discuss further!</p>
          </div>
        </div>

        {/* CONTACT INFO */}
        <div className="px-10 mb-16 text-[26px] lg:text-[32px] font-light uppercase">
          <div className="flex flex-col gap-10">

            <div>
              <h2 className="my-5">E-mail</h2>
              <div className="h-px my-2 bg-white/30"></div>
              <p className="text-xl lowercase md:text-2xl lg:text-3xl">
                saurabhsharma12166@gmail.com
              </p>
            </div>

            <div>
              <h2 className="my-5">Phone</h2>
              <div className="h-px my-2 bg-white/30"></div>
              <p className="text-xl lowercase md:text-2xl lg:text-3xl">
                +91 9327115687
              </p>
            </div>

            <div>
              <h2 className="my-5">Social Media</h2>
              <div className="h-px my-2 bg-white/30 "></div>

              <div className="flex flex-wrap gap-3 text-sm md:text-base">
                {socialLinks.map((item, i) => (
                  <a
                    key={i}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white/70 transition"
                  >
                    {"{ " + item.name + " }"}
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 🔻 MARQUEE (SAME AS LETS) */}
      <div className="overflow-hidden w-full h-20 md:h-[100px] flex items-center">
        <div ref={marqueeRef} className="flex whitespace-nowrap">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex">
              {[...Array(6)].map((_, j) => (
                <>
                  <span key={j} className="px-16 text-[clamp(1rem,2vw,2rem)] flex items-center">
                    just imagine, I code
                  </span>
                  <span className="px-16 text-[clamp(1rem,2vw,2rem)] flex items-center" >✦</span>
                </>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Contact;