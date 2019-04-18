import React, { Fragment, useEffect, useState } from "react";
import styled from "@emotion/styled";

import { appFetch, appPostFetch } from "../fetch";
import useTheme from "../useTheme";

const AddTeaserContainer = styled.div`
  display: flex;
  margin: 10px;
`;

const AddTeaserInput = styled.input`
  border: 0;
  font-size: large;
  width: 200px;
  background-color: ${({ theme }) => theme.palette.secondary.light};
`;

const AddTeaserButton = styled.button`
  border: 0;
  font-size: large;
  background-color: transparent;
  color: ${({ theme }) => theme.palette.secondary.light};
  border: ${({ theme }) => `2px solid ${theme.palette.secondary.light}`};
  cursor: pointer;
`;

const TableRow = ({ onAddTeaserInZone, id, name }) => (
  <tr>
    <td>
      <button onClick={() => onAddTeaserInZone(id)}>+</button>
      {name}
    </td>
  </tr>
);

const TeaserList = ({ onAddTeaserInZone }) => {
  const theme = useTheme();
  const [teasers, setTeasers] = useState([]);
  const [teaserName, setTeaserName] = useState("foo");

  useEffect(() => {
    const fetchData = async () => {
      const resultTeasers = await appFetch("/teasers");
      setTeasers(resultTeasers);
    };

    fetchData();
  }, []);

  const handleAddTeaser = async () => {
    const result = await appPostFetch("/teasers", {
      name: teaserName
    });
    setTeasers([...teasers, result]);
  };

  const handleNameChange = event => setTeaserName(event.target.value);

  return (
    <Fragment>
      <AddTeaserContainer theme={theme}>
        <AddTeaserInput
          theme={theme}
          type="text"
          value={teaserName}
          onChange={handleNameChange}
        />
        <AddTeaserButton theme={theme} onClick={handleAddTeaser}>
          +
        </AddTeaserButton>
      </AddTeaserContainer>
      <table>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {teasers.map(teaser => (
            <TableRow
              key={`TeaserList_teasers_${teaser.id}`}
              {...teaser}
              onAddTeaserInZone={onAddTeaserInZone}
            />
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default TeaserList;
