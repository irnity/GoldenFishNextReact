import { auth } from "@/services/firebase/firebase"
import { useRouter } from "next/router"
import React, { useState } from "react"
import { useSelector } from "react-redux"

interface IproductReference {
  itemId: string
  categoryId: string
}

const useProduct = ({ itemId, categoryId }: IproductReference) => {
  const router = useRouter()

  const { isLogedIn } = useSelector(
    (state: { auth: { isLogedIn: boolean } }) => state.auth
  )

  const [toggleWriteComment, setToggleWriteComment] = useState(false)

  const [rate, setRate] = useState(1)
  const [positive, setPositive] = useState("")
  const [negative, setNegative] = useState("")
  const [comment, setComment] = useState("")
  const [name, setName] = useState("")

  const deleteProductHandler = async () => {
    const procced = window.confirm("Are you sure?")
    if (procced) {
      const data = {
        itemId: itemId,
        categoryId: categoryId,
      }

      const responce = await fetch("/api/newproduct", {
        method: "PUT",
        body: JSON.stringify(data),
      })

      console.log(responce)
      router.back()
    }
  }

  const toggleWriteCommentHandler = () => {
    if (isLogedIn === false) {
      router.push("/login")
    } else {
      setToggleWriteComment((prevState) => !prevState)
    }
  }

  const postCommentHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()
    const data = {
      name: name,
      email: auth.currentUser?.email,
      rate: rate,
      positive: positive,
      negative: negative,
      comment: comment,
      itemId,
    }

    const responce = await fetch("/api/newcomment", {
      method: "POST",
      body: JSON.stringify(data),
    })

    const result = await responce.json()

    router.reload()
  }

  const deleteCommentHandler = async (id: string) => {
    const data = {
      id: id,
      categoryId: categoryId,
      itemId: itemId,
      name: auth.currentUser?.email,
    }
    const responce = await fetch("/api/newcomment", {
      method: "PUT",
      body: JSON.stringify(data),
    })

    console.log(await responce.json())

    router.reload()
  }
  return {
    toggleWriteComment,

    rate,

    setRate,
    setPositive,
    setNegative,
    setComment,
    setName,

    postCommentHandler,

    deleteProductHandler,
    toggleWriteCommentHandler,
    deleteCommentHandler,
  }
}

export default useProduct
