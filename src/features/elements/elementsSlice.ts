import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ChartLine } from "./elementsTypes";
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
    lines: (ChartLine & ChartElement)[];
  };
}

export const anchorPointPositions: ("top" | "right" | "bottom" | "left")[] = [
  "top",
  "right",
  "bottom",
  "left",
];

const initialNodeCoordinates: NodeCoordinates = {
  top: 10,
  left: 10,
};

const initialState: ElementsState = {
  lastId: 0,
  elements: {
    nodes: [],
    points: [
      { id: "10", type: "point", coordinates: { x: 40, y: 60 } },
      { id: "11", type: "point", coordinates: { x: 120, y: 74 } },
    ],
    lines: [
      {
        id: "20",
        type: "line",
        colour: "blue",
        beginningPointId: "10",
        endPointId: "11",
        strokeWidth: 2,
      },
    ],
  },
};

const elementsSlice = createSlice({
  name: "elements",
  initialState,
  reducers: {
    // nodes
    addNode: (state) => {
      state.lastId += 1;
      const nodeId = state.lastId.toString();
      const newNode: ChartNode = {
        id: nodeId,
        type: "node",
        title: "New node",
        note: "",
        coordinates: initialNodeCoordinates,
      };
      state.elements.nodes = [...state.elements.nodes, newNode];
    },
    setNodeCoordinates: (state, { payload }) => {
      const newElements = state.elements.nodes.map((element) => {
        if (element.id === payload.nodeId) {
          return {
            ...element,
            coordinates: { top: payload.newTop, left: payload.newLeft },
          };
        }
        return element;
      });
      state.elements.nodes = newElements;
    },
    renameNode: (state, { payload }) => {
      const { nodeId, newTitle } = payload;
      state.elements.nodes = state.elements.nodes.map((element) => {
        if (element.id === nodeId) {
          return { ...element, title: newTitle };
        }
        return element;
      });
    },
    //points
    addPoint: (state, action: PayloadAction<PointCoordinates>) => {
      const { x, y } = action.payload;
      state.lastId += 1;
      const newPoint: ChartPoint = {
        id: state.lastId.toString(),
        coordinates: { x, y },
        type: "point",
      };
      state.elements.points = [...state.elements.points, newPoint];
    },
    setPointCoordinates: (
      state,
      action: PayloadAction<{
        pointId: string;
        coordinates: { newX: number; newY: number };
      }>
    ) => {
      const {
        pointId,
        coordinates: { newX, newY },
      } = action.payload;
      const newElements = state.elements.points.map((element) => {
        if (element.id === pointId) {
          return {
            ...element,
            coordinates: { x: newX, y: newY },
          };
        }
        return element;
      });
      state.elements.points = newElements;
    },
    //line
    addLine: (
      state,
      action: PayloadAction<{
        beginningPointId: string;
        endPointId: string;
        colour: string;
      }>
    ) => {
      const { beginningPointId, endPointId, colour } = action.payload;
      state.lastId += 1;
      const newLine: ChartLine & ChartElement = {
        type: "line",
        beginningPointId,
        endPointId,
        colour,
        strokeWidth: 2,
        id: state.lastId.toString(),
      };
      state.elements.lines = [...state.elements.lines, newLine];
    },
  },
});

export default elementsSlice.reducer;

export const {
  addNode,
  setNodeCoordinates,
  renameNode,
  addPoint,
  setPointCoordinates,
} = elementsSlice.actions;
