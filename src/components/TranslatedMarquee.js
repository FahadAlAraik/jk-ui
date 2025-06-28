// components/TranslatedMarquee.jsx
import React from "react";
import Marquee from "react-fast-marquee";

function TranslatedMarquee({ text, direction = "left", speed, delay, textSize, play }) {
  return (
    <Marquee
      play={play}
      speed={speed}
      delay={delay}
      direction={direction}
      style={{ fontSize: textSize, padding: direction === "right" ? "75px" : undefined,overflow:"hidden" }}
    >
      {text}
    </Marquee>
  );
}

export default TranslatedMarquee;
