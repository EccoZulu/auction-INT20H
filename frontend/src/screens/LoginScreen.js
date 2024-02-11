import React, { useEffect } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import Login from '../components/Login/Login';



function LoginScreen() {

    const location = useLocation()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const navigate = useNavigate()

    const {
        userReducers: { loading, error, user }
    } = useSelector((state) => state)

    useEffect(() => {
        if(user){
            navigate('/')
        }
    })


  return (
    <>
        {loading ? <Loader />:
        <FormContainer>
            <Col className='h1'>Увійти</Col>

            {error && <Message variant='danger'>{error}</Message>}
                
                <Login />

                <Row className='py-3'>
                    <Col>
                        <span className='text-muted'>Не маєте аккаунту ? </span> &nbsp;
                        <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className='link text-decoration-none fw-semibold'>
                            Зареєструватися
                        </Link>
                    </Col>
                </Row>

                
                
                <Outlet />
            </FormContainer>
            
        }
    </>
  )
}

export default LoginScreen
