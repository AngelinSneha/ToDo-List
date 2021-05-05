import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {logout} from "../functions/auth";
import {toast} from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom";

function Home({history}) {
    const [value, setvalue] = useState('');
    const {user} = useSelector((state) => ({...state}))
    const dispatch = useDispatch();
    const email  = localStorage.getItem("email");
    const token  = localStorage.getItem("token");
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('value', value)
        console.log("handleSubmit clicked!")
    }
    const handleChange = (e) => {
        e.preventDefault();
        console.log('value', value)
        console.log("handleChange clicked!")
    }

    const handleLogout = async (e) => {
        e.preventDefault();
        console.log("handleLogout clicked!")
        if(!user) {
            history.push('/');
        } else {
            await logout(user.token)
        .then(res => {
            console.log(res);
            if(res.data) {
                localStorage.removeItem("email");
                localStorage.removeItem("token");
                dispatch({
                    type:"LOGOUT",
                    payload:null
                })
                toast.success('Logged out successfully')
                history.push('/');
            }
        })
        .catch(err => {
            toast.error('An error occured', err)
            console.log(err)
        })
        }
    }

    return (
        <div>
            {token?(<><div className="bclr p-4 pl-5">
            <form onSubmit={handleLogout} className="float-right" >
            <button onClick={handleLogout} className="bclr point logoutbtn"><ExitToAppIcon fontSize="small" /> <span className="h6">Logout</span></button>
            </form>
            <span className="h4">ToDo List</span>
            </div>
            <div className="container bb mt-5">
                <div className="box text-center">
                {value? 
                (<div className="chbox">
                    <FormControlLabel
                        control={<Checkbox onChange={handleChange} name="checkedA" />}
                        label={value}
                    />
                </div> ):""}
                <form onSubmit={handleSubmit} className="mt-4">
                    <TextField id="standard-basic" label="Add a Task" value={value} onChange={(e) => setvalue(e.target.value)} /><AddCircleIcon className="clr mt-2 point" fontSize="large" onClick={handleSubmit} />
                </form>
                </div>
            </div></>):<h1 className="text-center mt-5">You do not have access to this page! <Link to="/">Login to access this page</Link></h1>}
        </div>
    )
}

export default Home
