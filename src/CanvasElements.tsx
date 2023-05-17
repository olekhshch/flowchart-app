import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "./app/store";
import ChartNodeEl from "./ChartNode";
import Line from "./canvas_elements/Line";
import ChartPointEl from "./canvas_elements/ChartPoint";

const CanvasElements = (props: { scale: number }) => {
  const {
    elements: { nodes, points, lines },
  } = useSelector((state: RootState) => state.elements);
  return (
    <ElementsContainer id="elements-container">
      {nodes.map((element) => {
        return (
          <ChartNodeEl key={element.id} node={element} scale={props.scale} />
        );
      })}
      {points.map((point) => {
        return (
          <ChartPointEl key={point.id} point={point} scale={props.scale} />
        );
      })}
      <svg width="100%" height="100%">
        {lines.map((line) => {
          const { beginningPointId, endPointId } = line;
          console.log(beginningPointId, endPointId, points);

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
  cursor: grab;
  user-select: none;
  overflow: hidden;
`;
