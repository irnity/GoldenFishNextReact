import Characteristics from "../../components/main/about/info/Characteristics"
import Info from "../../components/main/about/info/Info"
import Description from "../../components/main/about/info/Description"
import classes from "./InformationPage.module.css"
import Additinal from "../../components/main/about/info/Additinal"
import Media from "../../components/main/about/info/Media"
import Recomendation from "../../components/main/about/info/Recomendation"
import Reviews from "../../components/main/about/info/Reviews"
import { FunctionComponent } from "react"

interface InformationPAgeProps {}

const InformationPAge: FunctionComponent<InformationPAgeProps> = () => {
  const product = useRouteLoaderData("product-detail") as {
    description: string
    title: string
    image: string
    price: number
    code: string
  }

  let info = null
  switch (params.productinfo) {
    case "info":
      info = <Info description={product.description} />
      break

    case "characteristics":
      info = <Characteristics />
      break

    case "description":
      info = <Description description={product.description} />
      break

    case "additinal":
      info = <Additinal />
      break

    case "media":
      info = <Media />
      break

    case "recomendation":
      info = <Recomendation />
      break

    case "reviews":
      info = <Reviews />
      break

    default:
      break
  }

  return <div className={classes.box}>{info}</div>
}

export default InformationPAge
