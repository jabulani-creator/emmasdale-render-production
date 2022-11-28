import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useState } from "react";
import { Alert } from "../../Components";
import { useAppContext } from "../../context/appContext";

const initialState = { postTitle: "", postDesc: "", postPhoto: "" };
export const AddPost = () => {
  const [values, setValues] = useState(initialState);
  const { isLoading, showAlert, displayAlert, clearValues, createPost } =
    useAppContext();

  const onSubmit = (e) => {
    e.preventDefault();
    const { postTitle, postDesc } = values;

    if (!postTitle || !postDesc) {
      displayAlert();
      return;
    }

    const formdata = new FormData();
    formdata.append("postTitle", values.postTitle);
    formdata.append("postDesc", values.postDesc);
    formdata.append("postPhoto", values.postPhoto);

    createPost(formdata);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handlePhoto = (e) => {
    setValues({ ...values, postPhoto: e.target.files[0] });
  };
  return (
    <Wrapper>
      <form className="form" encType="multipart/form-data" onSubmit={onSubmit}>
        <h3>add post</h3>
        {showAlert && <Alert />}
        <div className="form-row">
          <label htmlFor="title" className="form-label">
            Post Title
          </label>
          <input
            type="text"
            placeholder="what is depression"
            name="postTitle"
            className="form-input"
            value={values.postTitle}
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <label htmlFor="postDesc" className="form-label">
            Message
          </label>
          <textarea
            name="postDesc"
            value={values.postDesc}
            className="form-textarea"
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <input
            type="file"
            accept=".jpg,.png,.jpeg"
            name="postPhoto"
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
