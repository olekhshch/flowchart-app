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

interface ElementsState {
  lastId: number;
  elements: (ChartNode | AnchorPoint)[];
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
  elements: [],
};

const elementsSlice = createSlice({
  name: "elements",
  initialState,
  reducers: {
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
      state.elements = [...state.elements, newNode];
    },
    setNodeCoordinates: (state, { payload }) => {
      const newElements = state.elements.map((element) => {
        if (element.id === payload.nodeId) {
          return {
            ...element,
            coordinates: { top: payload.newTop, left: payload.newLeft },
          };
        }
        return element;
      });
      state.elements = newElements;
    },
    renameNode: (state, { payload }) => {
      const { nodeId, newTitle } = payload;
      state.elements = state.elements.map((element) => {
        if (element.id === nodeId) {
          return { ...element, title: newTitle };
        }
        return element;
      });
    },
  },
});

export default elementsSlice.reducer;

export const { addNode, setNodeCoordinates, renameNode } =
  elementsSlice.actions;
