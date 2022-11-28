import { useEffect, useState } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { FaQuoteRight } from "react-icons/fa";
import { useAppContext } from "../../context/appContext";
import { Link } from "react-router-dom";
const Review = () => {
  const { getReviews, reviews } = useAppContext();
  const [index, setIndex] = useState(0);
  useEffect(() => {
    getReviews();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    const lastIndex = reviews.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, reviews]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 9000);
    return () => {
      clearInterval(slider);
    };
  }, [index]);

  return (
    <section className="section">
      <h1 className="title primary">What we love about emmasdale sda church</h1>
      <div className="section-center-slider">
        {reviews.map((person, personIndex) => {
          const { _id, ReviewPhoto, ReviewName, ReviewDesc } = person;

          let position = "nextSlide";
          if (personIndex === index) {
            position = "activeSlide";
          }
          if (
            personIndex === index - 1 ||
            (index === 0 && personIndex === reviews.length - 1)
          ) {
            position = "lastSlide";
          }

          return (
            <article className={position} key={_id}>
              <img src={ReviewPhoto} alt={ReviewName} className="person-img" />
              <h4>{ReviewName}</h4>
              <p className="text">{ReviewDesc}</p>
              <FaQuoteRight className="icon" />
            </article>
          );
        })}
        <button className="prev" onClick={() => setIndex(index - 1)}>
          <FiChevronLeft />
        </button>
        <button className="next" onClick={() => setIndex(index + 1)}>
          <FiChevronRight />
        </button>
      </div>
      <button className="btn" style={{ marginBottom: "20px" }}>
        <Link to={`/add-review`}>Add Review</Link>
      </button>
    </section>
  );
};

export default Review;
