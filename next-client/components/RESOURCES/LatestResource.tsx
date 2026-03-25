"use client";

import React from "react";
import { useEffect } from "react";
import { useDataStore } from "../../store/useDataStore";
import { ResourceList } from "./ResourceList";

const LatestResource = () => {
  const { getResources, resources } = useDataStore();

  useEffect(() => {
    getResources();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {resources.map((res) => {
        console.log(res.title);
        return <ResourceList key={res._id} {...res} />;
      })}
    </div>
  );
};

export default LatestResource;
