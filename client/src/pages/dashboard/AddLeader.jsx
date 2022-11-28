import { useState } from "react";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { Alert, FormRow } from "../../Components";
import { useAppContext } from "../../context/appContext";

const initialState = {
  name: "",
  email: "",
  phone: "",
  position: "",
  photo: "",
};
export const AddLeader = () => {
  const [values, setValues] = useState(initialState);
  const { isLoading, showAlert, createPosition, clearValues } = useAppContext();

  const onSubmit = (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("name", values.name);
    formdata.append("email", values.email);
    formdata.append("position", values.position);
    formdata.append("phone", values.phone);
    formdata.append("photo", values.photo);

    createPosition(formdata);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handlePhoto = (e) => {
    setValues({ ...values, photo: e.target.files[0] });
  };

  return (
    <Wrapper>
      <form className="form" encType="multipart/form-data" onSubmit={onSubmit}>
        <h3>Add Department Head</h3>
        {showAlert && <Alert />}
        <FormRow
          type="text"
          placeholder="victoria nswila"
          name="name"
          value={values.name}
          handleChange={handleChange}
        />
        <FormRow
          type="text"
          placeholder="pathfinder leader"
          name="position"
          value={values.position}
          handleChange={handleChange}
        />
        <FormRow
          type="text"
          placeholder="0976975737"
          name="phone"
          value={values.phone}
          handleChange={handleChange}
        />
        <FormRow
          type="text"
          placeholder="victoria@gmail.com"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        <div className="form-row">
          <input
            type="file"
            accept=".jpg,.png,.jpeg"
            name="photo"
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
            type="submit"
            className="btn btn-block clear-btn"
            disabled={isLoading}
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
