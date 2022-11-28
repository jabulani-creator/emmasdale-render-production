import axios from "axios";
import { useState, useEffect } from "react";
import { useAppContext } from "../../context/appContext";

export const Resource = () => {
  const { token } = useAppContext();
  const [manual, setManual] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const manualId = "63346ecff7c21413766c2b46";

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    const getManual = async () => {
      try {
        const response = await axios.get(`/api/v1/resource/${manualId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setManual(response.data);
        setIsLoading(false);
      } catch (error) {}
    };
    getManual();
    // eslint-disable-next-line
  }, [manualId, isLoading]);
  return (
    <section className="manual">
      <h4>{manual.title}</h4>
      <p>{manual.description}</p>
      <button className="btnn" onClick={() => openInNewTab(manual.pdf)}>
        Downlaod Church Manual
      </button>
    </section>
  );
};
