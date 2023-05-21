import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { TextElement } from "../features/elements/elementsTypes";
import {
  setTextCoordinates,
  setTextLineValue,
} from "../features/elements/elementsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";

interface TextLineProps {
  data: TextElement;
}

const TextLine = ({ data }: TextLineProps) => {
  const dispatch = useDispatch();
  const { scale } = useSelector((state: RootState) => state.general);

  const [editMode, setEditMode] = useState<boolean>(true);
  const [editModeWidth, setEditModeWidth] = useState(40);
  const divEl = useRef<HTMLDivElement>(null);
  const inputEl = useRef<HTMLInputElement>(null);

  const { coordinates, value, id } = data;
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    dispatch(setTextLineValue({ newValue: currentValue, textId: id }));
  }, [currentValue, dispatch, id]);

  useEffect(() => {
    inputEl.current?.focus();
  }, []);

  const enterEditMode = () => {
    const { width } = divEl.current!.getBoundingClientRect();
    setEditModeWidth(width / scale);
    setEditMode(true);
  };

  const handleMouseDown = (ev: React.MouseEvent) => {
    const x0 = ev.clientX;
    const y0 = ev.clientY;
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      const dX = x - x0;
      const dY = y - y0;
      const newLeft = coordinates.left + dX / scale;
      const newTop = coordinates.top + dY / scale;
      dispatch(setTextCoordinates({ textId: id, newLeft, newTop }));
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", () => {
      window.removeEventListener("mousemove", handleMouseMove);
    });
    ev.stopPropagation();
  };

  if (!editMode) {
    return (
      <ShortTextBlock
        scale={scale}
        top={coordinates.top}
        left={coordinates.left}
        onDoubleClick={enterEditMode}
        onMouseDown={handleMouseDown}
        ref={divEl}
      >
        {currentValue}
      </ShortTextBlock>
    );
  }

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = ev;
    const newValue = target!.value;
    if (newValue.length <= 80) {
      setCurrentValue(newValue);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEditMode(false);
  };

  return (
    <ShortTextForm
      scale={scale}
      width={editModeWidth}
      top={coordinates.top}
      left={coordinates.left}
      onSubmit={handleSubmit}
    >
      <input value={currentValue} onChange={handleChange} ref={inputEl} />
    </ShortTextForm>
  );
};

export default TextLine;

const ShortTextBlock = styled.div`
  padding: 2px 4px;
  background-color: white;
  top: ${(props: { top: number; left: number; scale: number }) =>
    props.top * props.scale}px;
  left: ${(props) => props.left * props.scale}px;
  position: absolute;
  min-width: 20px;
  height: 1.2em;
  cursor: default;
  border: 1px solid white;
  font-size: 14px;
  transform-origin: 0 0;
  scale: ${(props) => props.scale};

  :hover {
    border-color: var(--main);
  }
`;

const ShortTextForm = styled.form`
  position: absolute;
  top: ${(props) => props.top * props.scale}px;
  left: ${(props) => props.left * props.scale}px;
  min-width: 20px;
  width: ${(props: {
    width: number;
    top: number;
    left: number;
    scale: number;
  }) => props.width}px;
  height: 1.2em;
  transform-origin: 0 0;
  scale: ${(props) => props.scale};

  input {
    padding: 2px;
    width: ${(props: { width: number }) => props.width}px;
    font-size: 14px;
    height: 1.2em;
    border: 1px solid var(--main);
  }
`;
