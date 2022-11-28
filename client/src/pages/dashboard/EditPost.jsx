import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useEffect, useState } from "react";
import { Alert } from "../../Components";
import { useAppContext } from "../../context/appContext";
import axios from "axios";
import { useParams } from "react-router-dom";

const initialState = { postTitle: "", postDesc: "", postPhoto: "" };
export const EditPost = () => {
  const { postId } = useParams();
  const [values, setValues] = useState(initialState);
  const [isLoading, setIsLoading] = useState(true);

  const { showAlert, displayAlert, editPost, token, clearValues } =
    useAppContext();

  useEffect(() => {
    const getSinglePost = async () => {
      try {
        const response = await axios.get(`/api/v1/posts/${postId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setValues(response.data);
        setIsLoading(false);
      } catch (error) {}
    };
    getSinglePost(postId);
    // eslint-disable-next-line
  }, [postId]);

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
    editPost(postId, formdata);
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
        <h3>edit post</h3>
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
