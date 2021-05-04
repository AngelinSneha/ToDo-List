import React,{lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import './App.css';

const Nav =  lazy(() => import("./components/Nav"));
const Home =  lazy(() => import("./components/Home"));

function App() {
  return (
    <Suspense fallback={
      <div class="cssload-container text-center">
        <div class="cssload-whirlpool"></div>
      </div>
    }>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </Suspense>
  );
}

export default App;
