/* eslint-disable @next/next/no-img-element */
import { Icons } from "@/components/custom/Icons";
import Phone from "@/components/custom/Phone";
import Reviews from "@/components/custom/Reviews";
import StarPurple from "@/components/custom/StarPurple";
import TestimonialCard from "@/components/custom/TestimonialCard";
import CheckMarks from "@/components/custom/CheckMarks";
import H2underline from "@/components/reutilizable/H2underline";
import MaxWidthWrapper from "@/components/reutilizable/MaxWidthWrapper";
import { Check, Star } from "lucide-react";


export default function Home() {
  return (
    <div className="bg-slate-50">

      <section>
        <MaxWidthWrapper className="pb-24 pt-10 lg:grid lg:grid-cols-3 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52">
          <div className="col-span-2 px-6 lg:px-0 lg:pt-4">
            <div className="relative mx-auto text-center lg:text-left flex flex-col items-center lg:items-start">
              <div className="absolute w-28 left-0 -top-20 hidden lg:block">
                <StarPurple className="ml-8" />
              </div>
              <h1 className="relative w-fit tracking-tight text-balance mt-16 font-bold !leading-tight text-gray-900 text-5xl md:text-6xl lg:text-7xl">Your Image on a <span className="bg-[#7C3AED] px-2 text-white">Custom</span> Phone Case</h1>
              <p className="mt-8 text-lg lg:pr-10 max-w-prose text-center lg:text-left text-balance md:text-wrap">
                Capture your favorite memories with your own,
                <span className="font-semibold"> one-of-one</span> phone case. Starpurple allows you to protect your memories, not just your phone case.
              </p>
              <ul className="mt-8 space-y-2 text-left font-medium flex flex-col items-center sm:items-start">
                <div className="space-y-2">
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-green-600" />
                    High-quality, durable material
                  </li>
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-green-600" />
                    5 years print guarantee
                  </li>
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-green-600" />
                    Modern iPhone models supported
                  </li>
                </div>
              </ul>
              <div className="mt-12 flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <div className="flex -space-x-4">
                  <img src="/users/user-1.png" className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100" alt="user image" />
                  <img src="/users/user-2.png" className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100" alt="user image" />
                  <img src="/users/user-3.png" className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100" alt="user image" />
                  <img src="/users/user-4.jpg" className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100" alt="user image" />
                  <img src="/users/user-5.jpg" className="inline-block object-cover h-10 w-10 rounded-full ring-2 ring-slate-100" alt="user image" />
                </div>
                <div className="flex flex-col justify-between items-center sm:items-start">
                  <div className="flex gap-0 5">
                    <Star className="h-4 w-4 text-green-600 fill-green-600" />
                    <Star className="h-4 w-4 text-green-600 fill-green-600" />
                    <Star className="h-4 w-4 text-green-600 fill-green-600" />
                    <Star className="h-4 w-4 text-green-600 fill-green-600" />
                    <Star className="h-4 w-4 text-green-600 fill-green-600" />
                  </div>
                  <p>
                    <span className="font-semibold">1.250 </span>
                    happy customers
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-full lg:col-span-1 w-full flex justify-center px-8 sm:px-16 md:px-0 mt-32 lg:mx-0 lg:mt-20 h-fit">
            <div className="relative md:max-w-xl">
              <img src="/your-image.png" alt="your-image" className="absolute w-40 lg:w-52 left-56 -top-20 select-none hidden sm:block lg:hidden xl:block" />
              <img src="/line.png" alt="line" className="absolute w-20 -left-6 -bottom-6 select-none" />
              {/* Custom component */}
              <Phone
                className="w-64"
                imgSrc="/testimonials/1.jpg" />
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* value proposition section */}
      <section className="bg-slate-100 py-24">
        <MaxWidthWrapper className="flex flex-col items-center gap-16 sm:gap-32">
          <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-6">
            <H2underline firstPhrase="What our" secondPhrase="say" underlinedPhrase="customers" className="pb-2" />
            <StarPurple className="order-0 lg:order-2" />
          </div>

          <div className="space-y-12 mx-auto max-w-2xl grid grid-cols-1 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2 gap-y-16 items-center">
            <TestimonialCard className="mt-12" userImg="/users/user-2.png" userName="Luciana" testimony={`I usually keep my phone together with my keys in my pocket and that led to some pretty heavy sractmarks on all of my last phone cases. This one, besides a barely noticeable scratch on the corner, looks brand new after about half a year. I dig it.`} />
            <TestimonialCard className="pl-4" userImg="/users/user-1.png" userName="Bruno" testimony={`The case feels durable and I even got a compliment on the desing. Had the case for two and a half months now and the image is super clear, on the case I had before, the image started fading into yellow-ish color after couple weeks. Love it.`} />
          </div>
        </MaxWidthWrapper>

        <div className="pt-24">
          <Reviews />
        </div>
      </section>

      <section >
        <MaxWidthWrapper className="py-24">
          <div className="mb-12 px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <H2underline firstPhrase="Upload your photo and get" secondPhrase="now" underlinedPhrase="your own case" className="pb-4" />
            </div>
          </div>
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="relative flex flex-col items-center md:grid grid-cols-2 gap-40 mt-16">
              <img src="/arrow.png" className="absolute top-[25rem] md:top-1/2 -translate-y-1/2 z-10 left-1/2 -translate-x-1/2 rotate-90 md:rotate-0" alt="Arrow" />
              <div className="relative h-80 md:h-full w-full md:justify-self-end max-w-sm rounded-xl bg-gray-900/5 ring-inset ring-gray-900/10 lg:rounded-2xl">
                <img src="/horse.jpg" alt="" className="rounded-md object-cover bg-white shadow-2xl ring-1 ring-gray-900/10 h-full w-full" />
              </div>
              <Phone className="w-60" imgSrc="/horse_phone.jpg" />
            </div>
          </div>
          <CheckMarks />
        </MaxWidthWrapper>
      </section>
    </div>
  );
}

