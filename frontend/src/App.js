import { useEffect, useRef, useState } from "react";
import LandingPage from "./components/LandingPage";
import VoiceAssistant from "./components/VoiceAssistant";

export default function App() {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // sections as functions instead of JSX, so we can pass props
  const sections = [
    <LandingPage goToVoiceAssistant={() => setCurrentIndex(1)} />,
    <VoiceAssistant />,
  ];

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();

      if (e.deltaY > 0 && currentIndex < sections.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else if (e.deltaY < 0 && currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
      }
    };

    const node = containerRef.current;
    node.addEventListener("wheel", handleWheel, { passive: false });

    return () => node.removeEventListener("wheel", handleWheel);
  }, [currentIndex, sections.length]);

  useEffect(() => {
    const node = containerRef.current.children[currentIndex];
    node.scrollIntoView({ behavior: "smooth" });
  }, [currentIndex]);

  return (
    <div ref={containerRef} className="h-screen w-screen overflow-hidden">
      {sections.map((Section, idx) => (
        <div key={idx} className="h-screen w-screen">
          {Section}
        </div>
      ))}
    </div>
  );
}
