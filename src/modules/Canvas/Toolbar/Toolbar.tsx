import React, { useEffect, useRef } from 'react';

import Brush from 'modules/Tools/Brush';
import Rectangle from 'modules/Tools/Rectangle';
import Circle from 'modules/Tools/Circle';
import Line from 'modules/Tools/Line';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import allActions from '../../../store/actions/index';

const Toolbar = () => {
  const dispatch = useDispatch();
  const canvasRef = useSelector((state: RootStateOrAny) => state.currentCanvas);

  const setBrush = () => {
    if (canvasRef) {
      dispatch(allActions.toolsActions.setTool(new Brush(canvasRef.current)));
    }
  };

  const setRect = () => {
    if (canvasRef) {
      dispatch(
        allActions.toolsActions.setTool(new Rectangle(canvasRef.current)),
      );
    }
  };

  const setCircle = () => {
    if (canvasRef) {
      dispatch(allActions.toolsActions.setTool(new Circle(canvasRef.current)));
    }
  };

  const setLine = () => {
    if (canvasRef) {
      dispatch(allActions.toolsActions.setTool(new Line(canvasRef.current)));
    }
  };

  const undo = () => {
    if (canvasRef) {
      dispatch(allActions.canvasActions.undo());
    }
  };

  const redo = () => {
    if (canvasRef) {
      dispatch(allActions.canvasActions.redo());
    }
  };

  return (
    <div className="App">
      {/* <input
        type="color"
        value={color}
        onChange={e => setColor(e.target.value)}
      />
      <input
        type="color"
        value={bcolor}
        onChange={e => setBColor(e.target.value)}
      />
      */}
      {/* <input
        type="number"
        min="1"
        max="20"
        defaultValue="1"
        onChange={e => toolState.setLineWidth(Number(e.target.value))}
      /> */}
      <div>
        <button onClick={setLine}>Line</button>
        <button onClick={setBrush}>Brush</button>
        <button onClick={setRect}>Rectangle</button>
        <button onClick={setCircle}>Circle</button>
        <button onClick={undo}>Undo</button>
        <button onClick={redo}>Redo</button>
      </div>
    </div>
  );
};

export default Toolbar;
