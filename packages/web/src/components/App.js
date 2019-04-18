import React, { Fragment, useState } from "react";
import styled from "@emotion/styled";

import useTheme from "../useTheme";

import TeaserZoneList from "./TeaserZoneList";
import TeaserList from "./TeaserList";
import ZonesList from "./ZonesList";

import { appFetch, appPutFetch, appPostFetch, appDeleteFetch } from "../fetch";

const Header = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.palette.primary.main};
`;

const Container = styled.div`
  flex: 1 0 auto;
  display: flex;
`;

const Aside = styled.div`
  width: 300px;
  text-align: left;
  background: ${({ theme }) => theme.palette.primary.dark};
`;

const Content = styled.div`
  flex: 1 0 auto;
  background: ${({ theme }) => theme.palette.secondary.light};
`;

const Footer = styled.footer`
  width: 100%;
  height: 60px;
  background: ${({ theme }) => theme.palette.primary.main};
`;

const App = () => {
  const theme = useTheme();
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
      <Header theme={theme}>
        <ZonesList onChange={handleZoneChange} />
      </Header>
      <Container>
        <Aside theme={theme}>
          <TeaserList onAddTeaserInZone={handleOnAddTeaserInZone} />
        </Aside>
        <Content theme={theme}>
          <TeaserZoneList
            teasers={teasers}
            onReorder={handleReoder}
            onDeleteTeaser={handleOnDeleteTeaser}
          />
        </Content>
      </Container>
      <Footer theme={theme} />
    </Fragment>
  );
};

export default App;
