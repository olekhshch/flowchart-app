import { useSelector } from "react-redux";
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

const CanvasElements = (props: { scale: number }) => {
  const { mode } = useSelector((state: RootState) => state.general);
  const {
    elements: { nodes, points, anchorPoints, lines, texts, connections },
  } = useSelector((state: RootState) => state.elements);
  return (
    <ElementsContainer id="elements-container" mode={mode}>
      {nodes.map((element) => {
        return (
          <ChartNodeEl key={element.id} node={element} scale={props.scale} />
        );
      })}
      {anchorPoints.map((a_point) => {
        const parentNode = nodes.find(
          (node) => node.id === a_point.parentNodeId
        );
        return (
          <AnchorPoint key={a_point.id} point={a_point} parent={parentNode!} />
        );
      })}
      {points.map((point) => {
        return (
          <ChartPointEl key={point.id} point={point} scale={props.scale} />
        );
      })}
      {texts.map((text) => {
        return <TextLine key={text.id} data={text} />;
      })}
      <svg width="100%" height="100%">
        {connections.map((connection) => {
          if (connection.line_type === "straight") {
            const { beginningPointId, endPointId } = connection;
            let begPoint0: ChartPoint | APoint;
            let endPoint0: ChartPoint | APoint;
            let begPoint: ChartPoint;
            let endPoint: ChartPoint;
            begPoint = points.find((point) => point.id === beginningPointId)!;
            endPoint = points.find((point) => point.id === endPointId)!;

            return (
              <Line
                key={connection.id}
                begPoint={begPoint}
                endPoint={endPoint}
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
