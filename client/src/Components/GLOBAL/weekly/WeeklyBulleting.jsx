import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Wrapper from "../../../assets/wrappers/weeklyContainer";
import { useAppContext } from "../../../context/appContext";

export const WeeklyBulleting = () => {
  const [bulleting, setBulleting] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAppContext();

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };
  useEffect(() => {
    const getBulleting = async () => {
      try {
        const response = await axios.get(`/api/v1/pdf/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBulleting(response.data);
        setIsLoading(false);
      } catch (error) {}
    };
    getBulleting();
    // eslint-disable-next-line
  }, [isLoading]);
  return (
    <Wrapper>
      <h1 className="title">weekly bulleting</h1>
      <button className="btnn" onClick={() => openInNewTab(bulleting.pdf)}>
        Get this weeks bulleting
      </button>
    </Wrapper>
  );
};
