import Image from "next/image";
import { v2 as cloudinary } from "cloudinary";

import { CloudinaryImage, SearchParams } from "@/types";

import About from "./_components/about";
import HomePageButtons from "./_components/home-page-buttons";
import Socials from "./_components/socials";
import TestimonialsCarousel from "./_components/testimonials-carousel";

interface HomePageProps {
  searchParams: SearchParams;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const results: { resources: CloudinaryImage[] } = await cloudinary.search
    .expression("resource_type:image AND folder:keep-austin-helping")
    .execute();

  const images = results.resources;

  return (
    <div className="flex flex-col">
      <main className="flex h-[100dvh]">
        <div className="flex w-full flex-col justify-between lg:w-[50vw]">
          <HomePageButtons />
          <div className="flex justify-center gap-x-4 px-5">
            <Image
              src={"/logo.png"}
              alt="logo"
              width={200}
              height={100}
              quality={100}
              className="aspect-square w-80"
              loading="lazy"
            />
            <div className="flex flex-col justify-center gap-2 font-merriweather text-6xl font-light text-color2 xl:text-7xl">
              <span>KEEP</span>
              <span>AUSTIN</span>
              <span>HELPING</span>
            </div>
          </div>
          <Socials />
        </div>
        <div className="hidden p-10 lg:block lg:w-[50vw]">
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

      <TestimonialsCarousel query={searchParams} images={images} />
    </div>
  );
}
