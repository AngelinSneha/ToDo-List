import axios from "axios";

export const list = async (authtoken) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API}/api/todo`, {
            headers: {
                Authorization:authtoken
            }
        })
        return res
    } catch {
        return console.log('Cannot get the list');
    }
}
export const addToList = async(authtoken, title, body) => {
    const res = await axios.post(`${process.env.REACT_APP_API}/api/todo`, {title, body}, {
        headers: {
            Authorization:authtoken
        }
    })
    return res
}
export const deleteList = async(authtoken, id) => {
    const res = await axios.post(`${process.env.REACT_APP_API}/api/tododel`, {id}, {
        headers: {
            Authorization:authtoken
        }
    })
    return res
}
export const updatedone = async(authtoken, id) => {
    const res = await axios.post(`${process.env.REACT_APP_API}/api/todoupdate`, {id}, {
        headers: {
            Authorization:authtoken
        }
    })
    return res
}
export const updateundone = async(authtoken, id) => {
    const res = await axios.post(`${process.env.REACT_APP_API}/api/todoundoupdate`, {id}, {
        headers: {
            Authorization:authtoken
        }
    })
    return res
}