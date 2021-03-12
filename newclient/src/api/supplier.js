import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/supplier'
})

export const insertSupplier = payload => api.post(`/Supplier`, payload)
export const getAllSupplier = () => api.get(`/All-Supplier`)
export const updateSupplierById = (id, payload) => api.put(`/Supplier/${id}`, payload)
export const deleteSupplierById = id => api.delete(`/Supplier/${id}`)
export const getSupplierById = id => api.get(`/Supplier/${id}`)

const suppliers = {
    insertSupplier,
    getAllSupplier,
    updateSupplierById,
    deleteSupplierById,
    getSupplierById,
}

export default suppliers