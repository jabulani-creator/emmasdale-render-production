import Wrapper from "../../../app/assets/wrappers/HeaderLogin"
import Link from "next/link";
export const HeaderLogin = (props) => {
  return (
    <>
    <Wrapper>
      <div className="HeroContainer">
           <h1 className="HeroTitle">
               {props.title}
            </h1>
            <Link href='/register' className='btnn btn-hero'>
             {props.butt}
            </Link>
      </div>
    </Wrapper>
    </>
  )
}
