import { nanoid } from "@reduxjs/toolkit"
import {
  Form,
  FormMethod,
  Link,
  redirect,
  useNavigate,
  useNavigation,
} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux/es/exports"
import { productsActions } from "../../../store/productsSlice"
import classes from "./NewProductForm.module.css"
import { FunctionComponent, useEffect, useState } from "react"
import { addDoc, collection } from "firebase/firestore"
import { auth, db } from "../../../config/firebase"

interface NewProductFormProps {
  method: FormMethod
}

const NewProductForm: FunctionComponent<NewProductFormProps> = ({ method }) => {
  // add type state
  // const products = useSelector((state: any) => state.products.products) as {
  //   description: string
  //   title: string
  //   image: string
  //   price: number
  //   code: string
  // }[]

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const navigation = useNavigation()

  const { isLogedIn, isAdmin } = useSelector(
    (state: { auth: { isLogedIn: boolean; isAdmin: boolean } }) => state.auth
  )

  // will redirect if data not loaded
  useEffect(() => {
    if (!isAdmin && !isLogedIn) {
      navigate(-1)
    }
  }, [isAdmin, isLogedIn, navigate])

  const [code, setCode] = useState("")

  const addProductHandler = () => {
    dispatch(productsActions.addProduct())
  }

  const codeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode((prevState) => (prevState = e.target.value))
  }

  return (
    <Form className={classes.form} method={method}>
      {navigation.state === "loading" ? (
        <p>loading</p>
      ) : (
        <>
          <p>
            <label htmlFor="category">Category</label>
            <input
              id="category"
              type="text"
              name="category"
              required
              placeholder={"products"}
            />
          </p>
          {/* prevent user from post data even if he deleted required in inputs */}
          <p>
            <label htmlFor="code">Code</label>
            <input
              id="code"
              type="text"
              name="code"
              value={code}
              onChange={codeHandler}
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
            />
          </p>
          <p>
            <label htmlFor="image">Image</label>
            <input id="image" type="url" name="image" defaultValue={""} />
          </p>
          <p>
            <label htmlFor="price">Price</label>
            <input
              id="price"
              type="number"
              name="price"
              required
              defaultValue={""}
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
            />
          </p>

          <div className={classes.actions}>
            {/* navigate to home */}
            <Link type="button" to="..">
              <button style={{ backgroundColor: "red", color: "black" }}>
                Cancel
              </button>
            </Link>
            <button
              onClick={addProductHandler}
              style={{ backgroundColor: "green", color: "black" }}
            >
              Submit
            </button>
          </div>
        </>
      )}
    </Form>
  )
}

export default NewProductForm

interface request {
  request: { formData: () => {} }
}

// need maybe some fixes with TS
export async function action({ request }: request) {
  // get data from product form page
  const data = (await request.formData()) as {
    get: (value: string) => string
  }

  const productsCollectionRef = collection(
    db,
    "store",
    `${data.get("category")}`,
    "items"
  )

  // edit
  const productData = {
    // new update code creator
    code: data.get("code") || nanoid(),
    title: data.get("title"),
    price: parseInt(data.get("price")),
    image: data.get("image"),
    description: data.get("description"),
    inStock: parseInt(data.get("inStock")),
    userId: auth.currentUser?.uid,
  }

  try {
    // addDoc createNew elemets with auto id

    await addDoc(productsCollectionRef, productData)
  } catch (err) {
    console.error(err)
  }

  return redirect(`/${data.get("category")}`)
}
