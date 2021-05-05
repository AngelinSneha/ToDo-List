import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {logout} from "../functions/auth";
import {list} from "../functions/todo";
import {toast} from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom";

function Home({history}) {
    const [value, setvalue] = useState('');
    const [todos, settodos] = useState([]);
    const {user} = useSelector((state) => ({...state}))
    const dispatch = useDispatch();
    const email  = localStorage.getItem("email");
    const token  = localStorage.getItem("token");
    useEffect(() => {
        const val = async () => {
            await list(token)
            .then(res => {
                console.log('list',res.data)
                const vall = res.data;
                console.log('val',vall)
                const arr = [];
                vall.map(v => {
                    console.log(v)
                    arr.push(v.title)
                })
                console.log('arr',arr)
                // if(arr) {
                //     settodos([...arr])
                // }
                console.log('todos',todos)
            })
            .catch(err => {
                console.log('list err',err)
            })
        }
        val()
    }, [todos])
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
            <span className="h4">📝ToDo List</span>
            </div>
            <div className="container bb mt-5">
                <div className="box text-center">
                {/* {list? 
                (list.map((l) => <div className="chbox">
                    <FormControlLabel
                        control={<Checkbox onChange={handleChange} name="checkedA" />}
                        label={l.title}
                    />
                </div>) ):""} */}
                <h5 className="bclr p-3">Add a new Note</h5>
                <form onSubmit={handleSubmit} className="mt-4">
                    <TextField variant="outlined" label="Add a Title" className="m-2 wdt" value={value} onChange={(e) => setvalue(e.target.value)} />
                    <br />
                    {/* <TextField variant="outlined" label="Add a Body" value={value} onChange={(e) => setvalue(e.target.value)} /> */}
                    <TextField
                    className="m-2 wdt"
                    id="outlined-multiline-static"
                    label="Write a Comment"
                    multiline
                    rows={4}
                    // defaultValue="Default Value"
                    variant="outlined"
                    />
                    <br />
                    <Button
                        variant="contained"
                        className="float-right m-2 clr"
                        size="large"
                        style={{"backgroundColor":"#810000", 'color':"#fff"}}
                        endIcon={<AddCircleIcon className="bclr">Add</AddCircleIcon>}
                    >
                        Add
                    </Button>
                </form>
                </div>
            </div></>):<h1 className="text-center mt-5">You do not have access to this page! <Link to="/">Login to access this page</Link></h1>}
        </div>
    )
}

export default Home
