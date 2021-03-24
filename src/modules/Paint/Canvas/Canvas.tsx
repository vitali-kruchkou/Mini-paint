import React, { useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import Toolbar from '../Toolbar/Toolbar';
import allActions from '@store/actions';
import Style from './StyledCanvas.d';
import handleResize from './resizeCanvas';
import { useHistory } from 'react-router';
import iconSignOut from '@assets/log-out.svg';
import iconGallery from '@assets/gallery.svg';
import Styled from './StyledCanvas.d';

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
      <Styled.Buttons>
        <button onClick={signOut}>
          <img src={iconSignOut} />
          Sign out
        </button>
        <button onClick={galleryLinkHandler}>
          <img src={iconGallery} />
          Gallery
        </button>
      </Styled.Buttons>
      <Style.Container>
        <canvas
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
          ref={canvasRef}
        />
        <Toolbar />
      </Style.Container>
    </>
  );
};

export default Canvas;
