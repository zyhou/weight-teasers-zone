import React, { Fragment, useEffect, useState } from "react";
import { appFetch, appPostFetch } from "./fetch";

const TableRow = ({ name }) => (
  <tr>
    <td>{name}</td>
  </tr>
);

const TeaserList = () => {
  const [teasers, setTeasers] = useState([]);
  const [teaserName, setTeaserName] = useState("foo");

  useEffect(() => {
    const fetchData = async () => {
      const resultTeasers = await appFetch("/teasers");
      setTeasers(resultTeasers);
    };

    fetchData();
  }, []);

  const addTeaserOnClick = async () => {
    const result = await appPostFetch("/teasers", {
      name: teaserName
    });
    setTeasers([...teasers, result]);
  };

  const handleNameChange = event => setTeaserName(event.target.value);

  return (
    <Fragment>
      <input type="text" value={teaserName} onChange={handleNameChange} />
      <button onClick={addTeaserOnClick}>Add teaser</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {teasers.map(teaser => (
            <TableRow key={`TeaserList_teasers_${teaser.id}`} {...teaser} />
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default TeaserList;
