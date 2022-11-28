import React from "react";
import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import { ResourceList } from "./ResourceList";

const LatestResource = () => {
  const { getResources, resources } = useAppContext();

  useEffect(() => {
    getResources();
    // eslint-disable-next-line
  }, []);

  return (
    <section className="section">
      {resources.map((res) => {
        console.log(res.title);
        return <ResourceList key={res._id} {...res} />;
      })}
    </section>
  );
};

export default LatestResource;
