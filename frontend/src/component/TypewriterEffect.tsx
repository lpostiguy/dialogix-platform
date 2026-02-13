import { useEffect, useState } from "react";

import speakerPng from "../assets/images/speaker.png";

const TypewriterEffect = ({
  text,
  speed = 30,
}: {
  text: string;
  speed?: number;
}) => {
  const [displayedText, setDisplayedText] = useState("");

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

useEffect(() => {
  setDisplayedText("");

  let currentIdx = 0;

  const timer = setInterval(() => {
    const nextChar = text[currentIdx];

    if (nextChar !== undefined) {
      setDisplayedText((prev) => prev + nextChar);
      currentIdx++;
    }

    if (currentIdx >= text.length) {
      clearInterval(timer);
    }
  }, speed);

  return () => clearInterval(timer);
}, [text, speed]);

  return (
    <span>
      {displayedText}
      {displayedText.length < text.length - 1 ? (
        <span className="inline-block w-0.5 h-5 ml-1 bg-slate-800 animate-pulse align-middle" />
      ) : (
        <button
          className="m-1 p-2 rounded-full bg-slate-200 hover:bg-slate-300 duration-300 ease-in-out"
          onClick={() => speak(text)}
        >
          <img src={speakerPng} className="w-3" alt="" />
        </button>
      )}
    </span>
  );
};

export default TypewriterEffect;
