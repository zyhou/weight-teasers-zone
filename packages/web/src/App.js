import React, { useState } from "react";
import TeaserZoneList from "./TeaserZoneList";
import TeaserList from "./TeaserList";
import ZonesList from "./ZonesList";
import { appFetch, appPutFetch } from "./fetch";

const App = () => {
  const [teasers, setTeasers] = useState([]);
  const [currentZoneId, setCurrentZoneId] = useState();

  const reoder = async (sourceIndex, destinationIndex) => {
    const result = await appPutFetch("/zonesTeasers/reoder/", {
      zoneId: currentZoneId,
      sourceIndex,
      destinationIndex
    });

    setTeasers(result);
  };

  const handleZoneChange = async id => {
    const result = await appFetch(`/zonesTeasers/${id}`);
    setTeasers(result);
    setCurrentZoneId(id);
  };

  return (
    <div>
      <ZonesList onChange={handleZoneChange} />
      <TeaserList />
      <TeaserZoneList teasers={teasers} reorder={reoder} />
    </div>
  );
};

export default App;
