import React, { useState } from "react";
import { NormalFlex, LearnMore } from "../../GLOBAL";
import message from "./BeliefsData";
import {
  SingleBeliefGod,
  SingleBeliefHumanity,
  SingleBeliefSalvation,
  SingleBeliefLiving,
  SingleBeliefRestoration,
  SingleBeliefChurch,
} from "../individualbelief/index";
export const Beliefs = () => {
  /* eslint-disable no-unused-vars */
  const [Message, setMessage] = useState(message);
  /* eslint-disable no-unused-vars */
  const [readMore, setReadMore] = useState(false);
  return (
    <section className="section ">
      <h3 className="left_align primary ">
        UPHOLDING THE PROTESTANT CONVICTION OF SOLA SCRIPTURA (“BIBLE ONLY”),
        THESE 28 FUNDAMENTAL BELIEFS DESCRIBE HOW SEVENTH-DAY ADVENTISTS
        INTERPRET SCRIPTURE FOR DAILY APPLICATION.
      </h3>
      <p className="right-paragraph ">
        {readMore ? Message : `${Message.substring(0, 500)}...`}
        <button className="btn-read" onClick={() => setReadMore(!readMore)}>
          {readMore ? "show less" : "read more"}
        </button>
      </p>
      <h5 className="left primary">
        The 28 Fundamental Beliefs can be organized into six categories of
        doctrine: God, man, salvation, the church, daily Christian life, and
        last-day events (restoration).
      </h5>
      <NormalFlex
        message="Seventh-day Adventists accept the Bible as their only creed and hold certain fundamental beliefs to be the teaching of the Holy Scriptures. These beliefs, as set forth here, constitute the church’s understanding and expression of the teaching of Scripture. Revision of these statements may be expected at a General Conference Session when the church is led by the Holy Spirit to a fuller understanding of Bible truth or finds better language in which to express the teachings of God’s Holy Word."
        image="https://www.adventist.org/wp-content/uploads/2021/01/james-coleman-DYRrkrGrI58-unsplash-800x450.jpg"
      />
      <SingleBeliefGod />
      <SingleBeliefHumanity />
      <SingleBeliefSalvation />
      <SingleBeliefChurch />
      <SingleBeliefLiving />
      <SingleBeliefRestoration />
      <LearnMore
        header="Interested in learning more about the Bible and the beliefs of Adventist"
        link="https://www.adventist.org/study-the-bible/"
        path="Learn More"
      />
    </section>
  );
};
