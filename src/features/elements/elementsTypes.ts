interface NodeCoordinates {
  top: number;
  left: number;
}

interface ChartElement {
  id: string;
  type: "node" | "point" | "line" | "anchor_point";
}

interface CNode {
  id: string;
  title: string;
  note: string;
  coordinates: NodeCoordinates;
}

export type ChartNode = ChartElement & CNode;

interface APoint {
  parentNodeId: string;
  position: "top" | "left" | "right" | "bottom";
}

export type AnchorPoint = APoint & ChartElement;

interface PointCoordinates {
  x: number;
  y: number;
}

interface CPoint {
  coordinates: PointCoordinates;
}

export type ChartPoint = CPoint & ChartElement;

interface ElementsState {
  lastId: number;
  elements: {
    nodes: ChartNode[];
    points: ChartPoint[];
  };
}

export interface ChartLine {
  beginningPointId: string;
  endPointId: string;
  colour: string;
  strokeWidth: number;
}
