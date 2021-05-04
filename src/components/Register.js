import React, {useState, useEffect} from 'react'
import TextField from '@material-ui/core/TextField';
import {Link} from "react-router-dom";
import {reg} from "../functions/auth" ;
import {toast} from 'react-toastify';

function Register({history}) {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [password_confirmation, setconfirmPassword] = useState('');
    // useEffect(() => {
    //     console.log('email', email, 'password', password, 'confirmPassword', password_confirmation)
    // }, [email, password, password_confirmation]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await reg(email, password, password_confirmation)
            console.log("res", res.data);
            toast.success("Registered Successfully!")
            history.push("/home");
        } catch(err) {
            toast.error('Invalid Credentials')
            history.push("/register");
        }
    }
    return (
        <div className="container text-center pt-5">
            <h1 className="mt-5 clr">Join Us!</h1>
            <form onSubmit={handleSubmit} >
                    <TextField type="email" className="formval mt-5" id="outlined-basic" label="Email" variant="outlined" value={email} onChange={(e) => setemail(e.target.value)}  />
                    <br />
                    <TextField type="password" className="formval mt-4" id="outlined-basic" label="Password" variant="outlined" value={password} onChange={(e) => setpassword(e.target.value)} />
                    <br />
                    <TextField type="password" className="formval mt-4" id="outlined-basic" label="Confirm Password" variant="outlined" value={password_confirmation} onChange={(e) => setconfirmPassword(e.target.value)} />
                    <br />
                    <button className="btn btn-raised bclr mt-4 formval" onClick={handleSubmit}>Register</button>
            </form>
            <Link className="clr" to="/"><i>Already have an account? Login</i></Link>
        </div>
    )
}

export default Register
