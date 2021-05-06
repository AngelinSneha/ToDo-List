import React from 'react'
import TextField from '@material-ui/core/TextField';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button';

function NewNote({value, setvalue, multilineValue, setmultilineValue, handleSubmit}) {
    return (
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
                value={multilineValue}
                onChange={(e) => setmultilineValue(e.target.value)}
            />
            <br />
            <Button
                variant="contained" onClick={handleSubmit} className="float-right m-2 clr" size="large" style={{"backgroundColor":"#810000", 'color':"#fff"}} endIcon={<AddCircleIcon className="bclr">Add</AddCircleIcon>}
            >
                Add
            </Button>
        </form>
    )
}

export default NewNote
