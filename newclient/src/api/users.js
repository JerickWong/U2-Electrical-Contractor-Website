import axios from 'axios'

const user = axios.create({
    baseURL: 'http://localhost:3000/user'
})

export const login = payload => user.post(`/login-user`, payload)
export const logout = () => user.get(`/logout-user`)
export const getUser = () => user.get(`/current-user`)
export const register = payload => user.post(`/register-user`, payload)
export const getJWT = () => user.get(`/get-jwt`)

const users = {
    login,
    logout,
    getUser,
    register,
    getJWT
}

export default users