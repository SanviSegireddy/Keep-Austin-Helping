"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CloudinaryImage, SearchParams } from "@/types";
import MediaViewer from "./media-viewer";
import clsx from "clsx";

interface TestimonialsCarouselProps {
  images: CloudinaryImage[];
  query: SearchParams;
}

export default function TestimonialsCarousel({
  images,
  query,
}: TestimonialsCarouselProps) {
  const public_key = query["q"] || "";

  const length = images.length;

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="flex w-fit justify-center"
    >
      <CarouselContent className="w-80 max-w-7xl md:w-[640px] lg:w-[960px] xl:w-full">
        {images.map((image, index) => (
          <CarouselItem
            key={index}
            className={clsx("w-fit", {
              "md:basis-1/2": length === 2,
              "lg:basis-1/3": length === 3,
              "xl:basis-1/4": length === 4,
            })}
          >
            <MediaViewer image={image} public_key={public_key} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
