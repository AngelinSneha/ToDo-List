import React, {useState, useEffect} from 'react';
import {logout} from "../functions/auth";
import {list} from "../functions/todo";
import {toast} from 'react-toastify';
import { useDispatch } from "react-redux";
import {Link} from "react-router-dom";
import Nav from './home/Nav';
import Accordation from './home/Accordation';
import NewNote from './home/NewNote';
import {addToList, deleteList} from "../functions/todo";

function Home({history}) {
    const [todos, settodos] = useState([]);
    const [value, setvalue] = useState('')
    const [multilineValue, setmultilineValue] = useState('');
    const dispatch = useDispatch();
    const token  = localStorage.getItem("token");

    //to submit a new note
    const handleSubmit = async (e) => {
        e.preventDefault();
        await addToList(token, value, multilineValue)
        .then(res => {
            toast.success("New note added!");
            setvalue('');
            setmultilineValue('');
        })
        .catch(err => {
            toast.error("Could not create a new note.")
        })
    }

    //deleting a note
    const handleDelete = async (id) => {
        await deleteList(token, id)
        .then(res => {
            toast.success("Task deleted")
        })
        .catch(err => {
            toast.error(err)
        })
      }

    useEffect(() => {
        const val = async () => {
            await list(token)
            .then(res => {
                const vall = res.data;
                const arr = [];
                vall.map(v => {
                    arr.push({id:v.id, user_id:v.user_id, title:v.title, body:v.body, is_completed:v.is_completed})
                })
                if(arr) {
                    settodos([...arr])
                }
            })
            .catch(err => {
                console.log('list err',err)
            })
        }
        val()
    }, [handleSubmit])
    useEffect(() => {
        console.log('todo list', todos)
    }, [todos])

    //logout user
    const handleLogout = async (e) => {
        e.preventDefault();
        await logout(token)
        .then(res => {
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
            toast.error('An error occured')
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
                        <NewNote handleSubmit={handleSubmit} value={value} setvalue={setvalue} multilineValue={multilineValue} setmultilineValue={setmultilineValue} />
                        </div>
                    </div>
                    <div className="col-md-7">
                    <h3 className="clr mb-4 mt-2">Your Dashboard</h3><i className="clr mb-3">Your ToDo List is displayed here!</i>
                        <Accordation todos={todos} handleDelete={handleDelete} />
                    </div>
                </div>
            </div></>):<h3 className="text-center mt-5 clr">You do not have access to this page! <Link to="/">Login to access this page</Link></h3>}
        </div>
    )
}

export default Home
