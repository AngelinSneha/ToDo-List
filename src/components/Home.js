import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import {logout} from "../functions/auth";
import {list} from "../functions/todo";
import {toast} from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom";
import Nav from './Nav';
import Accordation from './Accordation';

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
                // console.log('list',res.data)
                const vall = res.data;
                console.log('val',vall)
                console.log(typeof vall)
                const arr = [];
                vall.map(v => {
                    arr.push({id:v.id, user_id:v.user_id, title:v.title, body:v.body, is_completed:v.is_completed})
                })
                console.log('arr',arr)
                if(arr) {
                    settodos([...arr])
                }
                console.log('todos',todos)
            })
            .catch(err => {
                console.log('list err',err)
            })
        }
        val()
    }, [value])
    useEffect(() => {
        console.log('again huh')
    }, [todos])
    console.log('todos 2',todos)

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('value', value)
        console.log("handleSubmit clicked!")
    }

    const handleLogout = async (e) => {
        e.preventDefault();
        console.log("handleLogout clicked!")
        await logout(token)
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

    return (
        <div>
            {token?(<>
            <Nav handleLogout={handleLogout} />
            <div className="m-5">
                <div className="row">
                    <div className="col-md-5">
                        <div className="box text-center">
                        <h5 className="bclr p-3">Add a new Note</h5>
                        <form onSubmit={handleSubmit} className="mt-4">
                            <TextField variant="outlined" label="Add a Title" className="m-2 wdt" value={value} onChange={(e) => setvalue(e.target.value)} />
                            <br />
                            <TextField
                            className="m-2 wdt"
                            id="outlined-multiline-static"
                            label="Write a Comment"
                            multiline
                            rows={4}
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
                    </div>
                    <div className="col-md-7">
                    <h3 className="clr mb-4">Your Dashboard</h3>
                        <Accordation todos={todos} />
                    </div>
                </div>
            </div></>):<h1 className="text-center mt-5 clr">You do not have access to this page! <Link to="/">Login to access this page</Link></h1>}
        </div>
    )
}

export default Home
