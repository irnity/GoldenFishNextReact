import React, { FunctionComponent } from "react"
import NewProductForm from "@/components/screens/newProductForm/page/NewProductForm"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"

interface NewProductPageProps {}

const NewProductPage: FunctionComponent<NewProductPageProps> = () => {
  const router = useRouter()

  const { isLogedIn, isAdmin, userInfo } = useSelector(
    (state: {
      auth: { isLogedIn: boolean; isAdmin: boolean; userInfo: string }
    }) => state.auth
  )

  return <NewProductForm />
}

// next.js fetch server side
// next all server side methods
// getServerSideProps
// getStaticProps
// getStaticPaths

// export const getServerSideProps = async (context: any) => {
//   const { req, res } = context

//   const { isLogedIn, isAdmin, userInfo } = req.cookies

//   if (true) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,

//       },
//     }
//   }

//   return {
//     props: {},
//   }
// }

export default NewProductPage
