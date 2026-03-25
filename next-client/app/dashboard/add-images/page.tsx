"use client";

import Wrapper from "../../../app/assets/wrappers/DashboardFormPage";
import { useState } from "react";
import { Alert, FormRowSelect } from "../../../components";
import { useDataStore } from "../../../store/useDataStore";
import { useUIStore } from "../../../store/useUIStore";
import { useFormStore } from "../../../store/useFormStore";

const initialState = { image: "", department: "" };
export default function AddImages() {
  const [values, setValues] = useState(initialState);
  const { isLoading, uploadImage } = useDataStore();
  const { showAlert } = useUIStore();
  const { clearValues, departmentOptions } = useFormStore();

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
