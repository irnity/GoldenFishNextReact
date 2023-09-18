import { nanoid } from "@reduxjs/toolkit"

import { useRef } from "react"

import { useDispatch, useSelector } from "react-redux"
import { productsActions } from "@/redux/productsSlice"
import { FunctionComponent, useEffect, useState } from "react"
import { auth } from "@/services/firebase/firebase"

import classes from "./NewProductForm.module.css"

import Link from "next/link"
import { useRouter } from "next/router"
import { query } from "firebase/firestore"
import useAddProductHook from "../hook/useAddProductHook"
import NewProductInput from "../components/NewProductInput"
import NewProductButton from "../components/NewProductButton"

interface NewProductFormProps {}

const NewProductForm = () => {
  const dispatch = useDispatch()

  const router = useRouter()

  const {
    categoryHandler,
    titleHandler,
    imageHandler,
    descriptionHandler,
    priceHandler,
    inStockHandler,

    params,
    paramNameHandler,
    paramValueHandler,

    error,
    routerBackHandler,

    addParamHandler,
    removeLastParamHandler,

    pushProductToFirebaseHandler,
  } = useAddProductHook()

  return (
    <form className={classes.form} onSubmit={pushProductToFirebaseHandler}>
      {/* Product */}
      <NewProductInput
        type="text"
        name="Category"
        required={true}
        placeholder="Category"
        onChange={categoryHandler}
      />
      <NewProductInput
        type="text"
        name="Title"
        required={true}
        placeholder="Title"
        onChange={titleHandler}
      />
      <NewProductInput
        type="url"
        name="Image"
        required={false}
        placeholder="Image"
        onChange={imageHandler}
      />

      <NewProductInput
        type="text"
        name="Description"
        required={true}
        placeholder="Description"
        onChange={descriptionHandler}
      />
      <div className={classes.row}>
        <NewProductInput
          type="number"
          name="Price"
          required={true}
          placeholder="0"
          onChange={priceHandler}
        />
        <NewProductInput
          type="number"
          name="InStock"
          required={true}
          placeholder="0"
          onChange={inStockHandler}
        />
      </div>

      {/* Params */}
      <div className={classes.paramsContainer}>
        <h1>Params</h1>
        {params.map((param, index) => (
          <div className={classes.row} key={index}>
            <NewProductInput
              type="text"
              name="Name"
              required={true}
              placeholder="Name"
              value={param.name}
              onChange={(event) => {
                paramNameHandler(event, index)
              }}
            />
            <NewProductInput
              type="text"
              name="Value"
              required={true}
              placeholder="Value"
              value={param.value}
              onChange={(event) => {
                paramValueHandler(event, index)
              }}
            />
          </div>
        ))}
        <NewProductButton
          handler={addParamHandler}
          text={"Add Param"}
          type="button"
        />
        <NewProductButton
          handler={removeLastParamHandler}
          text={"Remove Param"}
          type="button"
        />
      </div>

      {/* Error */}
      <h1 className={classes.error}>{error}</h1>

      {/* Navigation */}
      <div className={classes.row}>
        <NewProductButton
          text={"Back"}
          color={"tomato"}
          handler={routerBackHandler}
          type="button"
        />
        <NewProductButton text={"Submit"} color={"green"} type="submit" />
      </div>
    </form>
  )
}

export default NewProductForm
