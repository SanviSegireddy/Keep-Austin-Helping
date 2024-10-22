"use client";

import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CldImage } from "next-cloudinary";
import { Testimonial } from "@prisma/client";

interface ImageCarouselProps {
  images: Testimonial[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-7xl"
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
            <div className="p-1">
              <CldImage
                src={image.url}
                alt="image"
                width={300}
                height={200}
                className="w-80 h-60 object-cover rounded-lg"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
