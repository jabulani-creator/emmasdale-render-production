import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

import { useState } from "react";
const Question = ({ title, message }) => {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <section className="question">
      <header>
        <h4>{title}</h4>
        <button className="btn-question" onClick={() => setShowInfo(!showInfo)}>
          {showInfo ? (
            <AiOutlineMinus className="q-icon" />
          ) : (
            <AiOutlinePlus className="q-icon" />
          )}
        </button>
      </header>
      {showInfo && <p>{message}</p>}
    </section>
  );
};

export default Question;
