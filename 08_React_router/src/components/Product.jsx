

import React from 'react'
import { useParams } from 'react-router-dom'

const Product = () => {

    const { id } = useParams()

    return (
        <h1>Product - {id}</h1>
    )
}

export default Product