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
export const getDelivered = payload => api.post(`/delivered-objects`, payload)
export const getCost = payload => api.post(`/cost`, payload)
export const getMonthlyCost = payload => api.post(`/monthly-cost`, payload)
export const getDeliveredSummary = payload => api.post(`/delivered-summary`, payload)
export const getDates = payload => api.post(`/project-dates`, payload)

export const insertDelivered = payload => api.post(`/Delivered`, payload)
export const getAllDelivered = () => api.get(`/All-Delivered`)
export const updateDelivered = payload => api.put(`/Delivered/`, payload)
export const deleteDeliveredById = id => api.delete(`/Delivered/${id}`)
export const getDeliveredById = id => api.get(`/Delivered/${id}`)
export const getDeliveredByProject = payload => api.post(`/Delivered/project`, payload)
export const addEstQty = payload => api.post(`/add-est-qty`, payload)

const apis = {
    insertMTS,
    getAllMTS,
    updateMTSById,
    deleteMTSById,
    getMTSById,
    getMTSByProject,
    getMTSProjects,
    getDelivered,
    getCost,
    getMonthlyCost,
    getDeliveredSummary,
    getDates,
    insertDelivered,
    getAllDelivered,
    updateDelivered,
    deleteDeliveredById,
    getDeliveredById,
    getDeliveredByProject,
    addEstQty
}

export default apis