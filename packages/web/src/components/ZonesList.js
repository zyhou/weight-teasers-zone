import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

import { appFetch } from "../fetch";
import useTheme from "../useTheme";

const ContainerSelect = styled.div`
  background-color: ${({ theme }) => theme.palette.primary.light};
  width: 20em;
  height: 3em;
  line-height: 3;
  overflow: hidden;
  border-radius: 0.25em;
`;

const Select = styled.select`
  outline: 0;
  box-shadow: none;
  border: 0 !important;
  background: ${({ theme }) => theme.palette.primary.light};
  background-image: none;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0 0 0 0.5em;
  color: ${({ theme }) => theme.palette.secondary.main};
  cursor: pointer;

  &:after {
    content: "\25BC";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    padding: 0 1em;
    background: #34495e;
    pointer-events: none;
  }
`;

const Option = ({ id, name }) => <option value={id}>{name}</option>;

const TeaserList = ({ onChange }) => {
  const theme = useTheme();
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
    <ContainerSelect theme={theme}>
      <Select theme={theme} onChange={handleZoneChange}>
        {zones.map(zone => (
          <Option key={`TeaserList_zones_${zone.id}`} {...zone} />
        ))}
      </Select>
    </ContainerSelect>
  );
};

export default TeaserList;
