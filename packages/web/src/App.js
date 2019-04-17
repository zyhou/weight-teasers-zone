import React, { Fragment, useState } from "react";
import styled from "@emotion/styled";

import TeaserZoneList from "./TeaserZoneList";
import TeaserList from "./TeaserList";
import ZonesList from "./ZonesList";

import { appFetch, appPutFetch, appPostFetch, appDeleteFetch } from "./fetch";

const Header = styled.div`
  width: 100%;
  height: 60px;
  background: pink;
`;

const Container = styled.div`
  flex: 1 0 auto;
  display: flex;
`;

const Aside = styled.div`
  width: 100px;
  list-style: none;
  text-align: left;
  order: -1;
  background: yellow;
  margin: 0;
`;

const Content = styled.div`
  flex: 1 0 auto;
  background: lightgreen;
`;

const Footer = styled.footer`
  width: 100%;
  height: 60px;
  background: cyan;
`;

const App = () => {
  const [teasers, setTeasers] = useState([]);
  const [currentZoneId, setCurrentZoneId] = useState();

  const handleReoder = async (source, destination) => {
    const result = await appPutFetch("/zonesTeasers/reoder/", {
      zoneId: currentZoneId,
      source,
      destination
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

  const handleOnDeleteTeaser = async teaserId => {
    const result = await appDeleteFetch(`/zonesTeasers/${currentZoneId}`, {
      teaserId
    });
    setTeasers(result);
  };

  return (
    <Fragment>
      <Header>
        <ZonesList onChange={handleZoneChange} />
      </Header>
      <Container>
        <Aside>
          <TeaserList onAddTeaserInZone={handleOnAddTeaserInZone} />
        </Aside>
        <Content>
          <TeaserZoneList
            teasers={teasers}
            onReorder={handleReoder}
            onDeleteTeaser={handleOnDeleteTeaser}
          />
        </Content>
      </Container>
      <Footer>Footer</Footer>
    </Fragment>
  );
};

export default App;
