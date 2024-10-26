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

interface TestimonialsCarouselProps {
  images: CloudinaryImage[];
  query: SearchParams;
}

export default function TestimonialsCarousel({
  images,
  query,
}: TestimonialsCarouselProps) {
  const public_key = query["q"] || "";

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
            <MediaViewer image={image} public_key={public_key} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
