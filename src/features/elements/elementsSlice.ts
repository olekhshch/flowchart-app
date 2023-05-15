import { createSlice } from "@reduxjs/toolkit";
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
    points: [],
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
    addPoint: (state) => {
      state.lastId += 1;
      const newPoint: ChartPoint = {
        id: state.lastId.toString(),
        coordinates: { x: 10, y: 20 },
        type: "point",
      };
      state.elements.points = [...state.elements.points, newPoint];
    },
  },
});

export default elementsSlice.reducer;

export const { addNode, setNodeCoordinates, renameNode, addPoint } =
  elementsSlice.actions;
