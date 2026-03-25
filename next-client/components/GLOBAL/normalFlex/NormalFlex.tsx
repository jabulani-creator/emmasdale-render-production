import Wrapper from "../../../app/assets/wrappers/Normal";
import Image from "next/image";

export const NormalFlex = ({ title, message, time, service, image, learn, path }: {
  title?: string;
  message?: string;
  time?: string;
  service?: string;
  image?: string;
  learn?: string;
  path?: string;
}) => {
  return (
    <Wrapper>
      <div className="ImageContainer relative w-full h-[400px]">
        <Image src={image || ''} alt={title || "Image"} fill className="img object-cover" />
      </div>
      <div className="MessageContainer">
        <h2 className="left_align  primary">{title}</h2>
        <p className="subtitle left">{message}</p>
        <h5 className="Time">
          {service} {time}
        </h5>
      </div>
    </Wrapper>
  );
};
