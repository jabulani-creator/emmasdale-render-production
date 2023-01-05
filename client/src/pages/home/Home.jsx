import { NewSidebar } from "../../Components/GLOBAL";
import React from "react";
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
import { useAppContext } from "../../context/appContext";
import { Navigate } from "react-router-dom";

export const Home = () => {
  const { user } = useAppContext();
  return (
    <React.Fragment>
      {user && <Navigate to="/admin" />}
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
    </React.Fragment>
  );
};
