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
import CustomInput from "@/components/elements/customInput/CustomInput"
import CustomButton from "@/components/elements/customButton/CustomButton"

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
      <CustomInput
        type="text"
        name="Category"
        required={true}
        placeholder="Category"
        onChange={categoryHandler}
      />
      <CustomInput
        type="text"
        name="Title"
        required={true}
        placeholder="Title"
        onChange={titleHandler}
      />
      <CustomInput
        type="url"
        name="Image"
        required={false}
        placeholder="Image"
        onChange={imageHandler}
      />

      <CustomInput
        type="text"
        name="Description"
        required={true}
        placeholder="Description"
        onChange={descriptionHandler}
      />
      <div className={classes.row}>
        <CustomInput
          type="number"
          name="Price"
          required={true}
          placeholder="0"
          onChange={priceHandler}
        />
        <CustomInput
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
            <CustomInput
              type="text"
              name="Name"
              required={true}
              placeholder="Name"
              value={param.name}
              onChange={(event) => {
                paramNameHandler(event, index)
              }}
            />
            <CustomInput
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
        <CustomButton
          handler={addParamHandler}
          text={"Add Param"}
          type="button"
        />
        <CustomButton
          handler={removeLastParamHandler}
          text={"Remove Param"}
          type="button"
        />
      </div>

      {/* Error */}
      <h1 className={classes.error}>{error}</h1>

      {/* Navigation */}
      <div className={classes.row}>
        <CustomButton
          text={"Back"}
          color={"tomato"}
          handler={routerBackHandler}
          type="button"
        />
        <CustomButton text={"Submit"} color={"green"} type="submit" />
      </div>
    </form>
  )
}

export default NewProductForm
