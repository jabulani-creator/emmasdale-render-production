import Wrapper from '../../../app/assets/wrappers/Normal'
import Link from "next/link";
import Image from "next/image";

export const NormalFlexReverse = ({title, message, cta, image}) => {
  return (
    <Wrapper>
      <div className='MessageContainer'>
            <h2 className='title left primary'>{title}</h2>
            <p className="subtitle left">{message}</p>
            <Link href='our-beliefs' >
                <button className="btnn">{cta}</button>
                 </Link>
        </div>
        <div className='ImageContainer relative w-full h-[400px]'>
          <Image src={image || ""} alt={title || "Image"} fill className="img object-cover" />
        </div>
    </Wrapper>
  )
}
