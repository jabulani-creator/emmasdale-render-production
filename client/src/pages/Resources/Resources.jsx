import { NewSidebar, PageHero } from "../../Components/GLOBAL";
import {
  BiblePromise,
  Footer,
  SabbathPodcast,
  Resource,
  LatestResource,
} from "../../Components/RESOURCES";

export const Resources = () => (
  <>
    <NewSidebar />
    <PageHero title="RESOURCES" />
    <BiblePromise />
    <SabbathPodcast />
    <Resource />
    <LatestResource />
    <Footer />
  </>
);
