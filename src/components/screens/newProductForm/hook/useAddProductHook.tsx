import { useRouter } from "next/router"
import React, { useState } from "react"
import { useDispatch } from "react-redux"

const useAddProductHook = () => {
  const dispatch = useDispatch()

  const router = useRouter()

  const [category, setCategory] = useState("")
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [price, setPrice] = useState<number>(0)
  const [inStock, setInStock] = useState<number>(0)
  const [description, setDescription] = useState("")

  const [params, setParams] = useState<{ name: string; value: string }[] | []>(
    []
  )

  const categoryHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value)
  }

  const titleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const imageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImage(event.target.value)
  }

  const priceHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(+event.target.value)
  }

  const inStockHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInStock(+event.target.value)
  }

  const descriptionHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value)
  }

  const paramNameHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newParams = [...params]
    newParams[index].name = event.target.value
    setParams(newParams)
  }

  const paramValueHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newParams = [...params]
    newParams[index].value = event.target.value
    setParams(newParams)
  }

  const addParamHandler = () => {
    setParams([...params, { name: "", value: "" }])
  }

  const removeLastParamHandler = () => {
    setParams(params.slice(0, -1))
  }

  const pushProductToFirebaseHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    const data = {
      category,
      title,
      description,
      image,
      price,
      inStock,
      params,
    }

    try {
      const responce = await fetch("/api/newproduct", {
        method: "POST",
        body: JSON.stringify(data),
      })

      const result = await responce.json()

      console.log(result)
      router.replace(`/products/${data.category}`)
    } catch (error) {
      console.log(error)
    }
  }

  return {
    category,
    categoryHandler,
    title,
    titleHandler,
    image,
    imageHandler,
    price,
    priceHandler,
    inStock,
    inStockHandler,
    description,
    descriptionHandler,

    params,
    paramNameHandler,
    paramValueHandler,

    addParamHandler,
    removeLastParamHandler,

    pushProductToFirebaseHandler,
  }
}

export default useAddProductHook
