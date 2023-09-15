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
import LinkProductButton from "@/components/elements/linkProductButton/LinkProductButton"

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

    addParamHandler,
    removeLastParamHandler,

    pushProductToFirebaseHandler,
  } = useAddProductHook()

  return (
    <form className={classes.form} onSubmit={pushProductToFirebaseHandler}>
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
        required={true}
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "50px",
        }}
      >
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
      <div className={classes.paramsContainer}>
        <h1>Params</h1>
        {params.map((param, index) => (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              gap: "50px",
            }}
            key={index}
          >
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
      </div>
      <button
        type="button"
        className={classes.addParamButton}
        onClick={addParamHandler}
      >
        Add param
      </button>
      <button
        type="button"
        className={classes.addParamButton}
        onClick={removeLastParamHandler}
      >
        Remove param
      </button>

      <div className={classes.actions}>
        <button
          style={{ backgroundColor: "tomato" }}
          onClick={() => {
            router.back()
          }}
        >
          Cancel
        </button>
        <button type="submit" style={{ backgroundColor: "green" }}>
          Submit
        </button>
      </div>
    </form>
  )
}

export default NewProductForm
