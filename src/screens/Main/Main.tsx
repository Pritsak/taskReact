import React from 'react'
import Product from '../../components/product'

function Main() {
  return (
    <div>
        <Product 
            imgUrl='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToClfT6HEKSdhoWkfqiICQ8f1OiNL7J-C1XfhTjm37FAOCi8OmPXQwh1nMR8Z778VtWQI&usqp=CAU'
            name="Iphone 12 pro max" 
            count={20} 
            size={{width: 10, height: 20}} 
            weight="200g"/>
    </div>
  )
}

export default Main