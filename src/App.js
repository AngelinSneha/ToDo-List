import React,{lazy, Suspense, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {useDispatch} from "react-redux";

const Login =  lazy(() => import("./components/Login"));
const Register =  lazy(() => import("./components/Register"));
const Home =  lazy(() => import("./components/Home"));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = () => {
      if(localStorage.getItem('email') && localStorage.getItem('token')) {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');
        console.log('email in app', email)
        dispatch({
          type:'LOGGED_IN_USER',
          payload: {
              email:email,
              token:token
          }
        })
      }
    }
    return () => unsubscribe();
  }, [dispatch])
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
