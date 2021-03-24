import React, { useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import Styled from './StyledToolbar.d';
import Tools from './Tools/index';
import allActions from '@store/actions';
import Icons from '@assets/index';
import { saveImage } from '@firebaseConfig/firebaseDBQueries';
import toast from 'react-hot-toast';

const Toolbar = () => {
  const dispatch = useDispatch();
  const canvasRef = useSelector((state: RootStateOrAny) => state.currentCanvas);
  const user = useSelector((state: RootStateOrAny) => state.currentAuth);

  const setBrush = () => {
    if (canvasRef) {
      dispatch(
        allActions.toolsActions.setTool(new Tools[0](canvasRef.current)),
      );
    }
  };

  const setRect = () => {
    if (canvasRef) {
      dispatch(
        allActions.toolsActions.setTool(new Tools[1](canvasRef.current)),
      );
    }
  };

  const setCircle = () => {
    if (canvasRef) {
      dispatch(
        allActions.toolsActions.setTool(new Tools[2](canvasRef.current)),
      );
    }
  };

  const setLine = () => {
    if (canvasRef) {
      dispatch(
        allActions.toolsActions.setTool(new Tools[3](canvasRef.current)),
      );
    }
  };

  const setEraser = () => {
    if (canvasRef) {
      dispatch(
        allActions.toolsActions.setTool(new Tools[4](canvasRef.current)),
      );
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
        allActions.toolsActions.setTool(new Tools[5](canvasRef.current)),
      );
      toast.success('Clear All');
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
    saveImage(canvasRef.current, uid);
    toast.success('Image saved');
  };

  useEffect(() => {
    setBrush();
  }, []);

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
          <label>Stroke Color</label>
          <input
            type="color"
            onChange={event => changeStrokeColor(event)}
            title={'Stroke Color'}
          />
          <label>Line Width</label>
          <input
            type="range"
            min={1}
            max={15}
            defaultValue={1}
            step={1}
            title={'Толщина линии'}
            onChange={event => lineWidth(event)}
          />
        </Styled.FormElement>
        <Styled.Buttons>
          <Styled.Button onClick={setLine}>
            <img src={Icons[3]} />
          </Styled.Button>
          <Styled.Button onClick={setBrush}>
            <img src={Icons[0]} />
          </Styled.Button>
          <Styled.Button onClick={setRect}>
            <img src={Icons[2]} />
          </Styled.Button>
          <Styled.Button onClick={setCircle}>
            <img src={Icons[1]} />
          </Styled.Button>
          <Styled.Button onClick={setEraser}>
            <img src={Icons[6]} />
          </Styled.Button>
          <Styled.Button onClick={undo}>
            <img src={Icons[7]} />
          </Styled.Button>
          <Styled.Button onClick={redo}>
            <img src={Icons[8]} />
          </Styled.Button>
          <Styled.Button onClick={clearAll}>
            <img src={Icons[5]} />
          </Styled.Button>
          <Styled.Button onClick={handleSaveImage}>
            <img src={Icons[4]} />
          </Styled.Button>
        </Styled.Buttons>
      </Styled.Form>
    </Styled.Container>
  );
};

export default Toolbar;
