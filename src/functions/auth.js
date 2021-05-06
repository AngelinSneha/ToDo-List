import axios from "axios";

export const reg = async(email, password, password_confirmation) => {
    const res = await axios.post(`${process.env.REACT_APP_API}/api/register`, {email, password, password_confirmation})
    return res
}
export const loginFc = async(email, password) => {
    const res = await axios.post(`${process.env.REACT_APP_API}/api/login`, {email, password})
    return res
}
export const logout = async(authtoken) => {
    const res = await axios.post(`${process.env.REACT_APP_API}/api/logout`, {}, {
        headers: {
            Authorization:authtoken
        }
    })
    return res
}
export const user = async(authtoken, email) => {
    const res = await axios.post(`${process.env.REACT_APP_API}/api/user`, {email}, {
        headers: {
            Authorization:authtoken
        }
    })
    return res
}
