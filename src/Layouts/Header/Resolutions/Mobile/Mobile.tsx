import { type FunctionComponent, useEffect, useState } from 'react'

import classes from './Mobile.module.css'
import ShopName from '../../shopName/ShopName'
import SearchHeader from '../../search/SearchHeader'
import Sighup from '../../signup/Signup'
import Basket from '../../basket/Basket'

import { CSSTransition } from 'react-transition-group'
import Links from './links/Links'
import CatalogLinks from './links/CatalogLinks'

interface MobileProps {}

const animationTiming = {
  enter: 300,
  exit: 285,
}

const Mobile: FunctionComponent<MobileProps> = () => {
  const [toogleMenu, setToogleMenu] = useState(false)
  const [links, setLinks] = useState(false)
  const [catalog, setCatalog] = useState(false)

  const toogleHadnlerMenu = () => {
    setToogleMenu((prevState) => !prevState)
    toogleHandlerLinks()
  }

  const toogleHandlerLinks = () => {
    setLinks(true)
    setCatalog(false)
  }

  const toogleHandlerCatalog = () => {
    setCatalog(true)
    setLinks(false)
  }

  useEffect(() => {
    document.body.style.overflowY = toogleMenu ? 'hidden' : 'auto'

    return () => {
      document.body.style.overflowY = 'auto'
    }
  }, [toogleMenu])

  return (
    <>
      <header className={classes.mobile}>
        <div className={classes.left} onClick={toogleHadnlerMenu}>
          <div className={classes.menu}></div>
        </div>
        <div className={classes.right}>
          <ShopName />
          <SearchHeader />
          <Sighup />
          <Basket />
        </div>
      </header>

      <div className={classes.back}>
        {toogleMenu && (
          <div className={classes.background} onClick={toogleHadnlerMenu}></div>
        )}
        <CSSTransition
          in={links && toogleMenu}
          timeout={animationTiming}
          mountOnEnter
          unmountOnExit
          classNames={{
            enterActive: classes.fade_slide_enter_active,
            exitActive: classes.fade_slide_exit_active,
          }}
        >
          <div className={classes.catalog}>
            <Links toogleHandlerCatalog={toogleHandlerCatalog} />
          </div>
        </CSSTransition>
        <CSSTransition
          in={catalog && toogleMenu}
          timeout={animationTiming}
          mountOnEnter
          unmountOnExit
          classNames={{
            enterActive: classes.fade_slide_enter_active,
            exitActive: classes.fade_slide_exit_active,
          }}
        >
          <div className={classes.catalog}>
            <CatalogLinks toogleHandlerLinks={toogleHandlerLinks} />
          </div>
        </CSSTransition>
      </div>
    </>
  )
}

export default Mobile
