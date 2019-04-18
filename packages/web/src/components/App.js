import React, { Fragment, useState } from "react";
import styled from "@emotion/styled";

import useTheme from "../useTheme";

import TeaserZoneList from "./TeaserZoneList";
import TeaserList from "./TeaserList";
import ZonesList from "./ZonesList";

import { appFetch, appPutFetch, appPostFetch, appDeleteFetch } from "../fetch";

const Container = styled.div`
  display: flex;
  flex: 1 0 auto;
`;

const Aside = styled.div`
  width: auto;
  padding: 10px;
  text-align: left;
  background: ${({ theme }) => theme.palette.primary.dark};
`;

const AsideHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  flex: 1 0 auto;
  padding: 10px;
  background: ${({ theme }) => theme.palette.secondary.main};
`;

const Separator = styled.hr`
  height: 1px;
  background-color: ${({ color }) => color};
  border: 0;
`;

const Title = styled.div`
  color: ${({ theme }) => theme.palette.primary.light};
  font-weight: bold;
  font-size: large;
  display: flex;
  align-items: center;
  font-size: 2.7em;
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

    if (result) {
      setTeasers(result);
    }
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
    if (result) {
      setTeasers(result);
    }
  };

  const handleOnDeleteTeaser = async teaserId => {
    const result = await appDeleteFetch(`/zonesTeasers/${currentZoneId}`, {
      teaserId
    });
    if (result) {
      setTeasers(result);
    }
  };

  return (
    <Fragment>
      <Container>
        <Aside theme={theme}>
          <AsideHeader theme={theme}>
            <ZonesList onChange={handleZoneChange} />
          </AsideHeader>
          <Separator color={theme.palette.secondary.main} />
          <TeaserList onAddTeaserInZone={handleOnAddTeaserInZone} />
        </Aside>
        <Content theme={theme}>
          <Title theme={theme}>Order teasers on zone</Title>
          <Separator color={theme.palette.primary.main} />
          <TeaserZoneList
            teasers={teasers}
            onReorder={handleReoder}
            onDeleteTeaser={handleOnDeleteTeaser}
          />
        </Content>
      </Container>
    </Fragment>
  );
};

export default App;
