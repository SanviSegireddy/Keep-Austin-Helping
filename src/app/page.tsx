import Image from "next/image";
import cloudinary from "cloudinary";

import { CloudinaryImage, SearchParams } from "@/types";

import About from "./_components/about";
import HomePageButtons from "./_components/home-page-buttons";
import Socials from "./_components/socials";
import TestimonialsCarousel from "./_components/testimonials-carousel";

interface HomePageProps {
  searchParams: SearchParams;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const results: { resources: CloudinaryImage[] } = await cloudinary.v2.search
    .expression("resource_type:image AND folder:keep-austin-helping")
    .max_results(4)
    .execute();

  const images = results.resources;

  return (
    <div className="flex flex-col">
      <main className="flex h-[96dvh]">
        <div className="flex w-[50vw] flex-col justify-between">
          <HomePageButtons />
          <div className="flex justify-center gap-x-4">
            <Image
              src={"/logo.png"}
              alt="logo"
              width={200}
              height={100}
              quality={100}
              className="aspect-square w-80"
              loading="lazy"
            />
            <div className="flex flex-col justify-center gap-2 font-merriweather text-7xl font-light text-color2">
              <span>KEEP</span>
              <span>AUSTIN</span>
              <span>HELPING</span>
            </div>
          </div>
          <Socials />
        </div>
        <div className="w-[50vw] p-10">
          <Image
            src="/image6.jpg"
            alt="image"
            width={300}
            height={200}
            className="h-full w-full rounded-lg object-cover"
            loading="lazy"
          />
        </div>
      </main>
      <About />

      {images.length > 0 && (
        <div className="flex flex-col items-center justify-center gap-2 pb-20 pt-10">
          <p className="font-merriweather-900 text-center text-3xl text-color2">
            Our Testimonials:
          </p>
          <TestimonialsCarousel query={searchParams} images={images} />
        </div>
      )}
    </div>
  );
}
