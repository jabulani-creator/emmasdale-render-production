import { NewSidebar } from "../../Components/GLOBAL";
import {
  Footer,
  Header,
  Worship,
  Pastor,
  ConnectGroup,
  HealthMain,
  Events,
  Prayer,
  Podcast,
  Tithe,
  SabbathSchool,
  WeeklyBulleting,
  Figuring,
  Review,
} from "../../Components/HOME";

export const Home = () => {
  return (
    <>
      <NewSidebar />
      <Header />
      <Worship />
      <Pastor />
      <ConnectGroup />
      <HealthMain />
      <Events />
      <Prayer />
      <Podcast />
      <Tithe />
      <SabbathSchool />
      <WeeklyBulleting />
      <Figuring />
      <Review />
      <Footer />
    </>
  );
};
