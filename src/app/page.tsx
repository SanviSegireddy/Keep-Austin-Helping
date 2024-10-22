import Image from "next/image";
import About from "./_components/about";
import ImageCarousel from "./_components/carousel";
import HomePageButtons from "./_components/home-page-buttons";
import Socials from "./_components/socials";
import { db } from "@/lib/db";

export default async function Home() {
  const images = await db.testimonial.findMany();

  return (
    <div className="flex flex-col ">
      <main className="flex h-[96dvh]">
        <div className="flex flex-col w-[50vw] justify-between">
          <HomePageButtons />
          <div className="flex justify-center gap-x-4">
            <Image
              src={"/logo.png"}
              alt="logo"
              width={200}
              height={100}
              quality={100}
              className="w-80 aspect-square"
            />
            <div className="flex flex-col gap-2 text-color2 text-6xl font-light justify-center font-town">
              <span>KEEP</span>
              <span>AUSTIN</span>
              <span>HELPING</span>
            </div>
          </div>
          <Socials />
        </div>
        <div className="p-10 w-[50vw]">
          <Image
            src="/image6.jpg"
            alt="image"
            width={300}
            height={200}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </main>
      <About />

      {images.length > 0 && (
        <div className="flex flex-col gap-2 items-center justify-center pt-10 pb-20">
          <p className="text-3xl text-center font-semi-bold text-color2">
            Our Testimonials
          </p>
          <ImageCarousel images={images} />
        </div>
      )}
    </div>
  );
}
