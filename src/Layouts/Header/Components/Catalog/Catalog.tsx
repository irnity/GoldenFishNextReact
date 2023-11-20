import React, { useState } from 'react'
import classes from './Catalog.module.css'
import { FiGrid } from 'react-icons/fi'
import { Information } from './Data/Information'
import { CSSTransition } from 'react-transition-group'
import CustomBackground from '@/Components/Elements/CustomBackground/CustomBackground'
import CatalogLisks from './CatalogLinks/CatalogLisks'
import CatalogCategory from './CatalogCategory/CatalogCategory'

const animationTiming = {
  enter: 300,
  exit: 100,
}

const Catalog = () => {
  const [toggle, setToggle] = useState(false)

  const toggleHandler = () => {
    setToggle((prevState) => !prevState)
  }

  const [category, setCategory] = useState(Information[0])

  const categoryHandler = (category: string) => {
    const filter = Information.find((data) => data.name === category)
    setCategory(filter ?? Information[0])
  }

  return (
    <div className={classes.container}>
      <div className={classes.toggle} onClick={toggleHandler}>
        <FiGrid size={25} />
        <h1>Каталог</h1>
      </div>
      {toggle && <CustomBackground handler={toggleHandler} />}

      <CSSTransition
        in={toggle}
        timeout={animationTiming}
        mountOnEnter
        unmountOnExit
        classNames={{
          enterActive: classes.fade_slide_enter_active,
          exitActive: classes.fade_slide_exit_active,
        }}
      >
        <div className={classes.catalog}>
          <CatalogCategory
            category={Information}
            selectedCategory={category.name}
            categoryHandler={categoryHandler}
          />
          <CatalogLisks
            links={category.catalog}
            toggleHandler={toggleHandler}
          />
        </div>
      </CSSTransition>
    </div>
  )
}

export default Catalog
