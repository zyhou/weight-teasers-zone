import React, { Fragment, useEffect, useState } from "react";
import { appFetch } from "./fetch";

const Option = ({ id, name }) => <option value={id}>{name}</option>;

const TeaserList = ({ onChange }) => {
  const [zones, setZones] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const resultZones = await appFetch("/zones");
      setZones(resultZones);
      onChange(resultZones[0].id);
    };

    fetchData();
  }, []);

  const handleZoneChange = event => {
    onChange(event.target.value);
  };

  return (
    <Fragment>
      Zones:
      <select onChange={handleZoneChange}>
        {zones.map(zone => (
          <Option key={`TeaserList_zones_${zone.id}`} {...zone} />
        ))}
      </select>
    </Fragment>
  );
};

export default TeaserList;
