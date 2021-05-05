import axios from "axios";

export const list = async (authtoken) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API}/api/todo`, {
            headers: {
                Authorization:authtoken
            }
        })
        console.log('todo get',res);
        return res
    } catch {
        return console.log('Cannot get the list');
    }
}