export interface NodeCoordinates {
  top: number;
  left: number;
}

export interface ChartElement {
  id: string;
  type: "node" | "point" | "line" | "anchor_point";
}

export interface CNode {
  id: string;
  title: string;
  note: string;
  coordinates: NodeCoordinates;
}

export type ChartNode = ChartElement & CNode;

export type APPositions = "top" | "left" | "right" | "bottom";

export interface APoint {
  id: string;
  parentNodeId: string;
  position: APPositions;
}

export type AnchorPoint = APoint & ChartElement;

export interface PointCoordinates {
  x: number;
  y: number;
}

export interface CPoint {
  coordinates: PointCoordinates;
}

export type ChartPoint = CPoint & ChartElement;

export type ConnectionType = "straight" | "bezier" | "broken";

export interface ElementsState {
  lastId: number;
  node_size: { w: number; h: number };
  draft: [string, JointType, APPositions | null][];
  connection_type: ConnectionType;
  connection_dir: BrokenLineDirection;
  elements: {
    nodes: ChartNode[];
    points: ChartPoint[];
    anchorPoints: AnchorPoint[];
    lines: (ChartLine & ChartElement)[];
    texts: TextElement[];
    shapes: (ChartShape & ChartCircle)[];
    connections: ChartConnection[];
  };
}

export type JointType = "point" | "anchor_point";

export interface ChartLine {
  beginningPointId: string;
  endPointId: string;
  colour: string;
  strokeWidth: number;
}

export interface TextElement {
  id: string;
  type: "text_line" | "text_block";
  coordinates: { top: number; left: number };
  value: string;
}

export interface ChartShape {
  shape_name: "circle" | "rect" | "frame";
  id: string;
}

export interface ChartCircle {
  shape_name: "circle";
  r: number;
  strokeColour: string;
}

export type BrokenLineDirection = "H" | "V" | null;

export interface ChartConnection {
  id: string;
  line_type: ConnectionType;
  beginningPointId: string;
  endPointId: string;
  begType: JointType;
  endType: JointType;
  begPosition: APPositions | null;
  endPosition: APPositions | null;
  direction: BrokenLineDirection;
  turnCoordinate: number;
}
