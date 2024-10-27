"use client";

import Marquee from "react-fast-marquee";

const MarqueeText = () => {
  return (
    <div className="fixed bottom-0 z-50 w-full bg-color2 py-1 flex flex-col items-center justify-center text-color1">

      <Marquee 
        gradient={false}
        speed={50}
        className="text-center w-full tracking-wider font-merriweather"
      >
        &quot;The smallest act of kindness is worth more than the grandest
        intention&quot; - Oscar Wilde
      </Marquee>
    </div>
  );
};

export default MarqueeText;
