import { useState, FunctionComponent } from "react"
import Link from "next/link"
import CatalogList from "./CatalogList"
import classes from "./Catalog.module.css"
import { CSSTransition } from "react-transition-group"

import { catalogList as information } from "./Info"

interface CatalogProps {}

const animationTiming = {
  enter: 300,
  exit: 300,
}

const Catalog: FunctionComponent<CatalogProps> = () => {
  const [toggleNavigation, setToggleNavigation] = useState(false)
  const [list, setList] = useState<string[]>([])

  const toggleNavigationHandler = (data: string[]) => {
    // check if list has data or its new data
    // if new then update list
    if (JSON.stringify(list) !== JSON.stringify(data)) {
      setToggleNavigation((prevState) => (prevState = true))
      setList(data)
      return
      // if new data === old data then catalog will be closed
    } else {
      fadeOut()
    }
  }

  function fadeOut() {
    setToggleNavigation((prevState) => (prevState = false))
    setList((prevState) => (prevState = []))
  }

  return (
    <>
      <div className={classes.catalog}>
        {/* catalog section */}
        {information.map((data) => (
          <CatalogList
            key={data.name}
            toggleNavigationHandler={toggleNavigationHandler}
            title={data.name}
            catalog={data.catalog}
          />
        ))}
      </div>
      {/* list one of section  */}
      <CSSTransition
        in={toggleNavigation}
        timeout={animationTiming}
        mountOnEnter
        unmountOnExit
        classNames={{
          enter: classes.fade_slide_enter,
          enterActive: classes.fade_slide_enter_active,
          exit: classes.fade_slide_exit,
          exitActive: classes.fade_slide_exit_active,
        }}
      >
        <div className={classes.catalog_block}>
          <div className={classes.catalog_link}>
            {/* need keys for catalog */}
            {list.map((catalog, index) => (
              <div className={classes.catalog_link_text} key={index}>
                <Link
                  href={`/${catalog}`}
                  className={classes.link}
                  onClick={fadeOut}
                >
                  {catalog}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </CSSTransition>
    </>
  )
}

export default Catalog
// style={{
//   position: "absolute",
//   top: "30%",
//   display: "flex",
//   justifyContent: "space-around",
//   width: "90%",
//   height: "65%",
//   boxShadow: "0px 0px 10px 0px black",
//   backgroundColor: " white",

// }
