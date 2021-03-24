import React, { useEffect, useState } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { requestImage } from '@firebaseConfig/firebaseDBQueries';

const Gallery = () => {
  const user = useSelector((state: RootStateOrAny) => state.currentAuth);
  const history = useHistory();
  const [pictures, setPictures] = useState([]);
  const { uid } = user.user;
  console.log(user);
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
      {pictures.length > 0 ? (
        <div className="picture-list-wrapper">
          <div className="picture-list" id="gallery">
            {pictures.map((picture, i) => {
              return <img src={picture} alt="" key={i} />;
            })}
          </div>
        </div>
      ) : (
        <div className="empty-list">
          <h2>Task list is empty</h2>
        </div>
      )}

      <button onClick={goBackHandler}>Paint</button>
    </>
  );
};
export default Gallery;
