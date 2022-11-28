import { History, Values } from "../../Components/ABOUT";
import { Footer, NewSidebar, Normal, PageHero } from "../../Components/GLOBAL";
import { Review } from "../../Components/HOME";

export const OurHistory = () => {
  return (
    <>
      <NewSidebar />
      <PageHero />
      <History />
      <Normal
        title="our mission"
        paragraph="  To Lift up Jesus Christ and Proclaim the Everlasting Gospel to All the World Baptizing them in the name of the Father the Son and the Holy Spirit"
      />
      <Values />
      <Review />
      <Footer />
    </>
  );
};
