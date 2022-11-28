import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useState } from "react";
import { Alert } from "../Components";
import { useAppContext } from "../context/appContext";

import { Footer, NewSidebar } from "../Components/GLOBAL";

const initialState = { ReviewName: "", ReviewDesc: "", ReviewPhoto: "" };
export const AddReview = () => {
  const [values, setValues] = useState(initialState);
  const { isLoading, showAlert, displayAlert, clearValues, createReview } =
    useAppContext();

  const onSubmit = (e) => {
    e.preventDefault();
    const { ReviewName, ReviewDesc } = values;

    if (!ReviewName || !ReviewDesc) {
      displayAlert();
      return;
    }

    const formdata = new FormData();
    formdata.append("ReviewName", values.ReviewName);
    formdata.append("ReviewDesc", values.ReviewDesc);
    formdata.append("ReviewPhoto", values.ReviewPhoto);

    createReview(formdata);
  };

  // useEffect(() => {
  //   if (!createReview) {
  //     setTimeout(() => {
  //       navigate("/");
  //     }, 3000);
  //   }
  // }, [createReview, navigate]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handlePhoto = (e) => {
    setValues({ ...values, ReviewPhoto: e.target.files[0] });
  };
  return (
    <>
      <NewSidebar />
      <Wrapper>
        <form
          className="form"
          encType="multipart/form-data"
          onSubmit={onSubmit}
        >
          <h3>add a review</h3>
          {showAlert && <Alert />}
          <div className="form-row">
            <label htmlFor="title" className="form-label">
              Name
            </label>
            <input
              type="text"
              placeholder="jane Doe"
              name="ReviewName"
              className="form-input"
              value={values.ReviewName}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <label htmlFor="ReviewDesc" className="form-label">
              Review
            </label>
            <textarea
              name="ReviewDesc"
              value={values.ReviewDesc}
              className="form-textarea"
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <input
              type="file"
              accept=".jpg,.png,.jpeg"
              name="ReviewPhoto"
              onChange={handlePhoto}
            />
          </div>
          <div className="btn-container">
            <button
              className="btn btn-block submit-btn"
              type="submit"
              disabled={isLoading}
            >
              submit
            </button>
            <button
              className="btn btn-block clear-btn"
              onClick={(e) => {
                e.preventDefault();
                clearValues();
              }}
            >
              clear
            </button>
          </div>
        </form>
      </Wrapper>
      <Footer />
    </>
  );
};
