import axios from "axios"
import {
    addressListRequest,
    addressListSuccess,
    addressListFail,

    addressUpdateRequest,
    addressUpdateSuccess,
    addressUpdateFail,

    addressCreateRequest,
    addressCreateSuccess,
    addressCreateFail,
    
    addressDeleteRequest,
    addressDeleteSuccess,
    addressDeleteFail,
    addressDetailRequest,
    addressDetailSuccess,
    addressDetailFail,
} from '../reducers/addressReducers'
const baseURL = process.env.REACT_APP_BASE_API_URL || 'http://127.0.0.1:8000';
const createAPIinstance = () => {

    return axios.create({
        baseURL: `${baseURL}/api/users/addresses`,
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    })

}

export const listAddresses = () => async (dispatch) => {
    try{
        dispatch(addressListRequest())

        const api = createAPIinstance()
        const { data } = await api.get('/');

        dispatch(addressListSuccess(data))
    }catch(error){
        dispatch(addressListFail(
            error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        ))
    }
}


export const createAddress = (address) => async (dispatch) => {
    try{
        dispatch(addressCreateRequest())

        const api = createAPIinstance()
        const { data } = await api.post(
            '/',
            address
        );

        dispatch(addressCreateSuccess(data))
    }catch(error){
        dispatch(addressCreateFail(error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
                )
        );
    }
}

export const updateAddress = (address) => async (dispatch) => {
    try{
        dispatch(addressUpdateRequest())

        const api = createAPIinstance()
        const { data } = await api.put(
            `/${address._id}/`,
            address
        );

        await dispatch(addressUpdateSuccess(data))
        dispatch(listAddresses())
    }catch(error){
        dispatch(addressUpdateFail(error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
                )
        );
    }
}

export const deleteAddress = (id) => async (dispatch) => {
    try{
        dispatch(addressDeleteRequest())

        const api = createAPIinstance()
        const { data } = await api.delete(`/${id}/`);

        await dispatch(addressDeleteSuccess(data))
        dispatch(listAddresses())
    }catch(error){
        dispatch(addressDeleteFail(error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
                )
        );
    }
}


export const addressDetail = (id) => async (dispatch) => {
    try {
        dispatch(addressDetailRequest())

        const api = createAPIinstance()
        const { data } = await api.get(`/${id}`)
        
        dispatch(addressDetailSuccess(data))
    } catch (error) {
        dispatch(addressDetailFail(error.response && error.response.data.detail ?
            error.response.data.detail :
            error.message
        ))
    }
}
