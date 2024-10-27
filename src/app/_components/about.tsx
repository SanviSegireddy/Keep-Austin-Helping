"use client";

import React from "react";
import ParallaxEffect from "./parallax-effect";

function About() {
  return (
    <div className="text-white text-center">
      <ParallaxEffect bgImage="/image4.png">
        <p className="text-center text-5xl font-bold">About Us</p>
        <p className="text-2xl font-semibold">
          Welcome to Keep Austin Helping!
        </p>
        <p className="max-w-4xl text-xl">
          At Keep Austin Helping, we believe in the power of community and the
          potential of our youth. Founded by local highschool students with the
          mission to connect other students and teens in the Austin area with
          meaningful volunteer opportunities, our nonprofit is dedicated to
          fostering a spirit of service and engagement among the next
          generation.
        </p>
      </ParallaxEffect>
      <ParallaxEffect bgImage="/image2.jpg">
        <p className="text-3xl font-semibold">Our Vision</p>
        <p className="max-w-4xl text-xl">
          We envision a vibrant community where young people actively
          participate in service, develop their skills, and make a positive
          impact. By connecting volunteers with local organizations in need, we
          aim to inspire a lifelong commitment to giving back.
        </p>
      </ParallaxEffect>
      <ParallaxEffect bgImage="/image3.jpg">
        <p className="text-3xl font-semibold">What We Do</p>
        <p className="text-xl max-w-4xl">
          Our platform serves as a bridge between students seeking volunteer
          experiences and local nonprofits looking for enthusiastic support.
          Whether it&apos;s environmental initiatives,tutoring programs, or
          community events, we provide a variety of opportunities that cater to
          diverse interests and schedules.
        </p>
      </ParallaxEffect>

      <ParallaxEffect bgImage="/image6.jpg">
        <p className="text-3xl font-semibold">Join Us! </p>
        <p className="font-semibold text-xl max-w-4xl">
          Let’s work together to Keep Austin Helping!
        </p>
        <p className="font-medium text-xl max-w-4xl">
          If you’re a student looking to make a difference or a local
          organization in need of volunteers, we invite you to join our
          community. Thank you for supporting Keep Austin Helping.
        </p>
      </ParallaxEffect>
    </div>
  );
}

export default About;
