import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Lets() {
  const topRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    let speed = 0.105;
    let currentSpeed = speed;
    let direction = 1.25;

    ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const velocity = self.getVelocity();

        direction = velocity > 0 ? 1 : -1;

        currentSpeed = Math.min(Math.abs(velocity) / 2000, 4);
      },
    });

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

    const cleanTop = createMarquee(topRef.current, -1);
    const cleanBottom = createMarquee(bottomRef.current, 1);

    return () => {
      cleanTop();
      cleanBottom();
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <section className="flex flex-col items-center justify-between min-h-screen py-20 gap-12 text-[2rem] overflow-x-hidden w-full">

      {/* 🔝 TOP MARQUEE */}

      <div className="overflow-hidden w-full h-20 md:h-[100px] flex items-center bg-black text-white uppercase">

        <div
          className="flex whitespace-nowrap w-max"
          ref={topRef}
        >
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex">
              {["Innovation", "Precision", "Trust", "Collaboration", "Excellence"].map((item, index) => (
                <>
                  <span
                    key={index}
                    className="px-8 md:px-16 text-lg flex items-center"
                  >
                    {item}
                  </span>

                  <span>✦</span>
                </>
              ))}
            </div>
          ))}
        </div>
      </div>
      {/* ✨ CENTER TEXT */}

      <div className="w-full text-center text-3xl sm:text-5xl font-light leading-relaxed px-6 overflow-hidden">
        <p className="text-[clamp(2rem,6vw,5rem)]">
          “ Let’s build a <br />
          <span className="font-normal">memorable</span> &{" "}
          <span className="italic">inspiring</span> <br />
          web application{" "}
          <span className="text-yellow-500">together</span> “
        </p>
      </div>

      {/* 🔻 BOTTOM MARQUEE */}

      <div className="overflow-hidden w-full h-20 md:h-[100px] flex items-center border-y border-black uppercase">

        <div
          className="flex whitespace-nowrap w-max"
          ref={bottomRef}
        >
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex">
              {[...Array(6)].map((_, index) => (
                <>
                  <span
                    key={index}
                    className="px-8 md:px-16 text-lg flex items-center"
                  >
                    Contact Us
                  </span>

                  <span>▢</span>
                </>
              ))}
            </div>
          ))}
        </div>
      </div>

      </section>
  );
}

export default Lets;
