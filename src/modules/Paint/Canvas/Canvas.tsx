import React, { useEffect } from 'react';
import './Canvas.css';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import Toolbar from '../Toolbar/Toolbar';
import allActions from '@store/actions';
import Style from './StyledCanvas.d';
import handleResize from './resizeCanvas';
import { useHistory } from 'react-router';

const Canvas = () => {
  const dispatch = useDispatch();
  const canvasRef = useSelector((state: RootStateOrAny) => state.currentCanvas);
  const history = useHistory();
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

  const signOut = () => {
    dispatch(allActions.authActions.signout());
  };

  useEffect(() => {
    handleResize(canvasRef);
  }, []);

  const galleryLinkHandler = () => {
    history.push('/gallery');
  };

  return (
    <>
      <button onClick={signOut}>Sign out</button>
      <Style.Container>
        <canvas
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
          ref={canvasRef}
          className="canvas"
        />
        <Toolbar />
        <button onClick={galleryLinkHandler}>Gallery</button>
      </Style.Container>
    </>
  );
};

export default Canvas;
