import React from 'react';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

function Nav({handleLogout}) {
    return (
        <div className="bclr p-4 pl-5">
            <form onSubmit={handleLogout} className="float-right" >
            <button onClick={handleLogout} className="bclr point logoutbtn"><ExitToAppIcon fontSize="small" /> <span className="h5">Logout</span></button>
            </form>
            <span className="h3">📝ToDo List</span>
        </div>
    )
}

export default Nav
