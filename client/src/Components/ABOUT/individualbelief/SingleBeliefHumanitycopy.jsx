import Question from "./question/Question";
import { Humanity } from "./beliefData";
import { useState } from "react";
import { NormalLeft } from "../../GLOBAL";

export const SingleBeliefHumanity = () => {
  /* eslint-disable no-unused-vars */
    const [data, setData] = useState(Humanity);
    /* eslint-disable no-unused-vars */
  return (
        <>
         <NormalLeft title="HUMANITY" paragraph="Lovingly designed as perfect beings, God created humans in His own image with free will and dominion over the earth. But sin crept in through temptation by Satan, the Devil. Now humanity’s perfection is tarnished, our bodies and minds corrupted. Our once-idyllic world continues to be in a constant struggle between good and evil.Fortunately, God had a plan to redeem humanity through His Son, Jesus Christ. He will ultimately have victory over sin and death and restore us and our earth to its original state of beauty and perfection.The following statements describe what the Seventh-day Adventist Church believes about the earth and humanity in the context of God’s ultimate plan."/>
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

