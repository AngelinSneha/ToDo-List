import axios from "axios";

// const server =http://127.0.0.1:3333;
export const reg = async(email, password, password_confirmation) => {
    console.log('ressss')
    const res = await axios.post(`${process.env.REACT_APP_API}/api/register`, {email, password, password_confirmation})
    // console.log('ressss', res)
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
