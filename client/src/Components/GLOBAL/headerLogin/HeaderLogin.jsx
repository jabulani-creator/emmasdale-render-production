import Wrapper from "../../../assets/wrappers/HeaderLogin"
import { Link } from "react-router-dom"
export const HeaderLogin = (props) => {
  return (
    <>
    <Wrapper>
      <div className="HeroContainer">
           <h1 className="HeroTitle">
               {props.title}
            </h1>
            <Link to='/register' className='btnn btn-hero'>
             {props.butt}
            </Link>
      </div>
    </Wrapper>
    </>
  )
}
