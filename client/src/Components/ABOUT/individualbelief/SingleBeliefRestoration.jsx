import Question from "./question/Question";
import { Restoration } from "./beliefData";
import { useState } from "react";
import { NormalLeft } from "../../GLOBAL"

export const SingleBeliefRestoration = () => {
  /* eslint-disable no-unused-vars */
    const [data, setData] = useState(Restoration);
    /* eslint-disable no-unused-vars */
  return (
        <>
        <NormalLeft title="RESTORATION (END TIMES)" paragraph="God has always investigated before taking action, demonstrating His willingness to forgive and giving each one of us a chance to be part of His plan. We saw this to be true with the Garden of Eden, the Tower of Babel, the exodus from Egypt and the destruction of Sodom and Gomorrah. Before Jesus’ Second Coming, He is investigating the entire earth, everyone who has ever lived, every choice every human being has made. God wants it to be clear to us, and to the watching universe, that not one person will experience a fate they did not choose. Christ’s return is near, meaning the final judgment of humanity, the destruction of the wicked, the end of death and sin, and the redemption of those who accept the gift of God’s salvation. And that’s not the end of the story. We will enjoy a millennium in heaven and the restoration of our earth to the paradise it once was, for us to enjoy for eternity while communing face to face with God. The following statements describe what the Seventh-day Adventist Church believes about the end times of the earth, and what’s in store for humanity as eternity unfolds. "/>
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

