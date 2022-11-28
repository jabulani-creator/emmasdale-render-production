import React from "react";
import { HealthSearchContainer, PublicHealthContainer } from "../Components";
import { Footer, NewSidebar } from "../Components/GLOBAL";

const AllTheHealthPosts = () => (
  <>
    <NewSidebar />
    <section className="section">
      <HealthSearchContainer />
      <PublicHealthContainer />
    </section>
    <Footer />
  </>
);

export default AllTheHealthPosts;
