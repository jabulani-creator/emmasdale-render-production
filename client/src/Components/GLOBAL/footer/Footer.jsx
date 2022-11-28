import {FaFacebookSquare, FaWhatsappSquare, FaYoutubeSquare} from 'react-icons/fa'
import Wrapper from '../../../assets/wrappers/Footer'

export const Footer = () => {
  return (
     <section className="footer">
    <Wrapper>
        <div className='Mission'>
            <h3 className="mini-header">Mission</h3>
            <small className="subtitle left">
                To Lift up Jesus Christ and Proclaim the Everlasting Gospel to All the World Baptizing them in the name of the Father the Son and the Holy Spirit
            </small>
        </div>
        <div className='Contact'>
        <h3 className="mini-header">Contact</h3>
                <small className='left'>
                    Emmsdale SDA Church <br />
                    Private Bag FW 42 Off Vubu Road <br />
                    Emmasdale Lusaka Zambia <br />
                    +26 0972975737<br />
                    <a href="mailto:jim@rock.com">emmasdale@gmail.com</a><br />
             </small>
        </div>
        <div className='Last'>
        <div className='Socials'>
            <h3 className="mini-header">Socials</h3>
            <div className='left'>
            <li>
               <FaFacebookSquare className='social-icon' /> FaceBook 
            </li>
            <li>
               <FaYoutubeSquare className='social-icon'/> Youtube 
            </li>
            <li>
               <FaWhatsappSquare className='social-icon'/> Whatsapp
            </li>
            </div>
        </div>
        <div className='UsefulLinks'>
        <h3 className="mini-header">Useful Links</h3>
         <div className='left'>
             <li>Sabbath School Podcast</li>
             <li>Adventist Organization</li>
             <li>Adventist World Radio</li>
         </div>
        </div>
        </div>
        
    </Wrapper>
    </section>
  )
}
