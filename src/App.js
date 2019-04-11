import React, { useState, useEffect } from "react";
import TeaserList from "./TeaserList";

const App = () => {
  const [teasers, setTeasers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("http://localhost:3000/teasers");

      setTeasers([
        { id: 1, name: "teaser 1" },
        { id: 2, name: "teaser 2" },
        { id: 3, name: "teaser 3" }
      ]);
    };

    fetchData();
  }, []);

  const reoder = async (sourceIndex, destinationIndex) => {
    const result = await fetch("http://localhost:3000/reoder/", {
      method: "PUT",
      body: JSON.stringify({ sourceIndex, destinationIndex }),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    });

    //setTeasers(result);
  };

  return (
    <div>
      <TeaserList teasers={teasers} reorder={reoder} />
    </div>
  );
};

export default App;
