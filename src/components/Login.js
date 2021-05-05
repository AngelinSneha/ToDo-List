import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import {Link} from "react-router-dom"
import {loginFc} from "../functions/auth";
import {toast} from 'react-toastify';
import {useDispatch} from "react-redux";

function Login({history}) {
    const dispatch = useDispatch();
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    // useEffect(() => {
    //     console.log('email', email, 'password', password, 'confirmPassword')
    // }, [email, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log('i am clicked')
        const val = await loginFc(email, password)
        .then(res => {
            console.log("res",res.data.type);
            localStorage.setItem('email', email);
            localStorage.setItem('token', res.data.type+" "+res.data.token);
            dispatch({
                type:'LOGGED_IN_USER',
                payload: {
                    email:email,
                    token:res.data.type+" "+res.data.token
                }
            })
            toast.success("Logged in Successfully!")
            history.push("/home")
        })
        .catch(err => {
            toast.error('Invalid Credentials')
            console.log(err);
            history.push("/");
        })
    }

    return (
        <div className="container text-center pt-3 mt-5">
            <h1 className="mt-5 clr">Your Personalized Todo List!</h1>
            <i>Login to use our features</i>
            <form onSubmit={handleSubmit} >
                    <TextField type="email" className="formval mt-5" label="Email" variant="outlined" value={email} onChange={(e) => setemail(e.target.value)}  />
                    <br />
                    <TextField type="password" className="formval mt-4" label="Password" variant="outlined" value={password} onChange={(e) => setpassword(e.target.value)}  />
                    <br />
                    <button className="btn btn-raised bclr mt-4 formval" onSubmit={handleSubmit}>Login</button>
            </form>
            <Link className="clr" to="/register"><i>Do not have an account? Register</i></Link>
        </div>
    )
}

export default Login


