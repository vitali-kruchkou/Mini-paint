import React, { useEffect, useRef } from 'react';
import './Canvas.css';
import Brush from 'modules/Tools/Brush';
import Rectangle from 'modules/Tools/Rectangle';
import Circle from 'modules/Tools/Circle';
import Line from 'modules/Tools/Line';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import allActions from '../../store/actions/index';
import Toolbar from './Toolbar/Toolbar';
interface CanvasProps {
  width: number;
  height: number;
}

const Canvas = ({ width, height }: CanvasProps) => {
  const dispatch = useDispatch();
  const canvasRef = useSelector((state: RootStateOrAny) => state.currentCanvas);
  // console.log(canvasRef);
  useEffect(() => {
    dispatch(allActions.canvasActions.setRef(canvasRef.current));
    // toolState.setTool(new Brush(canvas));
  }, []);

  // const setBrush = () => {
  //   if (canvasRefer) {
  //     dispatch(allActions.toolsActions.setTool(new Brush(canvasRef.current)));
  //   }
  // };

  // const setRect = () => {
  //   if (canvasRefer) {
  //     dispatch(
  //       allActions.toolsActions.setTool(new Rectangle(canvasRef.current)),
  //     );
  //   }
  // };

  // const setCircle = () => {
  //   if (canvasRefer) {
  //     dispatch(allActions.toolsActions.setTool(new Circle(canvasRef.current)));
  //   }
  // };

  // const setLine = () => {
  //   if (canvasRefer) {
  //     dispatch(allActions.toolsActions.setTool(new Line(canvasRef.current)));
  //   }
  // };

  // const undo = () => {
  //   if (canvasRefer) {
  //     dispatch(allActions.canvasActions.undo());
  //   }
  //   console.log(dispatch(allActions.canvasActions.undo()));
  // };

  // const redo = () => {
  //   if (canvasRefer) {
  //     dispatch(allActions.canvasActions.redo());
  //   }
  // };

  const handleMouseDown = () => {
    if (canvasRef.current?.toDataURL) {
      dispatch(
        allActions.canvasActions.pushToRedo(canvasRef.current.toDataURL()),
      );
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
        onMouseDown={handleMouseDown}
        // onMouseUp={handleMouseUp}
        // onMouseOut={handleMouseUp}
        // onMouseMove={handleMouseMove}
        ref={canvasRef}
        height={height}
        width={width}
        className="canvas"
      />
      <div>
        {/* <button onClick={setLine}>Line</button>
        <button onClick={setBrush}>Brush</button>
        <button onClick={setRect}>Rectangle</button>
        <button onClick={setCircle}>Circle</button>
        <button onClick={undo}>Undo</button>
        <button onClick={redo}>Redo</button> */}
      </div>
      <Toolbar />
    </div>
  );
};

Canvas.defaultProps = {
  width: 800,
  height: 600,
};

export default Canvas;
