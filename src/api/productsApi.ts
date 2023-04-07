import {
    createApi,
    fetchBaseQuery,
  } from "@reduxjs/toolkit/query/react";

import { ProductPayloadRequest } from "./types";
import { Product } from "../models/product";

export const productsApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080",
    }),
    tagTypes: ["Products"],
    reducerPath: "products",
    endpoints: (builder) => ({
        getProducts: builder.query<Array<Product>, any>({
            query: () => ({
                url: "products",
                method: "GET",
            }),
            providesTags: (result) =>
                 result ? result.map(({ id }) => ({ type: 'Products', id })) : [],
        }),
        getProduct: builder.query<Product, any>({
            query: (id: number) => ({
                url: `products/${id}`,
                method: "GET",
            }),
            providesTags: (result) =>
                 result ? [{ type: 'Products' }] : [],
        }),
        deleteProduct: builder.mutation({
            query: (id: number) => ({
                url: `products/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Products']
        }),
        updateProduct: builder.mutation({
            query: (data: {id: number, body: ProductPayloadRequest}) => ({
                url: `products/${data.id}`,
                method: "PUT",
                body: data.body
            }),
            invalidatesTags: ['Products']
        }),
        createProduct: builder.mutation({
            query: (data: ProductPayloadRequest) => ({
                url: `products`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ['Products']
        })
    })
})
