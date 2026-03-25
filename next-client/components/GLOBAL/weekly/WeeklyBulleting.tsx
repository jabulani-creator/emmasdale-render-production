"use client";

import Wrapper from "../../../app/assets/wrappers/weeklyContainer";

export const WeeklyBulleting = ({ bulletingPdf }) => {
  const openInNewTab = (url) => {
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Wrapper>
      <h1 className="title">weekly bulleting</h1>
      <button className="btnn" onClick={() => openInNewTab(bulletingPdf)}>
        Get this weeks bulleting
      </button>
    </Wrapper>
  );
};
