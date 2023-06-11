export interface ElementsState {
  mouseCoordinates: PointCoordinates;
  originPoint: PointCoordinates;
  isFirstClicked: boolean;
  lastId: number;
  node_size: { w: number; h: number };
  draft: StateDraft;
  connection_type: ConnectionType;
  connection_dir: BrokenLineDirection;
  triangle_dir: APPositions;
  selectedIds: selectedIdsType;
  elements: ElementsStore & ElementsStoreKeys;
}

export type StateDraft = [
  string,
  JointType,
  PointCoordinates,
  APPositions | null
][];

interface ElementsStore {
  nodes: ChartNode[];
  points: ChartPoint[];
  anchor_points: AnchorPoint[];
  lines: (ChartLine & ChartElement)[];
  texts: TextElement[];
  shapes: (ChartCircle | ChartTriangle)[];
  connections: ChartConnection[];
}

export type selectedIdsType = {
  [key in keyof TypeOfElement as `${TypeOfElement}s`]: string[];
};

type ElementsStoreKeys = {
  [key in keyof TypeOfElement as `${TypeOfElement}s`]: any[];
};

export type NameOfElementsArrayKey = `${TypeOfElement}s`;

export interface NodeCoordinates {
  top: number;
  left: number;
}

export type TypeOfElement =
  | "node"
  | "point"
  | "line"
  | "anchor_point"
  | "connection"
  | "shape"
  | "text";

export interface ChartElement {
  id: string;
  type: TypeOfElement;
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
  connects: PointChild[];
}

export type AnchorPoint = APoint & ChartElement;

export interface PointCoordinates {
  x: number;
  y: number;
}

export interface CPoint {
  coordinates: PointCoordinates;
  linkedTo: PointChild[];
}

export type PointChild = {
  elementType: TypeOfElement;
  elementId: string;
};

export type ChartPoint = CPoint & ChartElement;

export type ConnectionType = "straight" | "bezier" | "broken";

export type JointType = "point" | "anchor_point";

export interface ChartLine {
  beginningPointId: string;
  endPointId: string;
  colour: string;
  strokeWidth: number;
  arrowBeg: boolean;
  arrowEnd: boolean;
}

export interface TextElement {
  id: string;
  type: "text_line" | "text_block";
  coordinates: { top: number; left: number };
  value: string;
}

export type ShapeType = "circle" | "triangle" | "frame";

export interface ChartShape {
  shape_name: ShapeType;
  id: string;
  strokeColour: string;
  type: "shape";
}

export interface ChartCircle extends ChartShape {
  shape_name: "circle";
  type: "shape";
  r: number; //radius
  originPointId: string;
}

export interface ChartTriangle extends ChartShape {
  shape_name: "triangle";
  r: number; //side
  originPointId: string;
  isMirrored: boolean;
  direction: APPositions;
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
  arrowBeg: boolean;
  arrowEnd: boolean;
}
