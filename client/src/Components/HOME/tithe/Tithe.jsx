import React, { useState } from 'react'
import message from './healtData'

export const Tithe = () => {
  /* eslint-disable no-unused-vars */
    const [Message, setMessage] = useState(message)
    /* eslint-disable no-unused-vars */
    const [readMore, setReadMore] = useState(false)
  return (
    <section className="section primary">
        <h1 className="title">Tithe & offering</h1>
        <p className="right-paragraph">
            {readMore ? Message : `${Message.substring(0, 800)}...`}
            <button className='btn-read' onClick={() => setReadMore(!readMore)}>
                {readMore ? 'show less' : 'read more'}
            </button>
        </p>
        <button className="btnn">Give</button>
    </section>
  )
}
