import React, { useState, useEffect } from "react";
import TeaserList from "./TeaserList";

const App = () => {
  const [teasers, setTeasers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("http://localhost:3001/teasers");
      const teasersResult = await result.json();
      setTeasers(teasersResult);
    };

    fetchData();
  }, []);

  const reoder = async (sourceIndex, destinationIndex) => {
    const result = await fetch("http://localhost:3001/reoder/", {
      method: "PUT",
      body: JSON.stringify({ sourceIndex, destinationIndex }),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    });

    const teasersResult = await result.json();
    setTeasers(teasersResult);
  };

  return (
    <div>
      <TeaserList teasers={teasers} reorder={reoder} />
    </div>
  );
};

export default App;
