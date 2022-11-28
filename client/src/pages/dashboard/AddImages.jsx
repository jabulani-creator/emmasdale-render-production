import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useState } from "react";
import { Alert, FormRowSelect } from "../../Components";
import { useAppContext } from "../../context/appContext";

const initialState = { image: "", department: "" };
export const AddImages = () => {
  const [values, setValues] = useState(initialState);
  const { isLoading, showAlert, clearValues, uploadImage, departmentOptions } =
    useAppContext();

  const onSubmit = (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("image", values.image);
    formdata.append("department", values.department);

    uploadImage(formdata);
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
        <h3>add to Gallery</h3>
        {showAlert && <Alert />}
        <FormRowSelect
          labelText="department"
          name="department"
          value={values.department}
          list={departmentOptions}
          handleChange={handleChange}
          s
        />

        <div className="form-row">
          <input
            type="file"
            accept=".jpg,.png,.jpeg"
            name="image"
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
