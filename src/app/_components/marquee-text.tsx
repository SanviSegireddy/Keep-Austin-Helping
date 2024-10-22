"use client";
import Marquee from "react-fast-marquee";

const MarqueeText: React.FC = () => {
  return (
    <div className="fixed bottom-0 z-50 w-full bg-color5 py-1 flex flex-col items-center justify-center text-color1">
      {/* <p className="text-sm">
        Call us at +1 (737) 270-5483 | Insta DM @keepaustinhelping | mail us at
        keepaustinhelping@gmail.com
      </p> */}

      <Marquee
        gradient={false}
        speed={50}
        className="text-center w-full tracking-wider"
      >
        &quot;The smallest act of kindness is worth more than the grandest
        intention&quot; - Oscar Wilde
      </Marquee>
    </div>
  );
};

export default MarqueeText;
