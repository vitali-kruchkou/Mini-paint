import React, { useEffect, useRef } from 'react';
import './Canvas.css';
import Brush from 'modules/Tools/Brush';
import Rectangle from 'modules/Tools/Rectangle';
import Circle from 'modules/Tools/Circle';
import Line from 'modules/Tools/Line';
import { useDispatch, useSelector } from 'react-redux';
import allActions from '../../store/actions/index';

interface CanvasProps {
  width: number;
  height: number;
}

const Canvas = ({ width, height }: CanvasProps) => {
  const canvasRefer = useRef<HTMLCanvasElement | null>(null);
  const canvas: HTMLCanvasElement = canvasRefer.current;
  const dispatch = useDispatch();
  const canvasRef = useSelector(store => store.canvasState);
  console.log(canvasRef);

  useEffect(() => {
    dispatch(allActions.canvasActions.setRef(canvas));
    // toolState.setTool(new Brush(canvas));
  }, []);

  const setBrush = () => {
    if (canvasRefer) {
      dispatch(allActions.toolsActions.setTool(new Brush(canvasRef)));
    }
  };

  const setRect = () => {
    if (canvasRefer) {
      dispatch(allActions.toolsActions.setTool(new Rectangle(canvasRef)));
    }
  };

  const setCircle = () => {
    if (canvasRefer) {
      dispatch(allActions.toolsActions.setTool(new Circle(canvasRef)));
    }
  };

  const setLine = () => {
    if (canvasRefer) {
      dispatch(allActions.toolsActions.setTool(new Line(canvasRef)));
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
      <canvas
        // onMouseDown={handleMouseDown}
        // onMouseUp={handleMouseUp}
        // onMouseOut={handleMouseUp}
        // onMouseMove={handleMouseMove}
        ref={canvasRef}
        height={height}
        width={width}
        className="canvas"
      />
      <div>
        <button onClick={setLine}>Line</button>
        <button onClick={setBrush}>Brush</button>
        <button onClick={setRect}>Rectangle</button>
        <button onClick={setCircle}>Circle</button>
      </div>
    </div>
  );
};

Canvas.defaultProps = {
  width: 800,
  height: 600,
};

export default Canvas;
