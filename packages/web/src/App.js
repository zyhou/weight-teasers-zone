import React, { useState } from "react";
import styled from "@emotion/styled";

import TeaserZoneList from "./TeaserZoneList";
import TeaserList from "./TeaserList";
import ZonesList from "./ZonesList";

import { appFetch, appPutFetch, appPostFetch } from "./fetch";

const Wrapper = styled.div`
  display: grid;
  grid-gap: 10px 20px;
  grid-template-rows: 1fr 1fr auto;
  grid-template-columns: 300px 1fr;
  grid-template-areas:
    "header  header  "
    "aside   content ";
`;

const Header = styled.div`
  grid-area: header;
`;

const Aside = styled.div`
  grid-area: aside;
`;

const Content = styled.div`
  grid-area: content;
`;

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

  const handleOnAddTeaserInZone = async teaserId => {
    const result = await appPostFetch(`/zonesTeasers/${currentZoneId}`, {
      teaserId
    });
    setTeasers(result);
  };

  return (
    <Wrapper>
      <Header>
        <ZonesList onChange={handleZoneChange} />
      </Header>
      <Aside>
        <TeaserList onAddTeaserInZone={handleOnAddTeaserInZone} />
      </Aside>
      <Content>
        <TeaserZoneList teasers={teasers} reorder={reoder} />
      </Content>
    </Wrapper>
  );
};

export default App;
