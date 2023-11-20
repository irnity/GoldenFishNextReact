import { useState } from 'react'

const useProfile = () => {
  const [toggle, setToggle] = useState(false)
  const [edit, setEdit] = useState(false)

  const toggleHandler = () => {
    setToggle(!toggle)
  }

  return {
    toggle,
    toggleHandler,
    edit,
    setEdit,
  }
}

export default useProfile
