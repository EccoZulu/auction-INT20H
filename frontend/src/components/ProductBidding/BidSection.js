import React, { useEffect, useState } from 'react'
import { Row, Col, ListGroup, Button, Card, InputGroup, Form } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Countdown from './Countdown'
import { toast } from 'react-toastify';
import { calculateBidPaid } from '../../actions/bidActions';
import { bidPaidReset } from '../../reducers/bidReducers';
import { Link } from 'react-router-dom'
import PaymentModal from './PaymentModal'
import BidListModal from './BidListModal';

function BidSection({dispatch, productID}) {

    const {
        productReducers : { product },
        bidReducers: { bidPaidError, bidPaidLoading, bidPaidSuccess, bid, bids },
        userReducers: { user }
    } = useSelector((state) => state)

    const [highestBid, setHighestBid] = useState('')
    const [bidCount, setBidCount] = useState('')
    const [closeTime, setCloseTime] = useState('')
    const [startTime, setStartTime] = useState('')
    const [bidInstance, setBidInstance] = useState('')

    const [isStarted, setIsStarted] = useState(false)

    useEffect(() => {
        if(product){

            const currentDate = new Date()
            const startDate = new Date(product.startDate)
            const hasStarted = currentDate > startDate

            setIsStarted(hasStarted)

            setHighestBid(product.currentHighestBid)
            setBidCount(product.totalBids)
            setCloseTime(product.endDate)
            setStartTime(product.startDate)
        }
    },[product])

    const [countdownFinished, setCountdownFinished] = useState(false);

    const handleCountdownUpdate = (countdown) => {
        const isFinished = countdown.days === 0 && countdown.hours === 0 && countdown.minutes === 0 && countdown.seconds === 0;
        setCountdownFinished(isFinished);
    }

    const [offer, setOffer] = useState('')

    const [showModal, setShowModal] = useState(false)

    const modalShow = () => setShowModal(true)
    const modalClose = () => setShowModal(false)

    const submitHandler = async (e) => {
        e.preventDefault()

        let newBid = {
            'product': productID,
            'bid': offer,
        }

        await dispatch(calculateBidPaid(newBid))

        setBidInstance(newBid)
    }

    useEffect(() => {
        if (bidPaidLoading) {
           
        }
        
        if (!bidPaidLoading) {
            if (bidPaidSuccess){
                toast.dismiss()
                let success = async () => {
                    await dispatch(bidPaidReset())
                    modalShow()
                    
                    toast.success(`Your bid payment calculated for this product.`, {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "dark",
                    })
                }
                success();
            }

            if (bidPaidError) {
                toast.dismiss()
                toast.error(bidPaidError, {
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
    }, [bidPaidLoading, bidPaidSuccess, dispatch, productID, bidPaidError, bid])
    const baseURL = 'ws://127.0.0.1:8000';
    useEffect(() => {
        const socket = new WebSocket(`${baseURL}/ws/auctions/${productID}/`)

        socket.onmessage = (e) => {
            const wsData = JSON.parse(e.data)
            const wsDataMessage = JSON.parse(wsData.message)
            if (wsDataMessage) {
            setHighestBid(wsDataMessage.amount)
            setBidCount(wsDataMessage.bid_count)
            console.log(wsDataMessage.closes_in)
            if(wsDataMessage.closes_in) {
                setCloseTime(wsDataMessage.closes_in)
            }
            }
        }

        return() => {
            socket.close()
        }
    }, [productID])

    const [showBidList, setShowBidList] = useState(false)
    const bidListShow = () => setShowBidList(true)
    const bidListClose = () => setShowBidList(false)

    const listHandler = (e) => {
        e.preventDefault()

        bidListShow()
    }

    return (
        product &&
        <>
            {closeTime &&
            <Col md={6} xl={3} className='mt-md-5 mt-lg-0'>
                <Card className='shadow border-0'>
                    <ListGroup>
                        <ListGroup.Item>
                            <Row className='d-flex'>
                            <Col md={7}>
                                {
                                !countdownFinished ?
                                    isStarted ? 'Найвища ставка: '
                                    : 'Стартова ціна: '
                                : 'Продано: '                      
                                }
                            </Col>
                            <Col md={5} className='h4 justify-content-end d-flex'>
                                <strong>₴{isStarted ? highestBid : product.price}</strong>
                            </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row className={countdownFinished ? 'justify-content-center' : ''}>
                            {!countdownFinished ?
                            <Col md={4}>
                                {isStarted ? 'Закінчиться через:' : 'Почнеться в:'}
                            </Col>:
                            ''
                            }
                            <Col md={!countdownFinished ? 8 : ''} className={!countdownFinished ? 'justify-content-end d-flex' : 'h5 text-center mt-2'}>
                                <Row>
                                <Countdown endDate={new Date(isStarted ? closeTime : startTime)} onCountdownUpdate={handleCountdownUpdate} />
                                </Row>
                            </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                            <Col md={8}>
                                Ставки:
                            </Col>
                            <Col md={4} className='justify-content-end d-flex'>
                                <strong>{bidCount}</strong>&nbsp;
                                <span
                                    onClick={bids && bids.length > 0 ? listHandler : undefined}
                                    style={{cursor: bids && bids.length > 0 ? 'pointer' : 'default'}}
                                    className={bids && bids.length > 0 ? '' : 'opacity-50'}
                                >
                                    [показати]
                                </span>
                            </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row className='justify-content-center'>
                            {user ?
                                product.user === user._id && isStarted ?
                                <Col md={12} className='d-flex justify-content-center'>
                                    <Button disabled className="w-100 btn btn-danger my-2">
                                        Це ваша позиція
                                    </Button>
                                </Col>
                                :
                                (!countdownFinished ?
                                    isStarted ?
                                    <Col md={12}>
                                        <Form onSubmit={submitHandler}>
                                            <InputGroup className='mb-1'>
                                                <InputGroup.Text style={{cursor:'default'}}>₴</InputGroup.Text>
                                                <Form.Control
                                                    required
                                                    type="number"
                                                    placeholder='Введіть суму'
                                                    value={offer}
                                                    min={1}
                                                    maxLength={8}
                                                    onChange={(e) => setOffer(e.target.value)}
                                                    onKeyDown={(e) => {
                                                        if(e.key === ',' | e.key === '.'){
                                                            e.preventDefault()
                                                        }
                                                    }}
                                                    onPaste={(e) => {
                                                        const paste = e.clipboardData.getData('text')
                                                        if (!(paste === '' || /^[0-9\b]+$/.test(paste))){
                                                            e.preventDefault()
                                                        }
                                                    }}
                                                />
                                            </InputGroup>
                                            <Col md={12} className='d-flex justify-content-center'>
                                                <Button type='submit' className="w-100 rounded my-2 btn-dark">Поставити ставку</Button>
                                            </Col>
                                        </Form>
                                    </Col>
                                    :
                                    <Col md={12} className='d-flex justify-content-center'>
                                        <Link to="/" className="w-100 btn btn-danger my-2 rounded">
                                            Аукціон ще не розпочався.
                                        </Link>
                                    </Col>
                                : 
                                <Col md={12} className='d-flex justify-content-center'>
                                    <Link to="/" className="w-100 btn btn-dark my-2 rounded">
                                    Повернутися
                                    </Link>
                                </Col>
                                )
                            :
                            <Col md={12} className='d-flex justify-content-center'>
                                <Link to="/login" className="w-100 btn btn-danger my-2">
                                Ви повинні бути зареєстровані
                                </Link>
                            </Col>
                            }
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
                <PaymentModal bidInstance={bidInstance} show={showModal} onHide={modalClose} />
                <BidListModal show={showBidList} onHide={bidListClose} />
            </Col>
            }
        </>
    )
}

export default BidSection
