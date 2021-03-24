import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Canvas from './Canvas/Canvas';
import Gallery from './Gallery/Gallery';

const Paint = () => {
  return (
    <>
      <Switch>
        <Route path="/canvas">
          <Canvas />
        </Route>
        <Route path="/gallery">
          <Gallery />
        </Route>
        <Route path="/">
          <Redirect to="/canvas" />
        </Route>
      </Switch>
      {/* <Toolbar /> */}
    </>
  );
};

export default Paint;
