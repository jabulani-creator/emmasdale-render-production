import Wrapper from "../../../app/assets/wrappers/EventCard";
import Link from "next/link";
import Image from "next/image";

const Card = ({ image, name, message, path }: {
  image?: string;
  name?: string;
  message?: string;
  path: string;
}) => {
  return (
    <Wrapper>
      <div className="relative w-full h-48">
        <Image src={image || ""} alt={name || "Group"} fill className="carousel-image group-image object-cover" />
      </div>

      <div className="Overlay"></div>
      <div className="MessageDesc">
        <h5 className="title">{name}</h5>
        <hr />
        <small>{message}</small>
        <button className="btn ">
          <Link href={path} style={{ cursor: "pointer" }}>
            Learn More
          </Link>
        </button>
      </div>
    </Wrapper>
  );
};

export default Card;
