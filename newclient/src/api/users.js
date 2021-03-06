import axios from 'axios'

const user = axios.create({
    baseURL: 'http://localhost:3000/user'
})

export const login = payload => user.post(`/login-user`, payload)
export const logout = () => user.get(`/logout-user`)
export const getUser = payload => user.post(`/current-user`, payload)
export const getAllUsers = () => user.get(`/all-users`)
export const register = payload => user.post(`/register-user`, payload)
export const updateUser = (id, payload) => user.put(`/update-user/${id}`, payload)
export const deleteUser = id => user.delete(`/${id}`)

const users = {
    login,
    logout,
    getUser,
    getAllUsers,
    register,
    updateUser,
    deleteUser
}

export default users