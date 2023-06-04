import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import {
  clearSelection,
  deselectElement,
  renameNode,
  selectElement,
  setNodeCoordinates,
} from "./features/elements/elementsSlice";
import { ChartNode } from "./features/elements/elementsTypes";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./app/store";
import { MenuContext } from "./menuContext";
import { setMinibarMsg } from "./features/general/generalSlice";
import { minibarMsg } from "./features/general/minibarMsgs";

interface ChartNodeProps {
  node: ChartNode;
  scale: number;
}

interface StyledCompProps {
  top: number;
  left: number;
  scale: number;
  isSelected: boolean;
}

const ChartNodeEl = ({ node, scale }: ChartNodeProps) => {
  const dispatch = useDispatch();

  const spanEl = useRef<HTMLSpanElement>(null);
  const inputEl = useRef<HTMLInputElement>(null);
  const {
    node_size: { w, h },
    selectedIds,
  } = useSelector((state: RootState) => state.elements);

  const [editMode, setEditMode] = useState(false);
  const [inputSize, setInputSize] = useState({ width: 100, height: 22 });
  const [nodeTitle, setNodeTitle] = useState(node.title);

  const { setIsMenuOpen, selectedOnly, setSelectedOnly } =
    React.useContext(MenuContext);

  const handleClick = (e: React.MouseEvent) => {
    if (!e.shiftKey && e.button === 0) {
      dispatch(clearSelection());
    }

    dispatch(selectElement({ elementId: node.id, elementType: node.type }));
    if (e.shiftKey && selectedIds.nodes.includes(node.id)) {
      dispatch(deselectElement({ elementId: node.id, elementType: node.type }));
    }

    setIsMenuOpen(true);
    if (selectedOnly !== `${node.type}s`) {
      setSelectedOnly(null);
    }
  };

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
    const { width, height } = spanEl.current!.getBoundingClientRect();
    setInputSize({ width, height });
    setEditMode(true);
    setIsMenuOpen(false);
    dispatch(clearSelection());
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

  const changeMinibarMsg = (e: React.MouseEvent) => {
    if (editMode) {
      dispatch(setMinibarMsg(minibarMsg.Node_edit_hover));
    } else {
      dispatch(setMinibarMsg(minibarMsg.Node_hover));
    }

    e.stopPropagation();
  };

  if (editMode) {
    return (
      <StyledNode
        onMouseOver={changeMinibarMsg}
        top={node.coordinates.top}
        left={node.coordinates.left}
        scale={scale}
        isSelected={false}
      >
        <form
          onSubmit={handleSubmit}
          style={{ width: w + "px", height: h + "px" }}
        >
          <input
            value={node.title}
            style={{
              width: `${inputSize.width}px`,
            }}
            placeholder="Can't be empty"
            onClick={(e) => e.stopPropagation()}
            onChange={handleInputChange}
            ref={inputEl}
          />
          <div className="form-buttons-right">
            <button className="form_btn">N</button>
            <input
              className="form_btn"
              type="submit"
              title="note"
              value="S"
            ></input>
          </div>
        </form>
      </StyledNode>
    );
  }

  return (
    <StyledNode
      top={node.coordinates.top}
      left={node.coordinates.left}
      scale={scale}
      isSelected={selectedIds.nodes.includes(node.id)}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseOver={changeMinibarMsg}
    >
      <div>
        <div className="node" style={{ width: w + "px", height: h + "px" }}>
          <span ref={spanEl} onDoubleClick={handleDoubleClick}>
            {node.title}
          </span>
        </div>
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

  form {
    background-color: var(--node-bg);
    cursor: default;
    text-overflow: ellipsis;
    align-items: center;
    overflow: hidden;
    border-radius: 6px;
    border: 1px solid
      ${(props) => (props.isSelected ? "orange" : "var(--main)")};
  }

  textarea {
    resize: none;
    background: none;
    border: none;
    padding: 2px;
    margin: 2px 0;
    height: 100%;
  }

  .form-buttons-right {
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 2px;
    right: -24px;
    top: 0;
  }

  .form_btn {
    background: none;
    border: 2px solid var(--node-bg);
    border-radius: 4px;
    padding: 0 4px;
    color: var(--node-bg);
    cursor: pointer;
  }

  .node {
    background-color: var(--node-bg);
    cursor: default;
    text-overflow: ellipsis;
    align-items: center;
    overflow: hidden;
    border-radius: 6px;
    border: 1px solid ${(props) => (props.isSelected ? "orange" : "white")};
  }

  .node:hover {
    border: 1px solid
      ${(props) => (props.isSelected ? "orange" : "var(--main)")};
  }

  span {
    padding: 4px 6px;
    text-align: justify;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: var(--node-font-size);
  }
`;
