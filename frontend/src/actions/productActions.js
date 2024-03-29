import axios from 'axios'
import qs from 'qs'
import { 
    productListRequest,
    productListSuccess,
    productListFail,

    productDetailsRequest,
    productDetailsSuccess,
    productDetailsFail,

    productPublishRequest,
    productPublishSuccess,
    productPublishFail,

    brandListRequest,
    brandListSuccess,
    brandListFail,
} from '../reducers/productReducers'
const baseURL = process.env.REACT_APP_BASE_API_URL || 'http://127.0.0.1:8000';
const createAPIinstance = () => {

    return axios.create({
        baseURL: `${baseURL}/api/products`,
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    })

}

 export const listProducts = ({keyword= undefined, category= undefined, brands= undefined, userID= undefined, status='all', ordering = 'endDate'}) => async (dispatch) => {
    try {
        dispatch(productListRequest());

        let params = {};

        if (keyword) {
            params.search = keyword;
        }
        if (category) {
            params.category = category;
        }
        if (brands) {
            params.brand = brands;
        }
        if (userID) {
            params.user = userID;
        }
        if (status) {
            params.productStatus = status;
        }
        if (ordering) {
            params.ordering = ordering;
        }
        
        const api = createAPIinstance()
        const { data } = await api.get(`/?${qs.stringify(params, { arrayFormat: 'repeat' })}`);

        dispatch(productListSuccess(data));
    } catch (error) {
        dispatch(productListFail(
            error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        ));
    }
};

export const detailProducts = (id) => async (dispatch) => {
    try{
        dispatch(productDetailsRequest())

        const api = createAPIinstance()
        const { data } = await api.get(`/${id}`)

        dispatch(productDetailsSuccess(data))
    }catch(error){
        dispatch(productDetailsFail(error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        ));
    }
}

export const publishProduct = (product) => async (dispatch) => {
    try{
        dispatch(productPublishRequest())

        const api = createAPIinstance()
        const { data } = await api.post('/', product,{
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        })

        dispatch(productPublishSuccess(data))
    }catch(error){
        dispatch(productPublishFail(
            error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        ))
    }
}

export const listBrands = () => async (dispatch) => {
    try{
        dispatch(brandListRequest())

        const { data } = await axios.get(`${baseURL}/api/products/brands/`)

        dispatch(brandListSuccess(data))
    }catch(error){
        dispatch(brandListFail(error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
                )
            );
        }
    }
