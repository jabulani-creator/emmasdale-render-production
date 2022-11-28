import { useEffect } from "react";
import Wrapper from "../../assets/wrappers/JobsContainer";
import Loading from "../../Components/Loading";
import ImageGallery from "./ImageGallery";
import { useAppContext } from "../../context/appContext";

const ImagaContainer = () => {
  const {
    getPhotos,
    images,
    isLoading,
    // totalImages,
    search,
    // numOfImagePages,
    page,
    searchDepartment,
  } = useAppContext();

  useEffect(() => {
    getPhotos();
    // eslint-disable-next-line
  }, [search, page, searchDepartment]);

  if (isLoading) {
    return <Loading />;
  }
  if (images.length === 0) {
    return (
      <Wrapper>
        <h2>NO Photos to display</h2>
      </Wrapper>
    );
  }
  return (
    <main>
      <section className="photos">
        <div className="photos-center">
          {images.map((img) => {
            return <ImageGallery key={img._id} {...img} />;
          })}
        </div>
        {isLoading && <h2 className="loading">Loading...</h2>}
      </section>
    </main>
  );
};

export default ImagaContainer;
