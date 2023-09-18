import { useRouter } from "next/router"
import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"

const useAddProductHook = () => {
  const dispatch = useDispatch()

  const router = useRouter()

  const [category, setCategory] = useState<string>("")
  const [title, setTitle] = useState<string>("")
  const [image, setImage] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [price, setPrice] = useState<number>(0)
  const [inStock, setInStock] = useState<number>(0)

  const [error, setError] = useState<string>("")

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setError("")
    }, 3000)

    return () => {
      clearTimeout(timer)
    }
  }, [error])

  const pushProductToFirebaseHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    const data = {
      category: category.trim(),
      title: title.trim(),
      description: description.trim(),
      image: image.trim(),
      price: +price,
      inStock: +inStock,
      params: params,
    }

    if (
      !category ||
      !title ||
      !description ||
      !image ||
      !price ||
      !inStock ||
      !params
    ) {
      setError("Please fill all fields")
      return
    }

    try {
      const responce = await fetch("/api/newproduct", {
        method: "POST",
        body: JSON.stringify(data),
      })

      const result = await responce.json()

      console.log("Responce:", result.message, "Data:", result.data)

      router.replace(`/products/${data.category}`)
    } catch (error) {
      console.log(error)
    }
  }

  const routerBackHandler = () => {
    router.back()
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

    error,

    routerBackHandler,

    addParamHandler,
    removeLastParamHandler,

    pushProductToFirebaseHandler,
  }
}

export default useAddProductHook
