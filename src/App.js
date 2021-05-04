import React,{lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Login =  lazy(() => import("./components/Login"));
const Register =  lazy(() => import("./components/Register"));
const Home =  lazy(() => import("./components/Home"));

function App() {
  return (
    <Suspense fallback={
      <div className="cssload-container text-center">
        <div className="cssload-whirlpool"></div>
      </div>
    }>
    <ToastContainer />
      <Switch>
      <Route exact path="/home" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/" component={Login} />
      </Switch>
    </Suspense>
  );
}

export default App;
