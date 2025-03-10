"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import {useImageStore} from "@/app/services/imageStore";
import im1 from "../../../public/gal/1.jpeg";
import im2 from "../../../public/gal/2.jpeg";
import im3 from "../../../public/gal/3.jpeg";
import im4 from "../../../public/gal/4.jpeg";
import im5 from "../../../public/gal/5.jpeg";
import im6 from "../../../public/gal/6.jpeg";
import im7 from "../../../public/gal/7.jpeg";
import im8 from "../../../public/gal/8.webp";
import im9 from "../../../public/gal/9.jpeg";
import im10 from "../../../public/gal/10.jpeg";
import im11 from "../../../public/gal/11.jpeg";

const image = [im1, im2, im3, im4, im5, im6, im7, im8,im9,im10,im11];
const gridClasses = [
  "col-span-6 row-span-2 md:col-span-4 md:row-span-3",
  "col-span-6 row-span-2 md:col-span-4 md:row-span-3",
  "col-span-6 row-span-2 md:col-span-4 md:row-span-3",
  "col-span-6 row-span-4 md:col-span-3 md:row-span-3",
  "col-span-6 row-span-2 md:col-span-6 md:row-span-3",
  "col-span-12 row-span-2 md:col-span-3 md:row-span-6",
  "col-span-6 row-span-2 md:col-span-3 md:row-span-3",
  "col-span-6 row-span-2 md:col-span-3 md:row-span-3",
  "col-span-6 row-span-4 md:col-span-3 md:row-span-3",
  "col-span-6 row-span-2 md:col-span-8 md:row-span-3",
  "col-span-6 row-span-2 md:col-span-4 md:row-span-3",
];


const GalGrid = () => {
  const setSelectedImage = useImageStore((state)=>state.setSelectedImage); 

  return (
    <div className=" flex w-full items-center justify-center overflow-hidden mb-10">
      <div className="grid grid-flow-row p-2 w-[90vw] md:w-[70vw] h-[150vh] md:h-[95vh] grid-cols-12 grid-rows-12 md:gap-4 gap-2">
          {image.map((src,index)=>(
             <motion.div
             key={index}
             whileHover={{ scale: 1.03 }}
             transition={{ duration: 0.7 }}
             onClick={()=>setSelectedImage(src)}
             className={`flex items-center justify-center rounded-xl overflow-hidden ${gridClasses[index]}`}
           >
             <Image src={src} alt="" className="w-full h-full object-cover opacity-0 animate-fadeIn" />
           </motion.div>

          ))}
      </div>
    </div>
  );
};

export default GalGrid;
