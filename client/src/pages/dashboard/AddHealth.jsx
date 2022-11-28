import { useState } from "react";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { Alert } from "../../Components";
import { useAppContext } from "../../context/appContext";

const initialState = { healthTitle: "", healthDesc: "", healthPhoto: "" };
export const AddHealth = () => {
  const [values, setValues] = useState(initialState);
  const { isLoading, showAlert, displayAlert, clearValues, createHealthPost } =
    useAppContext();

  const onSubmit = (e) => {
    e.preventDefault();
    const { healthTitle, healthDesc } = values;

    if (!healthTitle || !healthDesc) {
      displayAlert();
      return;
    }

    const formdata = new FormData();
    formdata.append("healthTitle", values.healthTitle);
    formdata.append("healthDesc", values.healthDesc);
    formdata.append("healthPhoto", values.healthPhoto);

    createHealthPost(formdata);
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handlePhoto = (e) => {
    setValues({ ...values, healthPhoto: e.target.files[0] });
  };
  return (
    <Wrapper>
      <form className="form" encType="multipart/form-data" onSubmit={onSubmit}>
        <h3>add health post</h3>
        {showAlert && <Alert />}
        <div className="form-row">
          <label htmlFor="title" className="form-label">
            Health Tip Title
          </label>
          <input
            type="text"
            placeholder="what is diabetes"
            name="healthTitle"
            className="form-input"
            value={values.healthTitle}
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <label htmlFor="healthDesc" className="form-label">
            Message
          </label>
          <textarea
            name="healthDesc"
            value={values.healthDesc}
            className="form-textarea"
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <input
            type="file"
            accept=".jpg,.png,.jpeg"
            name="healthPhoto"
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
  );
};
