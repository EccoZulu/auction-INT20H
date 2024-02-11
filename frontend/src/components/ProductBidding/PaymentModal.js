import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Modal, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listCards } from '../../actions/cardActions'
import CreateCCModal from '../Profile/CreditCard/CreateCCModal'
import CreditCard from '../Profile/CreditCard/CreditCard'
import { toast } from 'react-toastify';
import { bidPlaceReset } from '../../reducers/bidReducers'
import { placeBid } from '../../actions/bidActions'
import Message from '../Message'

function PaymentModal({show, onHide, bidInstance}) {

    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(listCards())
    }, [dispatch])

    const [showCreateModal, setShowCreateModal] = useState(false)

    const createModalShow = () => setShowCreateModal(true)
    const createModalClose = () => setShowCreateModal(false)

    const [selectedCard, setSelectedCard] = useState(null)

    const {
        cardReducers : { cards, loading, error, success },
        bidReducers: { bidPlaceLoading, bidPlaceError, bidPlaceSuccess, bid }
    } = useSelector((state) => state)

    useEffect(() => {
        if (bidPlaceLoading) {
            
        }
        
        if (!bidPlaceLoading) {
            if (bidPlaceSuccess){
                toast.dismiss()
                let success = async () => {
                    dispatch(bidPlaceReset())
                    await onHide()
                    toast.success(`Ви поставли ₴${bid.bid} на цю позицію.`, {
                        position: "top-right",
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

            if (bidPlaceError) {
                toast.dismiss()
                toast.error(bidPlaceError, {
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
    }, [bidPlaceLoading, bidPlaceSuccess, dispatch, bidPlaceError, bid, onHide])

    const submitHandler = (e) => {
        e.preventDefault()
        if (selectedCard){
            dispatch(placeBid(bidInstance))
        }else{
            toast.error('You must select a card.', {
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

    return (
        bid &&
        <Modal show={show}>
            <Modal.Header className='border-0' closeButton onHide={onHide} />
            <Col className='fs-4 fw-bold text-center'>Метод оплати</Col>
            <Row className='justify-content-center mt-2'>
                <Col className='border-bottom pb-2 col-10'/>
            </Row>
            {bid && bid.previous_bid ?
            <Row className='mx-4 my-3'>
                <Row>
                    <Col className='col-10'>
                        Ваша минула ставка
                    </Col>
                    <Col className='col-2 fw-bold'>
                        ${bid.previous_bid}
                    </Col>
                </Row>
                            
            </Row>
            :
            <Row className='mx-4 my-3'>
                <Row>
                    <Col className='col-10'>
                    Ваша теперішня ставка:
                    </Col>
                    <Col className='col-2 fw-bold'>
                        ${bid.additional_payment}
                    </Col>
                </Row>
            </Row>
            }
            <Row className='justify-content-center'>
                <Col className='border-bottom pb-2 col-10'/>
            </Row>
            {error ?
            <Row className='mx-4 my-3'>
                <Message variant={'danger'}>{error}</Message>
            </Row>
            :
            <Row>
                {cards.length > 0 ?
                <>
                    <Row className='mx-4 my-3'>
                        <Col className='fw-semibold text-center text-md-start'>
                            Виберіть спосіб оплати
                        </Col>
                    </Row>
                    <Form onSubmit={submitHandler}>
                        <Row className='justify-content-center justify-content-md-between mx-3'>
                            {cards.map(card => (
                                <Col md="5" className='col-10 border rounded mb-4 mx-3'>
                                    <CreditCard card={card} loading={loading} success={success} />
                                    <Row className='justify-content-center'>
                                    <Button className='mb-2 btn-dark col-6' onClick={() => setSelectedCard(card._id)}>
                                        {selectedCard && card._id === selectedCard ?
                                            'Selected'
                                        :
                                            'Select'    
                                        }
                                    </Button>
                                    </Row>
                                </Col>
                            ))}
                        </Row>
                        <Row className='mx-4 justify-content-center mb-3'>
                            <Button type='submit' className='col-4 col-md-6 btn btn-dark text-center'>
                                Підтвердити
                            </Button>
                        </Row>
                    </Form>
                    <Row className='justify-content-center'>
                        <Col className='col-10 border-bottom pb-2'/>
                    </Row>
                    
                   
                </>
                :
                <Row className='mx-4 my-3'>
                    
                </Row>
                }
                <Row className='mx-3 justify-content-center justify-content-md-start'>
                    <Col md='6' onClick={createModalShow} className='border rounded mb-4 mx-3 col-10' style={{cursor: 'pointer'}}>
                        <Card className='border-0 my-2 d-flex'>
                            <Col className='text-center fw-semibold my-3'>
                                <i className="fa-solid fa-plus" /> Додати нову картку
                            </Col>
                        </Card>
                    </Col>
                    <CreateCCModal 
                        show={showCreateModal}
                        onHide={createModalClose}
                        dispatch={dispatch}
                        loading={loading}
                    />
                </Row>
            </Row>
            }
        </Modal>
    )
}

export default PaymentModal
