import Question from "./question/Question";
import { Salvation } from "./beliefData";
import { useState } from "react";
import { NormalLeft } from "../../GLOBAL"

export const SingleBeliefSalvation = () => {
  /* eslint-disable no-unused-vars */
    const [data, setData] = useState(Salvation);
    /* eslint-disable no-unused-vars */
  return (
        <>
        <NormalLeft title="SALVATION" paragraph="Even before the creation of the earth, there was war between good and evil. Lucifer, a once-perfect and highly-regarded being, became jealous of God and wished for higher position. When God did not give him what he wanted, He became Satan. He accused God of being unfair.Satan then led astray one-third of heaven’s angels, and God had to cast them out. To seek revenge on God, Satan began attacking His precious new creation—the earth. Knowing that humans were created with free will, He tempted them to rebel against God’s loving guidance. But God knew this didn’t have to be the end of humanity’s story. He demonstrated just how much He loves us by sending His own Son, Jesus Christ, to die in humanity’s place, to bear the ultimate punishment sin brings (Romans 6:23, John 3:16). However, it still comes down to choice. God never wanted forced allegiance. The option is ours. We can succumb to sin and choose to live for ourselves, or we can choose to accept Jesus’ sacrifice, follow Him, and get to know Him. And if we choose Him, He promises to guide us with His Holy Spirit and will never forsake us. The following statements describe what the Seventh-day Adventist Church believes about the struggle between good and evil, and how there is still hope for humanity’s salvation through the loving sacrifice of Jesus Christ."/>
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

