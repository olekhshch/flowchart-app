import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  ElementsState,
  ChartLine,
  TextElement,
  AnchorPoint,
  ChartCircle,
  ChartConnection,
  CNode,
  ChartElement,
  ChartNode,
  ChartPoint,
  ChartShape,
  NodeCoordinates,
  APoint,
  CPoint,
  PointCoordinates,
} from "./elementsTypes";

const initialNodeCoordinates: NodeCoordinates = {
  top: 10,
  left: 10,
};

const initialState: ElementsState = {
  lastId: 0,
  draft: [],
  connection_type: "straight",
  node_size: { w: 140, h: 50 },
  elements: {
    nodes: [],
    points: [],
    anchorPoints: [],
    lines: [],
    texts: [],
    shapes: [],
    connections: [],
  },
};

export const anchorPointPositions: ("top" | "right" | "bottom" | "left")[] = [
  "top",
  "right",
  "bottom",
  "left",
];

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

      anchorPointPositions.map((position) => {
        state.lastId += 1;
        const newAnchorPoint: AnchorPoint = {
          id: state.lastId.toString(),
          parentNodeId: nodeId,
          position,
          type: "anchor_point",
        };
        state.elements.anchorPoints = [
          ...state.elements.anchorPoints,
          newAnchorPoint,
        ];
      });
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
    //texts
    addTextLine: (state, action: PayloadAction<PointCoordinates>) => {
      const { x, y } = action.payload;
      state.lastId += 1;
      const newTextLine: TextElement = {
        id: state.lastId.toString(),
        type: "text_line",
        value: "",
        coordinates: { left: x, top: y },
      };
      state.elements.texts = [...state.elements.texts, newTextLine];
    },
    setTextLineValue: (
      state,
      action: PayloadAction<{ textId: string; newValue: string }>
    ) => {
      const { newValue, textId } = action.payload;
      state.elements.texts.map((text) => {
        if (text.id === textId) {
          return { ...text, value: newValue };
        }
        return text;
      });
    },
    setTextCoordinates: (
      state,
      action: PayloadAction<{
        textId: string;
        newTop: number;
        newLeft: number;
      }>
    ) => {
      const { textId, newLeft, newTop } = action.payload;
      state.elements.texts = state.elements.texts.map((text) => {
        if (text.id === textId) {
          return { ...text, coordinates: { left: newLeft, top: newTop } };
        }
        return text;
      });
    },
    //connections
    connectTwoPoints: (state) => {
      const [begPoint, begType, begPosition] = state.draft[0];
      const [endPoint, endType, endPosition] = state.draft[1];
      if (begPoint && endPoint) {
        state.lastId += 1;
        if (state.connection_type === "straight")
          state.elements.connections = [
            ...state.elements.connections,
            {
              id: state.lastId.toString(),
              beginningPointId: begPoint,
              endPointId: endPoint,
              begType,
              endType,
              line_type: state.connection_type,
              begPosition,
              endPosition,
            },
          ];
      }
    },
    addToDraft: (state, { payload }) => {
      console.log(payload);
      state.draft = [...state.draft, payload];
    },
    clearDraft: (state) => {
      state.draft = [];
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
  addLine,
  addTextLine,
  setTextLineValue,
  setTextCoordinates,
  connectTwoPoints,
  addToDraft,
  clearDraft,
} = elementsSlice.actions;
