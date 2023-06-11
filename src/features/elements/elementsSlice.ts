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
  ChartConnection,
} from "./elementsTypes";

import { movePoint } from "./movePoint";
import { removeLink } from "./removeLink";
import { setElementCoordinates } from "./moveElement";

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
  originPoint: { x: 0, y: 0 },
  isFirstClicked: false,
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
    setOriginCoordinates: (state) => {
      state.originPoint = { ...state.mouseCoordinates };
    },
    setIsFirstClicked: (state, { payload }: PayloadAction<boolean>) => {
      state.isFirstClicked = payload;
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
          connects: [],
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
          connects: [],
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
      const lineId = state.lastId.toString();
      const newLine: ChartLine & ChartElement = {
        type: "line",
        beginningPointId,
        endPointId,
        colour,
        strokeWidth: 2,
        id: lineId,
        arrowBeg: false,
        arrowEnd: false,
      };
      state.elements.lines = [...state.elements.lines, newLine];
      state.elements.points = state.elements.points.map((point) => {
        if (point.id === beginningPointId || point.id === endPointId) {
          const newLink = {
            elementId: lineId,
            elementType: "line",
          } as PointChild;
          return {
            ...point,
            linkedTo: [...point.linkedTo, newLink],
          };
        }
        return point;
      });
    },
    setLineByClick: (state) => {
      state.lastId += 1;
      const beginningPointId = state.lastId.toString();

      const newBegPoint: ChartPoint = {
        id: beginningPointId,
        coordinates: state.originPoint,
        type: "point",
        linkedTo: [
          { elementId: (state.lastId + 2).toString(), elementType: "line" },
        ],
      };

      state.lastId += 1;
      const endPointId = state.lastId.toString();

      const newEndPoint: ChartPoint = {
        id: endPointId,
        coordinates: state.mouseCoordinates,
        type: "point",
        linkedTo: [
          { elementId: (state.lastId + 1).toString(), elementType: "line" },
        ],
      };

      state.elements.points = [
        ...state.elements.points,
        newBegPoint,
        newEndPoint,
      ];
      state.lastId += 1;
      const lineId = state.lastId.toString();

      const newLine: ChartLine & ChartElement = {
        type: "line",
        beginningPointId,
        endPointId,
        colour: "var(--main)",
        strokeWidth: 2,
        id: lineId,
        arrowBeg: false,
        arrowEnd: false,
      };

      state.elements.lines = [...state.elements.lines, newLine];
    },
    setBegArrow: (
      state,
      {
        payload,
      }: PayloadAction<{
        ids: string[];
        isOn: boolean;
        elementType: "line" | "connection";
      }>
    ) => {
      state.elements[`${payload.elementType}s`] = state.elements[
        `${payload.elementType}s`
      ].map((element) => {
        if (payload.ids.includes(element.id)) {
          if (payload.elementType === "connection") {
            const connection = element as ChartConnection;
            return { ...connection, arrowBeg: payload.isOn } as ChartConnection;
          } else if (payload.elementType === "line") {
            const line = element as ChartLine & ChartElement;
            return { ...line, arrowBeg: payload.isOn } as ChartLine &
              ChartElement;
          }
        }
        return element;
      });
    },
    setEndArrow: (
      state,
      {
        payload,
      }: PayloadAction<{
        ids: string[];
        isOn: boolean;
        elementType: "line" | "connection";
      }>
    ) => {
      state.elements[`${payload.elementType}s`] = state.elements[
        `${payload.elementType}s`
      ].map((element) => {
        if (payload.ids.includes(element.id)) {
          if (payload.elementType === "connection") {
            const connection = element as ChartConnection;
            return { ...connection, arrowEnd: payload.isOn } as ChartConnection;
          } else if (payload.elementType === "line") {
            const line = element as ChartLine & ChartElement;
            return { ...line, arrowEnd: payload.isOn } as ChartLine &
              ChartElement;
          }
        }
        return element;
      });
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
        const connectionId = state.lastId.toString();
        const newConnection: ChartConnection = {
          id: connectionId,
          beginningPointId: begPoint,
          endPointId: endPoint,
          begType,
          endType,
          line_type: state.connection_type,
          begPosition,
          endPosition,
          direction: state.connection_dir,
          turnCoordinate: d,
          arrowBeg: false,
          arrowEnd: true,
        };
        state.elements.connections = [
          ...state.elements.connections,
          newConnection,
        ];
        state.elements.points = state.elements.points.map((point) => {
          if ([begPoint, endPoint].includes(point.id)) {
            const newLink = {
              elementId: connectionId,
              elementType: "connection",
            } as PointChild;
            return {
              ...point,
              linkedTo: [...point.linkedTo, newLink],
            };
          }
          return point;
        });
        state.elements.anchor_points = state.elements.anchor_points.map(
          (aPoint) => {
            if (
              (begPoint === aPoint.parentNodeId &&
                begPosition === aPoint.position) ||
              (endPoint === aPoint.parentNodeId &&
                endPosition === aPoint.position)
            ) {
              const newLink = {
                elementId: connectionId,
                elementType: "connection",
              } as PointChild;
              return {
                ...aPoint,
                connects: [...aPoint.connects, newLink],
              };
            }
            return aPoint;
          }
        );
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
        linkedTo: [
          { elementId: (state.lastId + 1).toString(), elementType: "shape" },
        ],
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
        linkedTo: [
          { elementId: (state.lastId + 1).toString(), elementType: "shape" },
        ],
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
        if (keyOfArray === "points") {
          state.elements.points = state.elements.points.filter((point) => {
            if (arrayOfIds.includes(point.id)) {
              point.linkedTo.forEach((child) => {
                const { elementId, elementType } = child;
                state.elements[`${elementType}s`] = state.elements[
                  `${elementType}s`
                ].filter((element: ChartElement) => element.id !== elementId);
              });
            }
            return !arrayOfIds.includes(point.id);
          });
        } else if (
          keyOfArray === "shapes" ||
          keyOfArray === "connections" ||
          keyOfArray === "lines"
        ) {
          state.elements[keyOfArray] = state.elements[keyOfArray].filter(
            (element) => {
              if (element.type === "shape") {
                const shape = element as ChartCircle | ChartTriangle;
                if (arrayOfIds.includes(shape.id)) {
                  const { originPointId } = shape;
                  state.elements.points = state.elements.points.map((point) => {
                    if (point.id === originPointId) {
                      return removeLink(point, {
                        elementType: shape.type,
                        elementId: shape.id,
                      });
                    }
                    return point;
                  });
                }
              } else if (
                element.type === "connection" ||
                element.type === "line"
              ) {
                const connection = element as
                  | ChartConnection
                  | (ChartLine & ChartElement);
                const { beginningPointId, endPointId } = connection;
                state.elements.points = state.elements.points.map((point) => {
                  if ([beginningPointId, endPointId].includes(point.id)) {
                    return removeLink(point, {
                      elementId: connection.id,
                      elementType: element.type,
                    });
                  }
                  return point;
                });
              }
              return !arrayOfIds.includes(element.id);
            }
          );
        } else if (keyOfArray === "nodes") {
          state.elements.nodes = state.elements.nodes.filter((node) => {
            if (arrayOfIds.includes(node.id)) {
              state.elements.anchor_points =
                state.elements.anchor_points.filter((aPoint) => {
                  if (arrayOfIds.includes(aPoint.parentNodeId)) {
                    aPoint.connects.forEach((child) => {
                      const { elementId, elementType } = child;
                      const connectionType = elementType as "connection";
                      state.elements[`${connectionType}s`] = state.elements[
                        `${connectionType}s`
                      ].filter(
                        (element: ChartElement) => element.id !== elementId
                      );
                    });
                  }
                  return !arrayOfIds.includes(aPoint.parentNodeId);
                });
            }
            return !arrayOfIds.includes(node.id);
          });
        } else {
          state.elements[keyOfArray] = state.elements[keyOfArray].filter(
            (element) => {
              return !arrayOfIds.includes(element.id);
            }
          );
        }
      });
      state.selectedIds = { ...emptySelection };
      // selectedEntries.forEach(([key, arrayOfIds]) => {
      //   const keyOfArray = key as `${TypeOfElement}s`;
      //   if (keyOfArray === "lines") {
      //     let pointsIdsToDelete: string[] = [];
      //     state.elements[keyOfArray] = state.elements[keyOfArray].filter(
      //       (line) => {
      //         if (arrayOfIds.includes(line.id)) {
      //           pointsIdsToDelete.push(line.beginningPointId);
      //           pointsIdsToDelete.push(line.endPointId);
      //         }
      //         return !arrayOfIds.includes(line.id);
      //       }
      //     );
      //     // state.elements.points = state.elements.points.filter(
      //     //   (point) => !pointsIdsToDelete.includes(point.id)
      //     // );
      //   } else if (keyOfArray === "points") {
      //     state.elements[keyOfArray] = state.elements[keyOfArray].filter(
      //       (point) => {
      //         if (point.linkedTo !== null) {
      //           point.linkedTo.forEach((child) => {
      //             console.log("linked to" + child);
      //             const [key, value] = Object.entries(child).flat();
      //             const keyName = key as TypeOfElement;
      //             console.log(keyName);
      //             state.elements[`${keyName}s`] = state.elements[
      //               `${keyName}s`
      //             ].filter((element) => element.id !== value);
      //           });
      //         }
      //         return !arrayOfIds.includes(point.id);
      //       }
      //     );
      //   } else if (keyOfArray === "nodes") {
      //     state.elements.anchor_points = state.elements.anchor_points.filter(
      //       (apoint) => !state.selectedIds.nodes.includes(apoint.parentNodeId)
      //     );
      //     state.elements[keyOfArray] = state.elements[keyOfArray].filter(
      //       (node) => {
      //         return !arrayOfIds.includes(node.id);
      //       }
      //     );
      //   } else {
      //     state.elements[keyOfArray] = state.elements[keyOfArray].filter(
      //       (element) => {
      //         return !arrayOfIds.includes(element.id);
      //       }
      //     );
      //   }
      // });
    },
    moveSelected: (state) => {
      const dx = state.mouseCoordinates.x - state.originPoint.x;
      const dy = state.mouseCoordinates.y - state.originPoint.y;
      const selectedEntries = Object.entries(state.selectedIds);
      selectedEntries.forEach(([key, arrayOfIds]) => {
        const keyName = key as `${TypeOfElement}s`;
        if (keyName === "nodes") {
          state.elements[keyName] = state.elements[keyName].map((element) => {
            if (arrayOfIds.includes(element.id)) {
              return setElementCoordinates(element, dx, dy)!;
            }
            return element;
          });
        }
      });
      // selectedEntries.forEach(([key, arrayOfIds]) => {
      //   const keyOfArray = key as `${TypeOfElement}s`;
      //   if (keyOfArray === "lines") {
      //     state.elements.lines.map((line) => {
      //       if (arrayOfIds.includes(line.id)) {
      //         const { beginningPointId, endPointId } = line;
      //         state.elements.points = state.elements.points.map((point) => {
      //           if ([beginningPointId, endPointId].includes(point.id)) {
      //             return movePoint(point, { dx, dy });
      //           }
      //           return point;
      //         });
      //       }
      //     });
      //   } else if (keyOfArray === "points") {
      //     state.elements.points.map((point) => {
      //       if (arrayOfIds.includes(point.id)) {
      //         return movePoint(point, { dx, dy });
      //       }
      //       return point;
      //     });
      //   }
      // });
    },
  },
});

export default elementsSlice.reducer;

export const {
  setMouseCoordinates,
  setOriginCoordinates,
  setIsFirstClicked,
  addNode,
  addNodeByClick,
  setNodeCoordinates,
  renameNode,
  addPointByClick,
  addPointByCoordinates,
  setPointCoordinates,
  setLineByClick,
  addLine,
  setBegArrow,
  setEndArrow,
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
  moveSelected,
} = elementsSlice.actions;
