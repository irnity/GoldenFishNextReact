import { storage } from '@/services/firebase/firebase'
import { nanoid } from '@reduxjs/toolkit'
import { ref, uploadBytes } from 'firebase/storage'
import { useRouter } from 'next/router'
import type React from 'react'
import { useState, useEffect } from 'react'

const useAddProductHook = () => {
  const router = useRouter()

  const [category, setCategory] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [producer, setProducer] = useState<string>('')
  const [image, setImage] = useState<any>('')
  const [description, setDescription] = useState<string>('')
  const [price, setPrice] = useState<number>(0)
  const [inStock, setInStock] = useState<number>(0)

  const [error, setError] = useState<string>('')

  const [params, setParams] = useState<
    Array<{ name: string; value: string }> | []
  >([])

  const categoryHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value)
  }

  const titleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const producerHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProducer(event.target.value)
  }

  const imageHandler = (event: any) => {
    setImage(event)
  }

  const priceHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(parseInt(event.target.value))
  }

  const inStockHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInStock(parseInt(event.target.value))
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
    setParams([...params, { name: '', value: '' }])
  }

  const removeLastParamHandler = () => {
    setParams(params.slice(0, -1))
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setError('')
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
      code: nanoid(),
      category: category.trim(),
      title: title.trim(),
      description: description.trim(),
      price,
      inStock,
      params,
    }

    if (
      category === '' ||
      title === '' ||
      description === '' ||
      image === undefined ||
      Number.isNaN(price) ||
      Number.isNaN(inStock) ||
      params === undefined
    ) {
      setError('Please fill all fields')
      return
    }

    try {
      const responce = await fetch('/api/newproduct', {
        method: 'POST',
        body: JSON.stringify(data),
      })
      const result = await responce.json()

      if (result.message === 'success') {
        const imageRef = ref(storage, `productImages/${data.code}`)
        await uploadBytes(imageRef, image)
        console.log('Responce:', result.message, 'Data:', result.data)
        void router.replace(`/products/${data.category}`)
      } else {
        throw new Error('Error')
      }
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
    producer,
    producerHandler,
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
