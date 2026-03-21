import SmoothScroll from "./Components/SmoothScroll";
import About from "./Pages/About";
import Experience from "./Pages/Experience";
import Hero from "./Pages/Hero";
import Services from "./Pages/Services";

const App = () => {
  return (
    <SmoothScroll>
      <div className="main bg-[#d6d6d6] h-[100vh]">
        <Hero />
        <Services />
        <div
          style={{ lineHeight: 0, borderRadius: "35px 35px 0px 0px" }}
          className="bg-black next-line-section-saurabh h-full"
        >
          <Experience />
          <div className="lineee h-[2px] w-full bg-[#ffffffdb]" style={{borderRadius:"20px"}}></div>
           <About/>
        </div>
      </div>
    </SmoothScroll>
  );
};

export default App;
