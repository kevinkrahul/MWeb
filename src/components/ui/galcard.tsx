"use client";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import Image from "next/image";
import { motion } from "framer-motion";
import { useImageStore } from "@/app/services/imageStore";
import { Skeleton } from "./skeleton";

import useImage from "@/app/admin/Actions/useImage";

interface Props {
  reverse?: boolean;
}

const Galcard = ({ reverse = false }: Props) => {
  const { image,loading } = useImage();
  const setSelectedImage = useImageStore((state) => state.setSelectedImage);


  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden mb-10">
      {loading ? (
        <div className="flex gap-4">
          <Skeleton className="w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] rounded-xl bg-pink-100 dark:bg-neutral-700" />
          <Skeleton className="w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] rounded-xl bg-pink-100 dark:bg-neutral-700" />
          <Skeleton className="w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] rounded-xl bg-pink-100 dark:bg-neutral-700" />
          <Skeleton className="w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] rounded-xl bg-pink-100 dark:bg-neutral-700" />
          <Skeleton className="w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] rounded-xl bg-pink-100 dark:bg-neutral-700" />
          <Skeleton className="w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] rounded-xl bg-pink-100 dark:bg-neutral-700" />

        </div>
      ) : (
      <Marquee pauseOnHover reverse={reverse} className="[--duration:40s]">
        {image
          .filter((img) => img.catid == (reverse ? 5 : 7))
          .map((img, index) => (
            <motion.figure
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
              onClick={() =>
                setSelectedImage(
                  img.url.startsWith("http") ? img.url : `/${img.url}`
                )
              }
              className={cn(
                "relative h-[250px] w-[250px] sm:w-[300px] sm:h-[300px] cursor-pointer overflow-hidden rounded-xl border",
                // light styles
                "border-rose-900/[.1] bg-rose-300/[.05] hover:bg-gray-950/[.05]",
                // dark styles
                "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-pink-300/[.2]"
              )}
            >
              <Image
                className="w-full h-full object-cover opacity-0 animate-fadeIn"
                width="300"
                height="300"
                alt={`Gallery Image ${index + 1}`}
                src={img.url.startsWith("http") ? img.url : `/${img.url}`}
              />
            </motion.figure>
          ))}
      </Marquee>)}

      <div className="pointer-events-none absolute inset-y-0 left-0 md:w-1/4 w-1/6  bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 md:w-1/4 w-1/6 bg-gradient-to-l from-background"></div>
    </div>
  );
};

export default Galcard;
