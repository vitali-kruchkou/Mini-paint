import { firestore, storageRef } from '.';

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const saveImage = (canvas, uid) => {
  if (
    typeof canvas.toBlob !== 'undefined' ||
    typeof canvas.msToBlob !== 'undefined'
  ) {
    let uuid = uuidv4();
    canvas.toBlob(function (blob) {
      let image = new Image();
      image.src = blob;
      let metadata = {
        contentType: 'image/png',
      };
      storageRef
        .child('images/' + uid + '/' + uuid)
        .put(blob, metadata)
        .then(function (snapshot) {
          console.log('Uploaded', snapshot.totalBytes, 'bytes.');
        })
        .catch(function (error) {
          console.error('Upload failed:', error);
        });
    });
  }
};

export const requestImage = async (setPictures, uid, setPicDates) => {
  storageRef
    .child('images/' + uid + '/')
    .listAll()
    .then(async result => {
      let picArr = [];
      await Promise.all(
        result.items.map(async imageRef => {
          await imageRef.getDownloadURL().then(url => {
            picArr.push(url);
          });
        }),
      );
      await setPictures([...picArr]);
      storageRef.child('images/' + uid + '/');
    });
  firestore
    .collection('pictures')
    .where('userId', '==', uid)
    .onSnapshot(async snapshot => {
      await setPicDates(
        snapshot.docs.map(doc => {
          return {
            picId: doc.data().picId,
            date: doc.data().date,
          };
        }),
      );
    });
  return () => {
    requestImage(setPictures, uid, setPicDates);
  };
};
