import Question from "./question/Question";
import { Church } from "./beliefData";
import { useState } from "react";
import { NormalLeft } from "../../GLOBAL"


export const SingleBeliefChurch = () => {
  /* eslint-disable no-unused-vars */
    const [data, setData] = useState(Church);
    /* eslint-disable no-unused-vars */
  return (
    <> <NormalLeft title="CHURCH" paragraph="After Jesus’ ministry on earth, He commissioned His followers to go about their lives telling others about His love and promise to return. In doing this, He also commanded to love all people as He loves all of us. 

    As imperfect as humanity is, God still gives us the privilege of being part of His work. In doing this, we are His Church, or the Body of Christ, all with different spiritual gifts to contribute. He encourages us to meet together, support one another, and serve together.
    
    The following statements describe what the Seventh-day Adventist Church believes regarding the fellowship of believers around the world, God’s Great Commission, and the principles to guide organized local congregations. "/>
   
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

