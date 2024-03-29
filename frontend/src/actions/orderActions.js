import axios from "axios"
import { buyOrderListFail, buyOrderListRequest, buyOrderListSuccess, confirmedOrderListFail, confirmedOrderListRequest, confirmedOrderListSuccess, orderDetailFail, orderDetailRequest, orderDetailSuccess, sellerOrderListFail, sellerOrderListRequest, sellerOrderListSuccess, updateOrderFail, updateOrderRequest, updateOrderSuccess } from "../reducers/orderReducers"

const baseURL = process.env.REACT_APP_BASE_API_URL || 'http://127.0.0.1:8000';

const createAPIinstance = () => {

    return axios.create({
        baseURL: `${baseURL}/api/users/orders`,
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    })
}


export const buyList = () => async (dispatch) => {

    try {
        dispatch(buyOrderListRequest())

        const api = createAPIinstance()
        const { data } = await api.get('/buying/')

        dispatch(buyOrderListSuccess(data))
    } catch (error) {
        dispatch(buyOrderListFail(
            error.response && error.response.data.detail ?
            error.response.data.detail :
            error.message
        ))
    }

}


export const updateOrder = (orderID, updatedData) => async (dispatch) => {
    try {
        dispatch(updateOrderRequest())

        const api = createAPIinstance()

        const { data } = await api.put(`/${orderID}`, updatedData)

        dispatch(updateOrderSuccess(data))
    } catch (error) {
        dispatch(updateOrderFail(
            error.message && error.response.data.detail ?
            error.response.data.detail :
            error.message
        ))
    }
}


export const confirmedList = (status=undefined, keyword=undefined) => async (dispatch) => {

    try {
        dispatch(confirmedOrderListRequest())

        const api = createAPIinstance()
        const { data } = await api.get('/buyer/', {
            params: {
                'isDelivered': status,
                'search': keyword
            }
        })

        dispatch(confirmedOrderListSuccess(data))
    } catch (error) {
        dispatch(confirmedOrderListFail(
            error.response && error.response.data.detail ?
            error.response.data.detail :
            error.message
        ))
    }

}


export const orderDetail = (id) => async (dispatch) => {

    try {
        dispatch(orderDetailRequest())

        const api = createAPIinstance()
        const { data } = await api.get(`/${id}`)

        dispatch(orderDetailSuccess(data))
    } catch (error) {
        dispatch(orderDetailFail(
            error.response && error.response.data.detail ?
            error.response.data.detail :
            error.message
        ))
    }

}


export const sellList = (deliverStatus=undefined, keyword=undefined, shippingStatus=undefined) => async (dispatch) => {

    try {
        dispatch(sellerOrderListRequest())

        const api = createAPIinstance()
        const { data } = await api.get('/seller/', {
            params: {
                'isDelivered': deliverStatus,
                'search': keyword,
                'inShipping': shippingStatus,
            }
        })

        dispatch(sellerOrderListSuccess(data))
    } catch (error) {
        dispatch(sellerOrderListFail(
            error.response && error.response.data.detail ?
            error.response.data.detail :
            error.message
        ))
    }

}
