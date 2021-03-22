/* eslint-disable no-self-assign */
import React from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

import Brush from './Tools/Brush';
import Rectangle from './Tools/Rectangle';
import Circle from './Tools/Circle';
import Line from './Tools/Line';
import Eraser from './Tools/Eraser';
import ClearAll from './Tools/ClearAll';
import allActions from '@store/actions';
import { saveImage, requestImage } from '@firebaseConfig/index';

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

  const setEraser = () => {
    if (canvasRef) {
      dispatch(allActions.toolsActions.setTool(new Eraser(canvasRef.current)));
    }
  };

  const lineWidth = (event: any) => {
    if (canvasRef) {
      dispatch(allActions.toolsActions.setLineWidth(event.target.value));
    }
  };

  const clearAll = () => {
    if (canvasRef) {
      dispatch(
        allActions.toolsActions.setTool(new ClearAll(canvasRef.current)),
      );
    }
  };

  const changeStrokeColor = (event: any) => {
    if (canvasRef) {
      dispatch(allActions.toolsActions.setStrokeColor(event.target.value));
    }
  };

  const changeFillColor = (event: any) => {
    if (canvasRef) {
      dispatch(allActions.toolsActions.setFillColor(event.target.value));
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

  const handleSaveImage = () => {
    if (!canvasRef) {
      return;
    }
    saveImage('name_1', canvasRef.current);
  };

  const handleRequestImage = () => {
    if (!canvasRef) {
      return;
    }
    requestImage();
  };

  return (
    <div className="App">
      <input type="color" onChange={event => changeFillColor(event)} />
      <p>changeFillColor</p>
      <input type="color" onChange={event => changeStrokeColor(event)} />
      <p>changeStrokeColor</p>
      <input
        type="number"
        min={1}
        max={30}
        defaultValue={1}
        title={'Толщина линии'}
        onChange={event => lineWidth(event)}
      />
      <p>lineWidth</p>
      <div>
        <button onClick={setLine}>Line</button>
        <button onClick={setBrush}>Brush</button>
        <button onClick={setRect}>Rectangle</button>
        <button onClick={setCircle}>Circle</button>
        <button onClick={undo}>Undo</button>
        <button onClick={redo}>Redo</button>
        <button onClick={setEraser}>Eraser</button>
        <button onClick={clearAll}>Clear canvas</button>
        <button onClick={handleSaveImage}>Save image</button>
        <button onClick={handleRequestImage}>Request image</button>
      </div>
    </div>
  );
};

export default Toolbar;
