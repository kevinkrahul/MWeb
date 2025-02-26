import { cn } from "@/lib/utils";
import { CiBacon } from "react-icons/ci";
import { LuCircleParking,LuVegan } from "react-icons/lu";
import { MdTempleHindu } from "react-icons/md";
import { TbSpeakerphone } from "react-icons/tb";
import { LiaChairSolid } from "react-icons/lia";






export default function FeaturesSectionDemo({children}:{children:React.ReactNode}) {
  const features = [
    {
      title: "Creative Powerhouse",
      description:
        "Data-driven strategies fuel our creative brilliance, driving unparalleled results and setting clients apart.",
      icon: <CiBacon />,
    },
    {
      title: "Homegrown Talent",
      description:
        "India's only top agency with in-house creatives, we blend expertise for cutting-edge strategies.",
      icon: <LuCircleParking />,
    },
    {
      title: "Data-Driven Decisions",
      description:
        "Our refined analytical infrastructure ensures informed choices that yield results.",
      icon: <MdTempleHindu />,
    },
    {
      title: "Results That Speak",
      description: "#1 on Clutch, industry-leading outcomes, 96% retention rate. That's our difference.",
      icon: <TbSpeakerphone />,
    },
    {
      title: "Transparent Communication",
      description: "Full account access and service visibility for your peace of mind.",
      icon: <LuVegan />,
    },
    {
      title: "ROI-Focused Partnerships",
      description:
        "Shorter terms, lower set-up fees. We're driven to deliver results faster.",
      icon: <LiaChairSolid />,
    },
    {
        title: "Communication",
        description: "Full account access and service visibility for your peace of mind.",
        icon: <LuVegan />,
      },
      {
        title: "Partnerships",
        description:
          "Shorter terms, lower set-up fees. We're driven to deliver results faster.",
        icon: <LiaChairSolid />,
      },
      {
        title: "Decisions",
        description:
          "Our refined analytical infrastructure ensures informed choices that yield results.",
        icon: <MdTempleHindu />,}
  ];
  return (
    <>
    <div>
      <h1 className="text-[clamp(6vh,5vw,7rem)] text-center font-medium  pt-2 md:p-3 max-sm:mt-6">
        {children}
      </h1>
    </div>
    <div className="grid grid-cols-1 col-span-full md:grid-cols-2 lg:grid-cols-3 relative z-10 py:10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
    </>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <>
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 3 || index===6) && "lg:border-l dark:border-neutral-800",
        index < 6 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 6 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 3 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-brand_yellow transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
    </>

  );
};