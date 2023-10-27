import classes from "./Products.module.css"
import { FunctionComponent } from "react"
import { IProduct } from "@/redux/model"
import Item from "./Item/Item"

interface ProductsProps {
  products: IProduct[]
}

const Products: FunctionComponent<ProductsProps> = ({ products }) => {
  console.log(products)
  return (
    <div className={classes.container}>
      {products.map((product) => (
        <Item product={product} key={product.code} />
      ))}
    </div>
  )
}

export default Products
