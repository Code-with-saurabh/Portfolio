import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";

const NavBar = () => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);
    const linksRef = useRef([]);
    const btnRef = useRef(null);
    const tl = useRef(null);

    const socialLinks = [
        { name: "LinkedIn", url: "https://www.linkedin.com/in/saurabh-sharma-64643128b" },
        { name: "GitHub", url: "https://github.com/Code-with-saurabh" },
        { name: "WhatsApp", url: "https://wa.me/919327115687" },
        { name: "Instagram", url: "https://www.instagram.com/_mr_sharma__16" },
        { name: "Twitter", url: "https://x.com/Mr_Saurabh_16" },
    ];

    const links = ["home", "experience", "about", "work", "resume", "contact"];

    useEffect(() => {
        tl.current = gsap.timeline({ paused: true });

        tl.current
            .to(menuRef.current, { x: 0, duration: 0.45, ease: "power3.out" }, 0)
            .fromTo(
                linksRef.current.filter(Boolean),
                { x: 100, opacity: 0 },
                { x: 0, opacity: 1, stagger: 0.04, duration: 0.3, ease: "power2.out" },
                0
            );
    }, []);

    useEffect(() => {
        if (open) {
            tl.current.play();
            document.body.classList.add("overflow-hidden");
        } else {
            tl.current.reverse();
            document.body.classList.remove("overflow-hidden");
        }
    }, [open]);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, []);

    useEffect(() => {
        gsap.fromTo(
            btnRef.current,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
        );
    }, []);

    useEffect(() => {
        let lastScroll = 0;
        let ticking = false;

        const handleScroll = () => {
            const currentScroll = window.scrollY;

            if (Math.abs(currentScroll - lastScroll) < 20) return;

            if (!ticking) {
                window.requestAnimationFrame(() => {
                    if (currentScroll > lastScroll && currentScroll > 80) {
                        gsap.to(btnRef.current, {
                            scale: 0,
                            opacity: 0,
                            duration: 0.6,
                            ease: "power3.out",
                        });
                    } else {
                        gsap.to(btnRef.current, {
                            scale: 1,
                            opacity: 1,
                            duration: 0.6,
                            ease: "power3.out",
                        });
                    }

                    lastScroll = currentScroll;
                    ticking = false;
                });

                ticking = true;
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <div
                ref={btnRef}
                onClick={() => setOpen(!open)}
                role="button"
                aria-label={open ? "Close menu" : "Open menu"}
                tabIndex={0}
                className="fixed z-[60] flex flex-col items-center justify-center gap-1 bg-black rounded-full cursor-pointer w-14 h-14 md:w-20 md:h-20 top-4 right-10"
            >
                <span
                    className={`block w-8 h-0.5 bg-white transition-all duration-300 ${open ? "rotate-45 translate-y-1.5" : ""
                        }`}
                />
                <span
                    className={`block w-8 h-0.5 bg-white transition-all duration-300 ${open ? "-rotate-45 -translate-y-1.5" : ""
                        }`}
                />
            </div>

            <div
                onClick={() => setOpen(false)}
                className={`fixed inset-0 bg-black/40 z-40 transition-all duration-300 ${open ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
            />

            <nav
                ref={menuRef}
                className="fixed top-0 right-0 h-full w-full md:w-1/2 bg-black z-50 px-10 py-24 flex flex-col justify-between translate-x-full"
            >
                <div className="flex flex-col gap-y-6">
                    {links.map((item, i) => {
                        const isResume = item === "resume";
                        return (
                            <a
                                key={i}
                                ref={(el) => (linksRef.current[i] = el)}
                                href={`#${item}`}
                                onClick={() => setOpen(false)}
                                className={`text-6xl md:text-7xl lg:text-[9vh] font-semibold uppercase leading-[1] transition-all duration-300 hover:translate-x-2 ${isResume
                                    ? "text-[#cfa355] hover:text-white"
                                    : "text-[#cccccc] hover:text-white"
                                    }`}
                            >
                                {item}
                            </a>
                        );
                    })}
                </div>

                <div className="flex flex-col gap-8 md:flex-row md:justify-between">
                    <div className="font-light">
                        <p className="tracking-widest text-white/40 uppercase text-sm">
                            E-mail
                        </p>
                        <p className="text-[15px] tracking-widest lowercase text-[#cccccc]">
                            saurabhsharma12166@gmail.com
                        </p>
                    </div>

                    <div className="font-light">
                        <p className="tracking-widest text-white/40 uppercase text-sm">
                            Social Media
                        </p>
                        <div className="flex flex-wrap gap-x-3 mt-2 text-[13px] tracking-widest uppercase text-[#cccccc]">
                            {socialLinks.map((item, i) => (
                                <a
                                    key={i}
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white transition-colors duration-300"
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default NavBar;
