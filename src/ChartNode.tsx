import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import {
  anchorPointPositions,
  renameNode,
  setNodeCoordinates,
} from "./features/elements/elementsSlice";
import { ChartNode } from "./features/elements/elementsTypes";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import AnchorPoint from "./canvas_elements/AnchorPoint";
import { RootState } from "./app/store";

interface ChartNodeProps {
  node: ChartNode;
  scale: number;
}

interface StyledCompProps {
  top: number;
  left: number;
  scale: number;
}

const ChartNodeEl = ({ node, scale }: ChartNodeProps) => {
  const dispatch = useDispatch();
  const nodeEl = useRef<HTMLSpanElement>(null);
  const {
    node_size: { w, h },
  } = useSelector((state: RootState) => state.elements);

  const [editMode, setEditMode] = useState(false);
  const [inputSize, setInputSize] = useState({ width: 100, height: 22 });
  const [nodeTitle, setNodeTitle] = useState(node.title);

  const handleMouseDown = (ev: React.MouseEvent) => {
    const x0 = ev.clientX;
    const y0 = ev.clientY;
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      const dX = x - x0;
      const dY = y - y0;
      const newLeft = node.coordinates.left + dX / scale;
      const newTop = node.coordinates.top + dY / scale;
      dispatch(
        setNodeCoordinates({
          nodeId: node.id,
          newLeft: newLeft >= 0 ? newLeft : 0,
          newTop: newTop >= 0 ? newTop : 0,
        })
      );
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", () => {
      window.removeEventListener("mousemove", handleMouseMove);
    });
    ev.stopPropagation();
  };

  const handleDoubleClick = (ev: React.MouseEvent) => {
    const { width, height } = nodeEl.current!.getBoundingClientRect();
    setInputSize({ width, height });
    console.log(inputSize);
    setEditMode(true);
    ev.stopPropagation();
  };

  const handleInputChange = (e: ChangeEvent) => {
    const { target } = e;
    const newValue = (target as HTMLInputElement)!.value;
    if (newValue.length < 40) {
      dispatch(
        renameNode({
          nodeId: node.id,
          newTitle: (target as HTMLInputElement)!.value,
        })
      );
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (node.title.trim() === "") {
      dispatch(renameNode({ nodeId: node.id, newTitle: nodeTitle }));
      setEditMode(false);
    } else {
      setNodeTitle(node.title);
      setEditMode(false);
    }
  };

  if (editMode) {
    return (
      <StyledForm
        onSubmit={handleSubmit}
        top={node.coordinates.top}
        left={node.coordinates.left}
        scale={scale}
        onMouseDown={handleMouseDown}
      >
        <input
          value={node.title}
          style={{
            width: `${inputSize.width}px`,
          }}
          placeholder="Can't be empty"
          onClick={(e) => e.stopPropagation()}
          onChange={handleInputChange}
        ></input>
      </StyledForm>
    );
  }

  return (
    <StyledNode
      top={node.coordinates.top}
      left={node.coordinates.left}
      scale={scale}
      onMouseDown={handleMouseDown}
    >
      <div>
        <div className="node" style={{ width: w + "px", height: h + "px" }}>
          <span ref={nodeEl} onDoubleClick={handleDoubleClick}>
            {node.title}
          </span>
        </div>
        {/* {anchorPointPositions.map((position) => {
          return <AnchorPoint key={position} position={position} />;
        })} */}
      </div>
    </StyledNode>
  );
};

export default ChartNodeEl;

const StyledNode = styled.article`
  transform-origin: 0 0;
  text-align: center;

  scale: ${(props) => props.scale};
  position: absolute;
  top: ${(props: StyledCompProps) => props.top * props.scale}px;
  left: ${(props) => props.left * props.scale}px;

  .node {
    background-color: var(--node-bg);
    cursor: default;
    text-overflow: ellipsis;
    align-items: center;
    overflow: hidden;
    border-radius: 6px;
    border: 1px solid white;
  }

  .node:hover {
    border: 1px solid var(--main);
  }

  span {
    padding: 4px 6px;
    text-align: justify;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: var(--node-font-size);
  }
`;

const StyledForm = styled.form`
  padding: 4px 10px;
  min-width: 100px;
  max-width: 220px;
  text-align: center;
  scale: ${(props) => props.scale};
  position: absolute;
  top: ${(props: StyledCompProps) => props.top * props.scale}px;
  left: ${(props) => props.left * props.scale}px;
  background-color: gray;
  cursor: default;
  border: 2px solid black;

  input {
    background: none;
    border: none;
    border-bottom: 1px solid black;
    text-overflow: ellipsis;
  }
`;
