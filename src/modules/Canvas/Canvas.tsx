/* eslint-disable @typescript-eslint/no-extra-non-null-assertion */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import './Canvas.css';

interface CanvasProps {
  width: number;
  height: number;
}

interface Coordinate {
  x: number;
  y: number;
}

function Canvas({ width, height }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(
    undefined,
  );
  const [isPainting, setIsPainting] = useState(false);

  const [color, setColor] = useState<string>();
  const [bwidth, setBwidth] = useState<string>();

  const getCoordinates = (event: MouseEvent): Coordinate | undefined => {
    if (!canvasRef.current) {
      return;
    }

    const canvas: HTMLCanvasElement = canvasRef.current;
    return {
      x: event.pageX - canvas.offsetLeft,
      y: event.pageY - canvas.offsetTop,
    };
  };

  const drawLine = (
    originalMousePosition: Coordinate,
    newMousePosition: Coordinate,
  ) => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext('2d');

    if (context) {
      context.strokeStyle = `${color}`;
      context.lineJoin = 'round';
      context.lineWidth = Number(bwidth);

      context.beginPath();
      context.moveTo(originalMousePosition.x, originalMousePosition.y);
      context.lineTo(newMousePosition.x, newMousePosition.y);
      context.closePath();

      context.stroke();
    }
  };

  const startPaint = useCallback((event: MouseEvent) => {
    const coordinates = getCoordinates(event);
    if (coordinates) {
      setIsPainting(true);
      setMousePosition(coordinates);
    }
  }, []);

  const paint = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();

      if (isPainting) {
        const newMousePosition = getCoordinates(event);
        if (mousePosition && newMousePosition) {
          drawLine(mousePosition, newMousePosition);
          setMousePosition(newMousePosition);
        }
      }
    },
    [isPainting, mousePosition],
  );

  const exitPaint = useCallback(() => {
    setIsPainting(false);
  }, []);

  //Mobile
  const touch = useCallback((event: TouchEvent) => {
    event.preventDefault();
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    const touch = event.touches[0];
    const mouseEvent = new MouseEvent('mousemove', {
      clientX: touch.clientX,
      clientY: touch.clientY,
    });
    canvas.dispatchEvent(mouseEvent);
  }, []);

  const startTouch = useCallback((event: TouchEvent) => {
    event.preventDefault();
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    const touch = event.touches[0];
    const mouseEvent = new MouseEvent('mousedown', {
      clientX: touch.clientX,
      clientY: touch.clientY,
    });
    canvas.dispatchEvent(mouseEvent);
  }, []);

  const exitTouch = useCallback((event: TouchEvent) => {
    event.preventDefault();

    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    const mouseEvent = new MouseEvent('mouseup', {});
    canvas.dispatchEvent(mouseEvent);
  }, []);

  const clearCanvas = () => {
    if (!canvasRef.current) {
      return;
    }

    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.getContext('2d')!!.clearRect(0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;

    canvas.addEventListener('mousedown', startPaint);
    canvas.addEventListener('mousemove', paint);
    canvas.addEventListener('mouseup', exitPaint);
    canvas.addEventListener('mouseleave', exitPaint);

    canvas.addEventListener('touchstart', startTouch);
    canvas.addEventListener('touchmove', touch);
    canvas.addEventListener('touchend', exitTouch);

    return () => {
      /** useEffect clean */
      canvas.removeEventListener('mousedown', startPaint);
      canvas.removeEventListener('mousemove', paint);
      canvas.removeEventListener('mouseup', exitPaint);
      canvas.removeEventListener('mouseleave', exitPaint);

      canvas.removeEventListener('touchstart', startTouch);
      canvas.removeEventListener('touchmove', touch);
      canvas.removeEventListener('touchend', exitTouch);
    };
  }, [startPaint, paint, exitPaint]);

  return (
    <div className="App">
      <input
        type="color"
        value={color}
        onChange={e => setColor(e.target.value)}
      />
      <input
        type="number"
        min="1"
        max="20"
        value={bwidth}
        onChange={e => setBwidth(e.target.value)}
      />
      <canvas
        ref={canvasRef}
        height={height}
        width={width}
        className="canvas"
      />
      <button onClick={clearCanvas}>Clear</button>
    </div>
  );
}

Canvas.defaultProps = {
  width: 800,
  height: 600,
};

export default Canvas;
