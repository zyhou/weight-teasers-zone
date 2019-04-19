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
  padding: 10px;
  color: ${({ theme }) => theme.palette.secondary.main};
  background-color: ${({ theme }) => theme.palette.secondary.light};
`;

const AddTeaserButton = styled.button`
  border: 0;
  font-size: large;
  background-color: transparent;
  color: ${({ theme }) => theme.palette.secondary.main};
  border: ${({ theme }) => `2px solid ${theme.palette.secondary.light}`};
  cursor: pointer;
`;

const Table = styled.table`
  text-align: center;
  width: 100%;
`;

const TableHeaderRow = styled.th`
  color: ${({ theme }) => theme.palette.secondary.light};
`;

const TableRowStyle = styled.tr`
  cursor: pointer;
`;

const TableCell = styled.td`
  font-size: large;
  color: ${({ theme }) => theme.palette.secondary.light};
`;

const TableRow = ({ onAddTeaserInZone, id, name, theme }) => {
  const onClick = event => {
    event.stopPropagation();
    onAddTeaserInZone(id);
  };

  return (
    <TableRowStyle theme={theme} onClick={onClick}>
      <TableCell theme={theme}>
        <AddTeaserButton theme={theme} onClick={onClick}>
          +
        </AddTeaserButton>
      </TableCell>
      <TableCell theme={theme}>{name}</TableCell>
    </TableRowStyle>
  );
};

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
    if (result) {
      setTeasers([...teasers, result]);
    }
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
      <Table>
        <thead>
          <tr>
            <TableHeaderRow theme={theme}>Action</TableHeaderRow>
            <TableHeaderRow theme={theme}>Name</TableHeaderRow>
          </tr>
        </thead>
        <tbody>
          {teasers.map(teaser => (
            <TableRow
              key={`TeaserList_teasers_${teaser.id}`}
              theme={theme}
              {...teaser}
              onAddTeaserInZone={onAddTeaserInZone}
            />
          ))}
        </tbody>
      </Table>
    </Fragment>
  );
};

export default TeaserList;
