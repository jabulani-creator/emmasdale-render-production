import React from "react";
import Wrapper from "../../assets/wrappers/Heros";

const Hero = () => {
  return (
    <Wrapper>
      <div className="hero-center">
        <article className="hero-info">
          <h1>EMMASDALE SDA CHURCH</h1>
          <p>
            Millions of companies of all sizes—from startups to Fortune 500s—use
            Stripe’s software and APIs to accept payments, send payouts, and
            manage their businesses online.
          </p>
        </article>
        <button className="btnn">I am new here</button>
      </div>
    </Wrapper>
  );
};

export default Hero;
