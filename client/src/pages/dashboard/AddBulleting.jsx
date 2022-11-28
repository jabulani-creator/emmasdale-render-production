import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useState } from "react";
import { Alert } from "../../Components";
import { useAppContext } from "../../context/appContext";

const initialState = { name: "", pdf: "" };
export const AddBulleting = () => {
  const [values, setValues] = useState(initialState);
  const { isLoading, showAlert, clearValues, createBulleting } =
    useAppContext();

  const onSubmit = (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("name", values.name);
    formdata.append("pdf", values.pdf);

    createBulleting(formdata);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handlePhoto = (e) => {
    setValues({ ...values, image: e.target.files[0] });
  };
  return (
    <Wrapper>
      <form className="form" encType="multipart/form-data" onSubmit={onSubmit}>
        <h3>add bulleting</h3>
        {showAlert && <Alert />}
        <div className="form-row">
          <label htmlFor="title" className="form-label">
            date
          </label>
          <input
            type="date"
            name="name"
            className="form-input"
            value={values.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <input type="file" name="postPhoto" onChange={handlePhoto} />
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
