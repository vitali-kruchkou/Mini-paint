import React, { useEffect, useState } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { requestImage } from '@firebaseConfig/firebaseDBQueries';
import iconSignOut from '@assets/log-out.svg';
import Style from './StyledGallery.d';
import { Button } from 'antd';

const Gallery = () => {
  const user = useSelector((state: RootStateOrAny) => state.currentAuth);
  const history = useHistory();
  const [pictures, setPictures] = useState([]);
  const { uid } = user.user;

  useEffect(() => {
    const getAsyncPics = async () => {
      await requestImage(setPictures, uid);
    };

    getAsyncPics();
  }, []);

  const goBackHandler = () => {
    history.push('/');
  };

  return (
    <>
      <Button onClick={goBackHandler} type="primary">
        <img src={iconSignOut} /> Paint
      </Button>
      {pictures.length > 0 ? (
        <Style.Container>
          <div>
            {pictures.map((picture, i) => {
              return <Style.Img src={picture} alt="" key={i} />;
            })}
          </div>
        </Style.Container>
      ) : (
        <Style.Text>
          <h2>Task list is empty</h2>
        </Style.Text>
      )}
    </>
  );
};
export default Gallery;
