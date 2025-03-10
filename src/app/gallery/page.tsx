import { AuroraText } from "@/components/magicui/aurora-text";
import Galcard from "@/components/ui/galcard";
import GalGrid from "@/components/ui/galgrid";
import DImage from "@/components/ui/displayImage";

export default function Gallery() {
  return (
    <section className="justify-center items-center w-full h-auto">
      <h1
        className="font-medium text-center p-3 md:p-3"
        style={{ fontSize: "clamp(35px, 5vw, 60px)" }}
      >
        A Canvas of Moments
      </h1>

      <div>
        <h1
          className="flex flex-col justify-center items-center font-medium p-3 md:p-3"
          style={{ fontSize: "clamp(20px, 4vw, 30px)" }}
        >
          <AuroraText>Decorations</AuroraText>
        </h1>
        <div>
          <Galcard />
        </div>
      </div>
      <div>
        <h1
          className="flex flex-col justify-center items-center font-medium p-3 md:p-3"
          style={{ fontSize: "clamp(20px, 4vw, 30px)" }}
        >
          <AuroraText>Events</AuroraText>
        </h1>
        <div>
          <GalGrid />
        </div>
      </div>
      <div>
        <h1
          className="flex flex-col justify-center items-center font-medium p-3 md:p-3"
          style={{ fontSize: "clamp(20px, 4vw, 30px)" }}
        >
          <AuroraText>Aminities</AuroraText>
        </h1>
        <div>
          <Galcard reverse={true} />
        </div>
      </div>
        <DImage />
    </section>
  );
}
