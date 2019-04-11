import React, { useState, useEffect } from "react";
import TeaserList from "./TeaserList";
import { appFetch, appPostFetch, appPutFetch } from "./fetch";

const App = () => {
  const [teasers, setTeasers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await appFetch("/teasers");
      setTeasers(result);
    };

    fetchData();
  }, []);

  const reoder = async (sourceIndex, destinationIndex) => {
    const result = await appPutFetch("/teasers/reoder/", {
      sourceIndex,
      destinationIndex
    });

    setTeasers(result);
  };

  const addTeaserOnClick = async () => {
    const result = await appPostFetch("/teasers/add");
    setTeasers(result);
  };

  return (
    <div>
      <button onClick={addTeaserOnClick}>Add teaser</button>
      <TeaserList teasers={teasers} reorder={reoder} />
    </div>
  );
};

export default App;
