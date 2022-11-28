import { useAppContext } from "../../../context/appContext";
import { FormRow, FormRowSelect, Alert } from "../../index";

export const Form = () => {
  const {
    isLoading,
    showAlert,
    displayAlert,
    name,
    phone,
    purpose,
    purposeOptions,
    email,
    day,
    message,
    handleChange,
    clearValues,
    createRequest,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !phone) {
      displayAlert();
      return;
    }
    createRequest();
  };

  const handleContactInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };
  return (
    <form className="form">
      {showAlert && <Alert />}
      <FormRow
        type="text"
        name="name"
        value={name}
        placeholder="john doe"
        handleChange={handleContactInput}
      />
      <FormRow
        type="email"
        name="email"
        value={email}
        placeholder="victoria@gmail.com"
        handleChange={handleContactInput}
      />
      <FormRow
        type="text"
        name="phone"
        value={phone}
        placeholder="+260972975737"
        handleChange={handleContactInput}
      />
      <FormRow
        labelText="Planned visit date"
        type="date"
        name="day"
        value={day}
        //   placeholder='MM/DD/YYYY'
        handleChange={handleContactInput}
      />
      <FormRowSelect
        labelText="purpose"
        name="purpose"
        value={purpose}
        list={purposeOptions}
        handleChange={handleContactInput}
      />
      <div className="form-row">
        <label htmlFor="message" className="form-label">
          Message
        </label>
        <textarea
          name="message"
          value={message}
          className="form-textarea"
          onChange={handleContactInput}
        />
      </div>
      <div className="btn-container">
        <button
          className="btnn"
          type="submit"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          Send Message
        </button>
        <button
          className="btnc"
          onClick={(e) => {
            e.preventDefault();
            clearValues();
          }}
        >
          clear fields{" "}
        </button>
      </div>
    </form>
  );
};
