import Question from "./question/Question";
import { God } from "./beliefData";
import { useState } from "react";
import { NormalLeft } from "../../GLOBAL"

export const SingleBeliefGod = () => {
  /* eslint-disable no-unused-vars */
    const [data, setData] = useState(God);
    /* eslint-disable no-unused-vars */
  return (
        <>
        <NormalLeft title="GOD" paragraph="Our Creator God is love, power and splendor. He is three-in-one, mysterious and infinite—yet He desires an intimate connection with humanity. He gave us the Bible as His Holy Word, the Bible, so we could learn more about Him and build a relationship with Him.The following statements describe what the Seventh-day Adventist Church believes about God and His Word." />
        <div>
        {data.map((item) => {
          return (
            <Question key={item.id} {...item} />
          )
        })}
        </div>
        </>
  )
}

