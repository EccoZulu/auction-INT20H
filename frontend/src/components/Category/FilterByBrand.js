import React, { useContext, useEffect } from 'react'
import { Col, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listBrands} from '../../actions/productActions'
import FilterContext from '../../contexts/FilterContext'

function FilterByBrand() {

    const dispatch = useDispatch()

    const {
        brandReducers: { brands }
    } = useSelector((state) => state)

    const { selectedBrands, setSelectedBrands } = useContext(FilterContext);

    useEffect(() => {
        dispatch(listBrands())
    },[dispatch])

    const handleBrandSelect = (e) => {
        const brandId = e.target.id;
        if (e.target.checked) {
            setSelectedBrands([...selectedBrands, brandId]);
        } else {
            setSelectedBrands(selectedBrands.filter((id) => id !== brandId));
        }
    };

  return (
    <>
    <Col className="text-center border-top border-bottom py-2 fw-bold">
        Фільтрувати за брендом
    </Col>
    <Col className='ms-xl-3 mt-2'>
        <Form>
        {brands.map((brand) => (
            <Col key={brand._id} style={{fontSize:'smaller'}}>
                <Form.Check
                    type='checkbox'
                    id={brand._id.toString()}
                    label={brand.name}
                    name={brand.name}
                    checked={selectedBrands.includes(brand._id.toString())}
                    onChange={handleBrandSelect}
                />
            </Col>
        ))}
        </Form>
    </Col>
    </>
  )
}

export default FilterByBrand
