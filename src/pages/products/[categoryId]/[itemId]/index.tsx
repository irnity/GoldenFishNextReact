import { useRouter } from "next/router"
import { FunctionComponent } from "react"

interface ItemProps {}

const Item: FunctionComponent<ItemProps> = (props: any) => {
  const router = useRouter()

  const { categoryId, itemId } = router.query
  console.log(props.data)
  return (
    <div>
      <h1>Category</h1>

      <h1>name:{itemId}</h1>
    </div>
  )
}

export async function getStaticPaths() {
  return {
    fallback: false,
    paths: [
      {
        params: {
          categoryId: "fishingrod",
          itemId: "m1",
        },
      },
    ],
  }
}

export async function getStaticProps(context: any) {
  // get url
  const { categoryId, itemId } = context.params

  // fetch API
  return {
    props: {
      data: {
        categoryId,
        itemId,
      },
    },
  }
}

export default Item
