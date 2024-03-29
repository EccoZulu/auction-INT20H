import React from 'react';
import { Button, Card, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function ProfileDetails({ user, updateModalShow }) {

    const {
        productReducers: {products},
        orderReducers: {sellerOrders}
    } = useSelector((state) => state)

    return (
        products && sellerOrders &&
        <Card className='border-0 shadow fs-6 text-center text-lg-start mx-3 mx-md-0'>
            <Card.Header className='text-center fw-bold p-3 h4'>Профіль</Card.Header>
            <Card.Body>
                <Row className='mt-2'>
                    <Col lg={4} className='d-flex justify-content-center align-items-center'>
                        <i className="fa-solid fa-user"></i>
                    </Col>
                    <Col lg={8} className='text-muted'>
                        {user.name}
                    </Col>
                </Row>   
                
                <Col className='d-flex justify-content-center'>
                    <hr className='divider'/>
                </Col>
                
                <Row>
                    <Col lg={4} className='d-flex justify-content-center align-items-center'>
                        <i className="fa-sharp fa-solid fa-envelope" />
                    </Col>
                    <Col lg={7} className='text-muted'>
                        {user.email}
                    </Col>
                </Row>

                <Col className='d-flex justify-content-center'>
                    <hr className='divider'/>
                </Col>


              

               
                <Row>
                    <Col lg={4} className='d-flex justify-content-center align-items-center'>
                        <i className="fa-solid fa-hand-sparkles" />
                    </Col>
                    <Col lg={8}>
                        <Link to={'./'} className='text-muted text-decoration-none'>Мої ставки</Link>
                    </Col>
                </Row>

                <Col className='d-flex justify-content-center'>
                    <hr className='divider'/>
                </Col>



                {products.length > 0 ?
                <>
                    
                    <Row className={`${sellerOrders.length > 0 ? 'mb-3' : ''}`}>
                        <Col lg={4} className='d-flex justify-content-center align-items-center'>
                            <i className="fa-solid fa-badge-dollar"></i>
                        </Col>
                        <Col lg={8}>
                            <Link to={'./selling'} className='text-muted text-decoration-none'>Мої позиції</Link>
                        </Col>
                    </Row>
                </> :
                null
                }

                {sellerOrders.length > 0 ?
                <>
                    <Col className='d-flex justify-content-center'>
                        <hr className='divider'/>
                    </Col>

                    <Row className='mb-3'>
                        <Col lg={4} className='d-flex justify-content-center align-items-center'>
                            <i className="fa-solid fa-badge-dollar"></i>
                        </Col>
                        <Col lg={8}>
                            <Link to={'./orders/selling'} className='text-muted text-decoration-none'>My Sellings</Link>
                        </Col>
                    </Row>
                </> :
                null
                }

                <Row>
                    <Col>
                        
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default ProfileDetails
