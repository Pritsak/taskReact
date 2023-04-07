import React from 'react'
import styles from "./styles.module.scss"

interface Props {
    imgUrl: string;
    name: string;
    count: number;
    size: {
        width: number,
        height: number,
    },
    weight: string
}

function Product(props: Props) {
  return (
    <div className={styles.product}>
        <img className={styles.product__image} src={props.imgUrl} alt='product'/>
        <div className={styles.product__content}>
            <div className={styles.product__name}>
                {props.name}
            </div>
            <div>
                Count: {props.count}
            </div>
            <div>
                Size: {props.size.width} x {props.size.height}
            </div>
            <div>
                Weight: {props.weight}
            </div>
        </div>
    </div>
  )
}

export default Product