import { useRouter } from "next/router"
import React, { useState } from "react"

interface IproductReference {
  itemId: string
  categoryId: string
}

const useProduct = ({ itemId, categoryId }: IproductReference) => {
  const router = useRouter()

  const deleteProductHandler = async () => {
    const procced = window.confirm("Are you sure?")
    if (procced) {
      const data = {
        itemId: itemId,
        categoryId: categoryId,
      }

      const responce = await fetch("/api/deleteproduct", {
        method: "PUT",
        body: JSON.stringify(data),
      })
      console.log(responce)
      router.back()
    }
  }

  return { deleteProductHandler }
}

export default useProduct
