import Link from "next/link";
import Image from "next/image";
import Wrapper from "../../../app/assets/wrappers/EventCard";

export const Mini = ({ image, path, name }: {
  image?: string;
  path?: string;
  name?: string;
}) => {
  return (
    <Wrapper>
      <Link href={path || ""}>
        <div className="relative w-full h-48">
          <Image src={image || ""} alt={name || "Event"} fill className="img object-cover" />
        </div>
        <div className="Overlay"></div>
        <div className="MessageDesc">
          <h4 className="title" style={{ color: "#fff", fontWeight: "700" }}>
            {name}
          </h4>
        </div>
      </Link>
    </Wrapper>
  );
};
