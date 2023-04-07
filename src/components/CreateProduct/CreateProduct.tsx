import TextField from '@mui/material/TextField'
import { useFormik } from 'formik';
import React from 'react'
import * as Yup from "yup";
import styles from "./styles.module.scss"
import { Button } from '@mui/material';
import { productsApi } from '../../api/productsApi';
import { toast } from 'react-toastify';
import { Product } from '../../models/product';
import { ProductPayloadRequest } from '../../api/types';

interface InputData {
    imageUrl: string;
    name: string;
    count: number;
    width: number;
    height: number;
    weight: string;
}

export const validateSchema = Yup.object({
    imageUrl: Yup.string().url().required(),
    name: Yup.string().min(3).max(25).required(),
    count: Yup.number().min(1).max(999).required(),
    width: Yup.number().required(),
    height: Yup.number().required(),
    weight: Yup.string().required(),
});

interface Props {
    product?: Product;
    onClose: () => void
}

function CreateProduct(props: Props) {
    const initialValues: InputData = !props.product ? {
        imageUrl: "",
        name: "",
        count: 1,
        width: 10,
        height: 10,
        weight: "100g",
    } : {
        imageUrl: props.product.imageUrl,
        name: props.product.name,
        count: props.product.count,
        width: props.product.size.width,
        height: props.product.size.height,
        weight: props.product.weight,
    }
    const [createProduct, { isLoading: isCreating }] = productsApi.useCreateProductMutation()
    const [updateProduct, { isLoading: isUpdating }] = productsApi.useUpdateProductMutation()
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validateSchema,
        onSubmit: async (values: InputData) => {
            const data: ProductPayloadRequest = {
                imageUrl: values.imageUrl,
                name: values.name,
                count: values.count,
                size: {
                    width: values.width,
                    height: values.height,
                },
                weight: values.weight,
                comments: []
            }

            !props.product ? await createProduct(data)
                .then(() => {
                    toast.success("Product successfully added!")
                })
                .catch(() => {
                    toast.error("Something went wrong!")
                })
                .finally(() => {
                    props.onClose()
                }) : await updateProduct({id: props.product.id, body: data})
                .then(() => {
                    toast.success("Product successfully updated!")
                })
                .catch(() => {
                    toast.error("Something went wrong!")
                })
                .finally(() => {
                    props.onClose()
                })
                
        },
    });
    return (
        <form className={styles.form} onSubmit={formik.handleSubmit}>
            <TextField
                fullWidth
                label="Image URL"
                name="imageUrl"
                type="text"
                placeholder="Enter product image URL"
                color="secondary"
                value={formik.values.imageUrl}
                onChange={formik.handleChange}
                error={formik.touched.imageUrl && Boolean(formik.errors.imageUrl)}
                helperText={formik.touched.imageUrl && formik.errors.imageUrl}
            />
            <TextField
                fullWidth
                label="Name"
                name="name"
                type="text"
                placeholder="Enter product name"
                color="secondary"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
                fullWidth
                label="count"
                name="count"
                type="number"
                placeholder="Enter product count"
                color="secondary"
                value={formik.values.count}
                onChange={formik.handleChange}
                error={formik.touched.count && Boolean(formik.errors.count)}
                helperText={formik.touched.count && formik.errors.count}
            />
            <TextField
                fullWidth
                label="Width"
                name="width"
                type="text"
                placeholder="Enter product width"
                color="secondary"
                value={formik.values.width}
                onChange={formik.handleChange}
                error={formik.touched.width && Boolean(formik.errors.width)}
                helperText={formik.touched.width && formik.errors.width}
            />
            <TextField
                fullWidth
                label="Height"
                name="height"
                type="text"
                placeholder="Enter product height"
                color="secondary"
                value={formik.values.height}
                onChange={formik.handleChange}
                error={formik.touched.height && Boolean(formik.errors.height)}
                helperText={formik.touched.height && formik.errors.height}
            />
            <TextField
                fullWidth
                label="Weight"
                name="weight"
                type="text"
                placeholder="Enter product weight"
                color="secondary"
                value={formik.values.weight}
                onChange={formik.handleChange}
                error={formik.touched.weight && Boolean(formik.errors.weight)}
                helperText={formik.touched.weight && formik.errors.weight}
            />
            <Button size='large' disabled={isUpdating || isCreating} variant="contained" color="secondary" fullWidth type="submit">
                {props.product ? "Update" : "Create"}
            </Button>
            <Button size='large' onClick={props.onClose} variant="outlined" color="secondary" fullWidth type="button">
                Close
            </Button>
        </form>
    )
}

export default CreateProduct