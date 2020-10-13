import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const insertMTS = payload => api.post(`/MTS`, payload)
export const getAllMTS = () => api.get(`/All-MTS`)
export const updateMTSById = (id, payload) => api.put(`/MTS/${id}`, payload)
export const deleteMTSById = id => api.delete(`/MTS/${id}`)
export const getMTSById = id => api.get(`/MTS/${id}`)
export const getMTSByProject = payload => api.post(`/MTS/project`, payload)
export const getMTSProjects = () => api.get(`/project-names`)
export const getDelivered = payload => api.post(`/delivered`, payload)

const apis = {
    insertMTS,
    getAllMTS,
    updateMTSById,
    deleteMTSById,
    getMTSById,
    getMTSByProject,
    getMTSProjects,
    getDelivered
}

export default apis