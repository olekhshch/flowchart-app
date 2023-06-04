import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  ElementsState,
  ChartLine,
  TextElement,
  AnchorPoint,
  ChartCircle,
  ChartElement,
  ChartNode,
  ChartPoint,
  PointCoordinates,
  ConnectionType,
  BrokenLineDirection,
  TypeOfElement,
  selectedIdsType,
  APPositions,
  ChartTriangle,
  PointChild,
} from "./elementsTypes";

const emptySelection: selectedIdsType = {
  nodes: [],
  points: [],
  anchor_points: [],
  lines: [],
  texts: [],
  shapes: [],
  connections: [],
};

const initialState: ElementsState = {
  mouseCoordinates: { x: 0, y: 0 },
  lastId: 0,
  draft: [],
  connection_type: "straight",
  connection_dir: "V",
  node_size: { w: 140, h: 50 },
  triangle_dir: "top",
  selectedIds: { ...emptySelection },
  elements: {
    nodes: [],
    points: [],
    anchor_points: [],
    lines: [],
    texts: [],
    shapes: [],
    connections: [],
  },
};

export const anchorPointPositions: APPositions[] = [
  "top",
  "right",
  "bottom",
  "left",
];

const elementsSlice = createSlice({
  name: "elements",
  initialState,
  reducers: {
    setMouseCoordinates: (
      state,
      { payload }: PayloadAction<PointCoordinates>
    ) => {
      state.mouseCoordinates = payload;
    },
    // nodes
    addNodeByClick: (state) => {
      const left = state.mouseCoordinates.x - 0.5 * state.node_size.w;
      const top = state.mouseCoordinates.y - 0.5 * state.node_size.h;
      state.lastId += 1;
      const nodeId = state.lastId.toString();
      const newNode: ChartNode = {
        id: nodeId,
        type: "node",
        title: "New node",
        note: "",
        coordinates: { left, top },
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
        state.elements.anchor_points = [
          ...state.elements.anchor_points,
          newAnchorPoint,
        ];
      });
    },
    addNode: (state, action: PayloadAction<{ left: number; top: number }>) => {
      const { left, top } = action.payload;
      state.lastId += 1;
      const nodeId = state.lastId.toString();
      const newNode: ChartNode = {
        id: nodeId,
        type: "node",
        title: "New node",
        note: "",
        coordinates: { left, top },
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
        state.elements.anchor_points = [
          ...state.elements.anchor_points,
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
    addPointByClick: (state) => {
      state.lastId += 1;
      const newPoint: ChartPoint = {
        id: state.lastId.toString(),
        coordinates: state.mouseCoordinates,
        type: "point",
        linkedTo: [],
      };
      state.elements.points = [...state.elements.points, newPoint];
    },
    addPointByCoordinates: (state, action: PayloadAction<PointCoordinates>) => {
      const { x, y } = action.payload;
      state.lastId += 1;
      const newPoint: ChartPoint = {
        id: state.lastId.toString(),
        coordinates: { x, y },
        type: "point",
        linkedTo: [],
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
    addTextLineByClick: (state) => {
      state.lastId += 1;
      const { x, y } = state.mouseCoordinates;
      const newTextLine: TextElement = {
        id: state.lastId.toString(),
        type: "text_line",
        value: "",
        coordinates: { left: x, top: y },
      };
      state.elements.texts = [...state.elements.texts, newTextLine];
    },
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
    setTextElementValue: (
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
        textType: TypeOfElement;
      }>
    ) => {
      const { textId, newLeft, newTop, textType } = action.payload;
      state.elements[`${textType}s`] = state.elements[`${textType}s`].map(
        (text) => {
          if (text.id === textId) {
            return { ...text, coordinates: { left: newLeft, top: newTop } };
          }
          return text;
        }
      );
    },
    //connections
    setConnectionType: (state, action: PayloadAction<ConnectionType>) => {
      const type = action.payload;
      state.connection_type = type;
    },
    setConnectionDirection: (
      state,
      { payload }: PayloadAction<BrokenLineDirection>
    ) => {
      state.connection_dir = payload;
    },
    connectTwoPoints: (state) => {
      const [begPoint, begType, BegCoordinates, begPosition] = state.draft[0];
      const [endPoint, endType, EndCoordinates, endPosition] = state.draft[1];
      if (begPoint && endPoint) {
        state.lastId += 1;
        const d =
          state.connection_dir === "H"
            ? (BegCoordinates.y + EndCoordinates.y) / 2
            : (BegCoordinates.x + EndCoordinates.x) / 2;
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
            direction: state.connection_dir,
            turnCoordinate: d,
          },
        ];
        state.elements.points = state.elements.points.map((point) => {
          if ([begPoint, endPoint].includes(point.id)) {
            return {
              ...point,
              linkedTo: [
                ...point.linkedTo,
                { connection: state.lastId.toString() },
              ],
            };
          }
          return point;
        });
      }
    },
    setBrokenLineTurnCoord: (
      state,
      { payload }: PayloadAction<{ id: string; newCoord: number }>
    ) => {
      const { id, newCoord } = payload;
      state.elements.connections = state.elements.connections.map(
        (connection) => {
          if (connection.id === id) {
            return { ...connection, turnCoordinate: newCoord };
          }
          return connection;
        }
      );
    },
    //shapes
    addCircleByClick: (state) => {
      state.lastId += 1;
      const originPointId = state.lastId.toString();
      const newPoint: ChartPoint = {
        id: state.lastId.toString(),
        coordinates: state.mouseCoordinates,
        type: "point",
        linkedTo: [{ shape: (state.lastId + 1).toString() }],
      };
      state.elements.points = [...state.elements.points, newPoint];

      state.lastId += 1;
      const newCircle: ChartCircle = {
        id: state.lastId.toString(),
        r: 20,
        shape_name: "circle",
        strokeColour: "main",
        originPointId,
        type: "shape",
      };
      state.elements.shapes = [...state.elements.shapes, newCircle];
    },
    addCircle: (state, { payload }: PayloadAction<string>) => {
      state.lastId += 1;
      const newCircle: ChartCircle = {
        id: state.lastId.toString(),
        r: 20,
        shape_name: "circle",
        strokeColour: "main",
        originPointId: payload,
        type: "shape",
      };
      state.elements.shapes = [...state.elements.shapes, newCircle];
    },
    addTriangleByClick: (state) => {
      state.lastId += 1;
      const originPointId = state.lastId.toString();
      const newPoint: ChartPoint = {
        id: state.lastId.toString(),
        coordinates: state.mouseCoordinates,
        type: "point",
        linkedTo: [{ shape: (state.lastId + 1).toString() }],
      };
      state.elements.points = [...state.elements.points, newPoint];

      state.lastId += 1;
      const newTriangle: ChartTriangle = {
        id: state.lastId.toString(),
        r: 40,
        shape_name: "triangle",
        strokeColour: "main",
        originPointId,
        type: "shape",
        isMirrored: false,
        direction: state.triangle_dir,
      };
      state.elements.shapes = [...state.elements.shapes, newTriangle];
    },
    addTriangle: (state, { payload }: PayloadAction<string>) => {
      state.lastId += 1;
      const newTriangle: ChartTriangle = {
        id: state.lastId.toString(),
        r: 40,
        shape_name: "triangle",
        strokeColour: "main",
        originPointId: payload,
        type: "shape",
        isMirrored: false,
        direction: state.triangle_dir,
      };
      state.elements.shapes = [...state.elements.shapes, newTriangle];
    },
    setGlobalTriangleDir: (state, { payload }: PayloadAction<APPositions>) => {
      state.triangle_dir = payload;
    },
    addToDraft: (state, { payload }) => {
      console.log(payload);
      state.draft = [...state.draft, payload];
    },
    clearDraft: (state) => {
      state.draft = [];
    },

    //selection
    clearSelection: (state) => {
      state.selectedIds = { ...emptySelection };
    },
    selectElement: (
      state,
      {
        payload,
      }: PayloadAction<{ elementId: string; elementType: TypeOfElement }>
    ) => {
      const { elementId, elementType } = payload;
      if (
        state.selectedIds[`${elementType}s`] &&
        !state.selectedIds[`${elementType}s`].includes(elementId)
      ) {
        state.selectedIds[`${elementType}s`].push(elementId);
      }
    },
    deselectElement: (
      state,
      {
        payload,
      }: PayloadAction<{ elementId: string; elementType: TypeOfElement }>
    ) => {
      const { elementId, elementType } = payload;
      if (state.selectedIds[`${elementType}s`]) {
        state.selectedIds[`${elementType}s`] = state.selectedIds[
          `${elementType}s`
        ].filter((id) => id !== elementId);
      }
    },
    leaveSelected: (state, { payload }: PayloadAction<`${TypeOfElement}s`>) => {
      const savedSelection = [...state.selectedIds[payload]];
      state.selectedIds = { ...emptySelection };
      state.selectedIds[payload] = savedSelection;
    },
    deleteSelected: (state) => {
      const selectedEntries = Object.entries(state.selectedIds);
      selectedEntries.forEach(([key, arrayOfIds]) => {
        const keyOfArray = key as `${TypeOfElement}s`;
        if (keyOfArray === "lines") {
          let pointsIdsToDelete: string[] = [];
          state.elements[keyOfArray] = state.elements[keyOfArray].filter(
            (line) => {
              if (arrayOfIds.includes(line.id)) {
                pointsIdsToDelete.push(line.beginningPointId);
                pointsIdsToDelete.push(line.endPointId);
              }
              return !arrayOfIds.includes(line.id);
            }
          );
          // state.elements.points = state.elements.points.filter(
          //   (point) => !pointsIdsToDelete.includes(point.id)
          // );
        } else if (keyOfArray === "points") {
          state.elements[keyOfArray] = state.elements[keyOfArray].filter(
            (point) => {
              if (point.linkedTo !== null) {
                point.linkedTo.forEach((child) => {
                  const [key, value] = Object.entries(child).flat();
                  const keyName = key as TypeOfElement;
                  state.elements[`${keyName}s`] = state.elements[
                    `${keyName}s`
                  ].filter((element) => element.id !== value);
                });
              }
              return !arrayOfIds.includes(point.id);
            }
          );
        } else if (keyOfArray === "nodes") {
          state.elements.anchor_points = state.elements.anchor_points.filter(
            (apoint) => !state.selectedIds.nodes.includes(apoint.parentNodeId)
          );
          state.elements[keyOfArray] = state.elements[keyOfArray].filter(
            (node) => {
              return !arrayOfIds.includes(node.id);
            }
          );
        } else {
          state.elements[keyOfArray] = state.elements[keyOfArray].filter(
            (element) => !arrayOfIds.includes(element.id)
          );
        }
      });
    },
  },
});

export default elementsSlice.reducer;

export const {
  setMouseCoordinates,
  addNode,
  addNodeByClick,
  setNodeCoordinates,
  renameNode,
  addPointByClick,
  addPointByCoordinates,
  setPointCoordinates,
  addLine,
  addTextLineByClick,
  addTextLine,
  setTextElementValue,
  setTextCoordinates,
  setConnectionType,
  setConnectionDirection,
  connectTwoPoints,
  setBrokenLineTurnCoord,
  addToDraft,
  clearDraft,
  addCircleByClick,
  addCircle,
  addTriangleByClick,
  addTriangle,
  setGlobalTriangleDir,
  clearSelection,
  selectElement,
  deselectElement,
  leaveSelected,
  deleteSelected,
} = elementsSlice.actions;
