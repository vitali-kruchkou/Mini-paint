import React, { useEffect } from 'react';
import './Canvas.css';
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

  useEffect(() => {
    dispatch(allActions.canvasActions.setRef(canvasRef.current));
  }, []);

  const handleMouseDown = () => {
    if (canvasRef.current?.toDataURL) {
      dispatch(
        allActions.canvasActions.pushToRedo(canvasRef.current.toDataURL()),
      );
    }
  };

  return (
    <div className="App">
      <canvas
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        ref={canvasRef}
        height={height}
        width={width}
        className="canvas"
      />
      <Toolbar />
    </div>
  );
};

Canvas.defaultProps = {
  width: 800,
  height: 600,
};

export default Canvas;
