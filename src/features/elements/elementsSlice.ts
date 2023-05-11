import { createSlice } from "@reduxjs/toolkit";
interface NodeCoordinates {
  top: number;
  left: number;
}

interface ChartElement {
  id: string;
  type: "node" | "point" | "line";
}

interface CNode {
  id: string;
  title: string;
  note: string;
  coordinates: NodeCoordinates;
}

export type ChartNode = ChartElement & CNode;

interface ElementsState {
  lastId: number;
  elements: ChartNode[];
}

const initialNodeCoordinates: NodeCoordinates = {
  top: 10,
  left: 10,
};

const initialNode: ChartNode = {
  id: "",
  type: "node",
  title: "New node",
  note: "",
  coordinates: initialNodeCoordinates,
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
      const newNode: ChartNode = {
        ...initialNode,
        id: state.lastId.toString(),
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
  },
});

export default elementsSlice.reducer;

export const { addNode, setNodeCoordinates } = elementsSlice.actions;
