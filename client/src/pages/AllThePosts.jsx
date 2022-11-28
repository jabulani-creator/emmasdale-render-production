import React from "react";
import { PostsContainerPublic, SearchContainer } from "../Components";
import { Footer, NewSidebar } from "../Components/GLOBAL";

const allThePosts = () => (
  <>
    <NewSidebar />
    <section className="section">
      <SearchContainer />
      <PostsContainerPublic />
    </section>
    <Footer />
  </>
);

export default allThePosts;
