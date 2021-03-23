/* eslint-disable no-self-assign */
import React from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import Styled from './StyledToolbar.d';
import Brush from './Tools/Brush';
import Rectangle from './Tools/Rectangle';
import Circle from './Tools/Circle';
import Line from './Tools/Line';
import Eraser from './Tools/Eraser';
import ClearAll from './Tools/ClearAll';
import allActions from '@store/actions';
import brush from '../../../assets/brush.svg';
import circle from '../../../assets/circle.svg';
import rectangle from '../../../assets/rectangle.svg';
import line from '../../../assets/line.svg';
import { requestImage, saveImage } from '@firebaseConfig/firebaseDBQueries';

const Toolbar = () => {
  const dispatch = useDispatch();
  const canvasRef = useSelector((state: RootStateOrAny) => state.currentCanvas);
  const user = useSelector((state: RootStateOrAny) => state.currentAuth);

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
    const { uid } = user.user;
    console.log(user);

    saveImage(canvasRef.current, uid);
  };

  const handleRequestImage = () => {
    if (!canvasRef) {
      return;
    }
    requestImage();
  };

  return (
    <Styled.Container>
      <Styled.Form>
        <Styled.FormElement>
          <label>Fill Color</label>
          <input
            type="color"
            onChange={event => changeFillColor(event)}
            title={'Fill Color'}
          />
        </Styled.FormElement>
        <Styled.FormElement>
          <label>Stroke Color</label>
          <input
            type="color"
            onChange={event => changeStrokeColor(event)}
            title={'Stroke Color'}
          />
        </Styled.FormElement>
        <Styled.FormElement>
          <label>Line Width</label>
          <br />
          <input
            type="number"
            min={1}
            max={30}
            defaultValue={1}
            title={'Толщина линии'}
            onChange={event => lineWidth(event)}
          />
        </Styled.FormElement>
        <div>
          <button onClick={setLine}>
            <img src={line} />
          </button>
          <button onClick={setBrush}>
            <img src={brush} />
          </button>
          <button onClick={setRect}>
            <img src={rectangle} />
          </button>
          <button onClick={setCircle}>
            <img src={circle} />
          </button>
          <button onClick={undo}>Undo</button>
          <button onClick={redo}>Redo</button>
          <button onClick={setEraser}>Eraser</button>
          <button onClick={clearAll}>Clear canvas</button>
          <button onClick={handleSaveImage}>Save image</button>
          <button onClick={handleRequestImage}>Request image</button>
        </div>
      </Styled.Form>
    </Styled.Container>
  );
};

export default Toolbar;
