import React, { useEffect, useState } from 'react'
import { Form, FormGroup, FormLabel, FormControl, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { register } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { userRegisterReset } from '../reducers/userReducers'


function RegisterScreen() {
  
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [message, setMessage] = useState('')

  const location = useLocation()

  const redirect = location.search ? location.search.split('=')[1] : '/'

  const {
    userReducers: { userRegisterLoading, userRegisterError, userRegisterSuccess, user }
  } = useSelector((state) => state)

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    
    if(password !== passwordConfirm){
      setMessage('Password does not match!')
    }else if (password === ''){
      setMessage('You must enter a password!')
    }else{
      dispatch(register(name,email,password))
    }
  }

  useEffect(() => {
      if (userRegisterLoading) {
          toast.info("Response is pending...", {
              position: "top-right",
              autoClose: false,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: false,
              draggable: false,
              theme: "dark",
          })
      }
      
      if (!userRegisterLoading) {
          if (userRegisterSuccess){
              toast.dismiss()
              let success = async () => {
                  dispatch(userRegisterReset())
                  toast.success(`Dear ${name}, please go to you email: ${email} inbox and click on received activation link to confirm and complete the registration. Note: Check your spam folder.`, {
                      position: "top-center",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      theme: "dark",
                  })
              }
              success();
          }

          if (userRegisterError) {
              toast.dismiss()
              toast.error(userRegisterError, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  theme: "dark",
              })
          }
      }
  }, [userRegisterLoading, userRegisterSuccess, dispatch, userRegisterError, name, email])

  const navigate = useNavigate()

  useEffect(() => {
    if(user){
      navigate('/')
    }
  }, [navigate, user])

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <FormContainer>
        <h1>Зареєструватися</h1>

        {message && <Message variant='danger'>{message}</Message>}
        {userRegisterLoading && <Loader />}
        <Form onSubmit={submitHandler}>
          <FormGroup controlId='name'>
            <FormLabel className='my-2 fw-semibold'>Імя</FormLabel>
            <FormControl
                required
                type='name'
                placeholder='Введіть своє імя'
                value={name}
                onChange={(e) => setName(e.target.value)}
                >
            </FormControl>
          </FormGroup>

          <FormGroup controlId='email'>
            <FormLabel className='my-2 fw-semibold'>Електронна адреса</FormLabel>
            <FormControl
                required
                type='email'
                placeholder='Введіть електронну адресу'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                >
            </FormControl>
          </FormGroup>

          <FormGroup controlId='password'>
            <FormLabel className='my-2 fw-semibold'>Пароль</FormLabel>
            <FormControl
                required
                type='password'
                placeholder='Введіть пароль'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                >
            </FormControl>
          </FormGroup>

          <FormGroup controlId='passwordConfirm'>
            <FormLabel className='my-2 fw-semibold'>Підтвердіть пароль</FormLabel>
            <FormControl
                required
                type='password'
                placeholder='Підтвердіть пароль'
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                >
            </FormControl>
          </FormGroup>

          <Button type='submit' variant='dark' className='my-2'>
            Зареєструватися            
          </Button>
        </Form>

        <Row className='py-3'>
            <Col>
              Маєте аккаунт ? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className='link fw-semibold'>
                    Увійти
                </Link>
            </Col>
        </Row>

      </FormContainer>
    </>
  )
}

export default RegisterScreen
