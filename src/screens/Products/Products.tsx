import React, { useState } from 'react'
import { productsApi } from '../../api/productsApi'
import Product from '../../components/product'
import styles from './styles.module.scss'
import { Link } from "react-router-dom";
import { Box, Button, CircularProgress, Modal } from '@mui/material';
import CreateProduct from '../../components/CreateProduct';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}


function Products() {
  const [openModal, setOpenModal] = useState(false)
  const {data, isLoading} = productsApi.useGetProductsQuery({})
  const [deleteProduct] = productsApi.useDeleteProductMutation()

  if (isLoading) {
    return <CircularProgress color="secondary" />
  }

  const handleDeleteProduct = async (id: number) => {
    await deleteProduct(id).then(() => {
      toast.success("Deleted successfully")
    }).catch(e => {
      toast.error("Something went wrong!")
    })
  }

  return (
    <div className={styles.root}>
      <Button onClick={() => setOpenModal(true)} variant='contained' color="secondary">Add Product</Button>
      <div className={styles.container}>
      {data?.map(elem => (
       <React.Fragment key={elem.id} >
          <Link style={{textDecoration: "none", color: "black"}}
          to={`/products/${elem.id}`}>
          <Product 
              imgUrl={elem.imageUrl} 
              name={elem.name} 
              count={elem.count} 
              size={elem.size} 
              weight={elem.weight} />
        </Link>
        <IconButton onClick={() => handleDeleteProduct(elem.id)} aria-label="delete">
          <DeleteIcon color='error' />
        </IconButton>
       </React.Fragment>
      ))}
      </div>
      <Modal 
        open={openModal} 
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <CreateProduct onClose={() => setOpenModal(false)}/>
          </Box>
        </Modal>
    </div>
  )
}

export default Products