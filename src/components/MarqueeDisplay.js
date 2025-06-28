// components/MarqueeDisplay.jsx
import React from "react";
import TranslatedMarquee from "./TranslatedMarquee";

function MarqueeDisplay({ texts, speed, delay, textSize, play }) {
  return (
    <div className="translated-text">
      <TranslatedMarquee text={texts.text_en} speed={speed} delay={delay} textSize={textSize} play={play} />
      <hr />
      <TranslatedMarquee text={texts.text_ur} direction="right" speed={speed} delay={delay} textSize={textSize} play={play} />
      <hr />
      <TranslatedMarquee text={texts.text_bn} speed={speed} delay={delay} textSize={textSize} play={play} />
    </div>
  );
}

export default MarqueeDisplay;
