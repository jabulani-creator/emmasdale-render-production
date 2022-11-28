import { NewSidebar, PageHero } from "../../Components/GLOBAL";
import { Footer, ImagaContainer, MediaSearch } from "../../Components/MEDIA";

export const Media = () => {
  return (
    <>
      <NewSidebar />
      <PageHero title="MEDIA" />
      <MediaSearch />
      <ImagaContainer />
      <Footer />
    </>
  );
};
