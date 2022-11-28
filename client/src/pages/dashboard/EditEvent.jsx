import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { Alert } from "../../Components";
import { useAppContext } from "../../context/appContext";
import axios from "axios";

export const EditEvent = () => {
  const { eventId } = useParams();
  const [values, setValues] = useState({
    eventTitle: "",
    eventDate: "",
    eventDesc: "",
    eventPhoto: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  const { showAlert, displayAlert, editEvent, token, clearValues } =
    useAppContext();

  useEffect(() => {
    const getSingleEvent = async () => {
      try {
        const response = await axios.get(`/api/v1/events/${eventId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setValues(response.data);
        setIsLoading(false);
      } catch (error) {}
    };
    getSingleEvent(eventId);
    // eslint-disable-next-line
  }, [eventId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { eventTitle, eventDate, eventDesc } = values;
    if (!eventTitle || !eventDate || !eventDesc) {
      displayAlert();
      return;
    }
    let formData = new FormData();
    formData.append("eventTitle", values.eventTitle);
    formData.append("eventDate", values.eventDate);
    formData.append("eventDesc", values.eventDesc);
    formData.append("eventPhoto", values.eventPhoto);

    editEvent(eventId, formData);
    if (!isLoading) {
      setValues({
        eventTitle: "",
        eventDate: "",
        eventDesc: "",
        eventPhoto: "",
      });
    }
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
        <h3>Edit event</h3>
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
          <label htmlFor="eventDate" className="form-label">
            Event Date
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
          <label htmlFor="eventDesc" className="form-label">
            Event Description
          </label>
          <textarea
            name="eventDesc"
            value={values.eventDesc}
            className="form-textarea"
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <input
            type="file"
            accept=".jpg,.png,.jpeg"
            name="eventPhoto"
            onChange={handlePhoto}
          />
        </div>
        <div className="btn-container">
          <button
            className="btn btn-block submit-btn"
            type="submit"
            onClick={handleSubmit}
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
