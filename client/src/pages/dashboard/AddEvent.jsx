import { useState } from "react";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { Alert } from "../../Components";
import { useAppContext } from "../../context/appContext";

const initialState = {
  eventTitle: "",
  eventDate: "",
  venue: "",
  time: "",
  eventPhoto: "",
};
export const AddEvent = () => {
  const [values, setValues] = useState(initialState);
  const { isLoading, showAlert, displayAlert, clearValues, createEvent } =
    useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !values.eventTitle ||
      !values.eventDate ||
      !values.venue ||
      !values.time
    ) {
      displayAlert();
      return;
    }

    const formdata = new FormData();
    formdata.append("eventTitle", values.eventTitle);
    formdata.append("eventDate", values.eventDate);
    formdata.append("venue", values.venue);
    formdata.append("time", values.time);
    formdata.append("eventPhoto", values.eventPhoto);

    createEvent(formdata);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handlePhoto = (e) => {
    setValues({ ...values, eventPhoto: e.target.files[0] });
  };
  return (
    <Wrapper>
      <form className="form" encType="multipart/form-data">
        <h3>add event</h3>
        {showAlert && <Alert />}
        <div className="form-row">
          <label htmlFor="eventTitle" className="form-label">
            Event Title
          </label>
          <input
            type="text"
            placeholder="Pathfinder Day"
            name="eventTitle"
            className="form-input"
            value={values.eventTitle}
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <label htmlFor="venue" className="form-label">
            Venue
          </label>
          <input
            type="text"
            placeholder="Emmasdale Church"
            name="venue"
            className="form-input"
            value={values.venue}
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <label htmlFor="eventDate" className="form-label">
            Date
          </label>
          <input
            type="date"
            name="eventDate"
            className="form-input"
            value={values.eventDate}
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <label htmlFor="time" className="form-label">
            Time
          </label>
          <input
            type="time"
            name="time"
            className="form-input"
            value={values.time}
            onChange={handleChange}
          />
        </div>

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
            onClick={handleSubmit}
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
