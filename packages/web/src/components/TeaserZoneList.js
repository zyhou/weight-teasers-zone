import React, { Component } from "react";
import styled from "@emotion/styled";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { withTheme } from "../useTheme";

const Table = styled.table`
  width: 500px;
  margin: 0 auto;
  color: ${({ theme }) => theme.palette.primary.main};
`;

const TBody = styled.tbody`
  border: 0;
`;

const Row = styled.tr`
  ${({ theme, isDragging }) =>
    isDragging ? `background: ${theme.palette.secondary.light};` : ""};
`;

const Cell = styled.td`
  box-sizing: border-box;
  padding: 8px;
  width: 50%;
`;

const RemoveTeaserButton = styled.button`
  border: 0;
  font-size: large;
  background-color: transparent;
  color: ${({ theme }) => theme.palette.secondary.light};
  border: ${({ theme }) => `2px solid ${theme.palette.primary.main}`};
  cursor: pointer;
`;

const TableRow = ({ snapshot, provided, theme, teaser, onDeleteTeaser }) => (
  <Row
    ref={provided.innerRef}
    isDragging={snapshot.isDragging}
    theme={theme}
    {...provided.draggableProps}
    {...provided.dragHandleProps}
  >
    <Cell>
      <RemoveTeaserButton
        theme={theme}
        onClick={() => onDeleteTeaser(teaser.id)}
      >
        -
      </RemoveTeaserButton>
    </Cell>
    <Cell>{teaser.name}</Cell>
    <Cell>{teaser.weight}</Cell>
  </Row>
);

class TeaserZoneList extends Component {
  onDragEnd = result => {
    // dropped outside the list
    if (
      !result.destination ||
      result.destination.index === result.source.index
    ) {
      return;
    }

    // no movement
    if (result.destination.index === result.source.index) {
      return;
    }

    const { onReorder, teasers } = this.props;
    onReorder(teasers[result.source.index], teasers[result.destination.index]);
  };

  render() {
    const { teasers, onDeleteTeaser, theme } = this.props;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Table theme={theme}>
          <thead>
            <tr>
              <th>Action</th>
              <th>Name</th>
              <th>Position</th>
            </tr>
          </thead>
          <Droppable droppableId="table">
            {droppableProvided => (
              <TBody
                ref={ref => {
                  this.tableRef = ref;
                  droppableProvided.innerRef(ref);
                }}
                {...droppableProvided.droppableProps}
              >
                {teasers.map((teaser, index) => (
                  <Draggable
                    draggableId={teaser.id}
                    index={index}
                    key={teaser.id}
                  >
                    {(provided, snapshot) => (
                      <TableRow
                        provided={provided}
                        snapshot={snapshot}
                        theme={theme}
                        teaser={teaser}
                        onDeleteTeaser={onDeleteTeaser}
                      />
                    )}
                  </Draggable>
                ))}
                {droppableProvided.placeholder}
              </TBody>
            )}
          </Droppable>
        </Table>
      </DragDropContext>
    );
  }
}

export default withTheme(TeaserZoneList);
