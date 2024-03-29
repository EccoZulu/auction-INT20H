import React, {useState, useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Form, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { login } from "../../actions/userActions";
import { userLoginReset } from '../../reducers/userReducers';

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const location = useLocation()
    const navigate = useNavigate()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const dispatch = useDispatch()

    const {
        userReducers: { userInfo }
    } = useSelector((state) => state)

    useEffect(() => {
        if(userInfo){
            navigate(redirect)
            dispatch(userLoginReset())
        }
    },[navigate, userInfo, redirect, dispatch])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }
    return (
        <>
            <Form onSubmit={submitHandler}>
                <FormGroup controlId='email'>
                    <FormLabel className='my-2 fw-semibold'>Електронна адреса</FormLabel>
                    <FormControl
                        type='email'
                        placeholder='Введіть електронну пошту'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        >
                    </FormControl>
                </FormGroup>

                <FormGroup controlId='password'>
                    <FormLabel className='my-2 fw-semibold'>Пароль</FormLabel>
                    <FormControl
                        type='password'
                        placeholder='Введіть пароль'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        >
                    </FormControl>
                </FormGroup>

                <Button type='submit' variant='dark' className='mt-3'>
                    Увійти
                </Button>
            </Form>
        </>
    )
}

export default Login
