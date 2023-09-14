import { nanoid } from "@reduxjs/toolkit"

import { useRef } from "react"

import { useDispatch, useSelector } from "react-redux"
import { productsActions } from "@/redux/productsSlice"
import { FunctionComponent, useEffect, useState } from "react"
import { auth } from "@/services/firebase/firebase"

import classes from "./NewProductForm.module.css"

import Link from "next/link"
import { useRouter } from "next/router"

interface NewProductFormProps {}

const NewProductForm = (props: any) => {
  const dispatch = useDispatch()

  const router = useRouter()

  const categoryRef = useRef<HTMLInputElement>(null)
  const titleRef = useRef<HTMLInputElement>(null)
  const imageRef = useRef<HTMLInputElement>(null)
  const priceRef = useRef<HTMLInputElement>(null)
  const inStockRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLTextAreaElement>(null)

  const { isLogedIn, isAdmin } = useSelector(
    (state: { auth: { isLogedIn: boolean; isAdmin: boolean } }) => state.auth
  )

  // will redirect if data not loaded
  useEffect(() => {}, [isAdmin, isLogedIn])

  const addProductHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data = {
      category: categoryRef.current?.value,
      title: titleRef.current?.value,
      description: descriptionRef.current?.value,
      image: imageRef.current?.value,
      price: priceRef.current?.value,
      inStock: inStockRef.current?.value,
      userId: auth.currentUser?.uid,
    }
    props.onAddMeetup(data)
    // console.log(data)
  }

  return (
    <form className={classes.form} onSubmit={addProductHandler}>
      <>
        <p>
          <label htmlFor="category">Category</label>
          <input
            id="category"
            type="text"
            name="category"
            required
            placeholder={"products"}
            ref={categoryRef}
          />
        </p>

        <p>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            name="title"
            required
            defaultValue={""}
            ref={titleRef}
          />
        </p>
        <p>
          <label htmlFor="image">Image</label>
          <input
            id="image"
            type="url"
            name="image"
            defaultValue={""}
            ref={imageRef}
          />
        </p>
        <p>
          <label htmlFor="price">Price</label>
          <input
            id="price"
            type="number"
            name="price"
            required
            defaultValue={""}
            ref={priceRef}
          />
        </p>
        <p>
          <label htmlFor="inStock">inStock</label>
          <input
            id="inStock"
            type="number"
            name="inStock"
            required
            defaultValue={""}
            ref={inStockRef}
          />
        </p>
        <p>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows={5}
            required
            defaultValue={""}
            ref={descriptionRef}
          />
        </p>

        <div className={classes.actions}>
          {/* navigate to home */}
          <Link type="button" href="/home">
            <button style={{ backgroundColor: "red", color: "black" }}>
              Cancel
            </button>
          </Link>
          <button
            type="submit"
            style={{ backgroundColor: "green", color: "black" }}
          >
            Submit
          </button>
        </div>
      </>
    </form>
  )
}

export default NewProductForm
