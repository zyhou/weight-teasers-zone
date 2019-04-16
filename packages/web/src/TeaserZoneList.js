import React, { Component } from "react";
import styled from "@emotion/styled";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Table = styled.table`
  width: 500px;
  margin: 0 auto;
`;

const TBody = styled.tbody`
  border: 0;
`;

const THead = styled.thead`
  border: 0;
  border-bottom: none;
  background-color: red;
`;

const Row = styled.tr`
  ${props => (props.isDragging ? `background: blue;` : "")};
`;

const Cell = styled.td`
  box-sizing: border-box;
  padding: 8px;
  width: 50%;
`;

const TableRow = ({ snapshot, provided, teaser, onDeleteTeaser }) => (
  <Row
    ref={provided.innerRef}
    isDragging={snapshot.isDragging}
    {...provided.draggableProps}
    {...provided.dragHandleProps}
  >
    <Cell>
      <button onClick={() => onDeleteTeaser(teaser.id)}>-</button>
      {teaser.name} - <b>{teaser.weight}</b>
    </Cell>
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
    const { teasers, onDeleteTeaser } = this.props;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Table>
          <THead>
            <tr>
              <th>Name</th>
            </tr>
          </THead>
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

export default TeaserZoneList;
