import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "./app/store";
import ChartNodeEl from "./ChartNode";
import Line from "./canvas_elements/Line";
import ChartPointEl from "./canvas_elements/ChartPoint";
import TextLine from "./canvas_elements/TextLine";
import AnchorPoint from "./canvas_elements/AnchorPoint";
import {
  APoint,
  ChartPoint,
  JointType,
} from "./features/elements/elementsTypes";
import BrokenLine from "./canvas_elements/BrokenLine";
import ChartCircle from "./canvas_elements/ChartCircle";
import { clearSelection } from "./features/elements/elementsSlice";

const CanvasElements = (props: { scale: number }) => {
  const { mode } = useSelector((state: RootState) => state.general);
  const {
    elements: {
      nodes,
      points,
      anchor_points,
      lines,
      texts,
      connections,
      shapes,
    },
    node_size,
    selectedIds,
  } = useSelector((state: RootState) => state.elements);

  const dispatch = useDispatch();

  const handleDeselectClick = (e: React.MouseEvent) => {
    console.log("global deselect");
    dispatch(clearSelection());
  };

  return (
    <ElementsContainer id="elements-container" mode={mode}>
      {nodes.map((element) => {
        return (
          <ChartNodeEl key={element.id} node={element} scale={props.scale} />
        );
      })}
      {mode !== "view" &&
        anchor_points.map((a_point) => {
          const parentNode = nodes.find(
            (node) => node.id === a_point.parentNodeId
          );
          return (
            <AnchorPoint
              key={a_point.id}
              point={a_point}
              parent={parentNode!}
            />
          );
        })}
      {mode !== "view" &&
        points.map((point) => {
          return (
            <ChartPointEl key={point.id} point={point} scale={props.scale} />
          );
        })}
      {texts.map((text) => {
        return <TextLine key={text.id} data={text} />;
      })}
      <svg width="100%" height="100%" onClick={handleDeselectClick}>
        {connections.map((connection) => {
          let begPoint: ChartPoint = {
            id: "0",
            coordinates: { x: 10, y: 10 },
            type: "point",
          };
          let endPoint: ChartPoint = {
            id: "0",
            coordinates: { x: 200, y: 200 },
            type: "point",
          };
          const {
            beginningPointId,
            endPointId,
            begType,
            endType,
            begPosition,
            endPosition,
            direction,
            turnCoordinate,
          } = connection;
          if (connection.line_type === "straight") {
            if (begType === "anchor_point") {
              const node = nodes.find((node) => node.id === beginningPointId);
              if (node) {
                const {
                  coordinates: { left, top },
                } = node;
                let x: number = left;
                let y: number = top;
                switch (begPosition) {
                  case "top":
                    y = top;
                    x = left + node_size.w * 0.5 + 1;
                    break;
                  case "right":
                    y = top + 0.5 * node_size.h + 2;
                    x = left + node_size.w;
                    break;
                  case "bottom":
                    y = top + node_size.h;
                    x = left + 0.5 * node_size.w + 1;
                    break;
                  case "left":
                    y = top + 0.5 * node_size.h + 2;
                    x = left;
                    break;
                }
                begPoint = {
                  id: beginningPointId,
                  coordinates: { x, y },
                  type: "anchor_point",
                };
              }
            } else {
              begPoint = points.find((point) => point.id === beginningPointId)!;
            }
            if (endType === "anchor_point") {
              const node = nodes.find((node) => node.id === endPointId);
              if (node) {
                const {
                  coordinates: { left, top },
                } = node;
                let x: number = left;
                let y: number = top;
                switch (endPosition) {
                  case "top":
                    y = top;
                    x = left + node_size.w * 0.5 + 1;
                    break;
                  case "right":
                    y = top + 0.5 * node_size.h + 2;
                    x = left + node_size.w;
                    break;
                  case "bottom":
                    y = top + node_size.h;
                    x = left + 0.5 * node_size.w + 1;
                    break;
                  case "left":
                    y = top + 0.5 * node_size.h + 2;
                    x = left;
                    break;
                }
                endPoint = {
                  id: endPointId,
                  coordinates: { x, y },
                  type: "anchor_point",
                };
              }
            } else {
              endPoint = points.find((point) => point.id === endPointId)!;
            }

            if (begPoint && endPoint) {
              return (
                <Line
                  key={connection.id}
                  begPoint={begPoint}
                  endPoint={endPoint}
                />
              );
            }
          } else if (connection.line_type === "broken") {
            if (begType === "anchor_point") {
              const node = nodes.find((node) => node.id === beginningPointId);
              if (node) {
                const {
                  coordinates: { left, top },
                } = node;
                let x: number = left;
                let y: number = top;
                switch (begPosition) {
                  case "top":
                    y = top;
                    x = left + node_size.w * 0.5 + 1;
                    break;
                  case "right":
                    y = top + 0.5 * node_size.h + 2;
                    x = left + node_size.w;
                    break;
                  case "bottom":
                    y = top + node_size.h;
                    x = left + 0.5 * node_size.w + 1;
                    break;
                  case "left":
                    y = top + 0.5 * node_size.h + 2;
                    x = left;
                    break;
                }
                begPoint = {
                  id: beginningPointId,
                  coordinates: { x, y },
                  type: "anchor_point",
                };
              }
            } else {
              begPoint = points.find((point) => point.id === beginningPointId)!;
            }
            if (endType === "anchor_point") {
              const node = nodes.find((node) => node.id === endPointId);
              if (node) {
                const {
                  coordinates: { left, top },
                } = node;
                let x: number = left;
                let y: number = top;
                switch (endPosition) {
                  case "top":
                    y = top;
                    x = left + node_size.w * 0.5 + 1;
                    break;
                  case "right":
                    y = top + 0.5 * node_size.h + 2;
                    x = left + node_size.w;
                    break;
                  case "bottom":
                    y = top + node_size.h;
                    x = left + 0.5 * node_size.w + 1;
                    break;
                  case "left":
                    y = top + 0.5 * node_size.h + 2;
                    x = left;
                    break;
                }
                endPoint = {
                  id: endPointId,
                  coordinates: { x, y },
                  type: "anchor_point",
                };
              }
            } else {
              endPoint = points.find((point) => point.id === endPointId)!;
            }
            return (
              <BrokenLine
                key={connection.id}
                begPoint={begPoint}
                endPoint={endPoint}
                direction={direction}
                turnCoordinate={turnCoordinate}
                id={connection.id}
                elementType="connection"
              />
            );
          }
        })}
        {lines.map((line) => {
          const { beginningPointId, endPointId } = line;

          const begPoint = points.find(
            (point) => point.id === beginningPointId
          )!;
          const endPoint = points.find((point) => point.id === endPointId)!;
          return <Line key={line.id} begPoint={begPoint} endPoint={endPoint} />;
        })}
        {shapes.map((shape) => {
          const { shape_name, centerPointId, r, id } = shape;
          if (shape_name === "circle") {
            const {
              coordinates: { x, y },
            } = points.find((point) => point.id === centerPointId)!;
            return (
              <ChartCircle
                x={x}
                y={y}
                r={r}
                id={id}
                key={id}
                pointId={centerPointId}
                elementType="shape"
              />
            );
          }
          return <></>;
        })}
      </svg>
    </ElementsContainer>
  );
};

export default CanvasElements;

const ElementsContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 20;
  cursor: ${(props: { mode: string }) =>
    ["edit", "view"].includes(props.mode) ? "grab" : "default"};
  user-select: none;
  overflow: hidden;
`;
