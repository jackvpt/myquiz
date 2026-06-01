// CSS
import "./SearchBar.scss"

import { useState } from "react"
import CustomTextField from "../CustomTextField/CustomTextField"
import { useDispatch } from "react-redux"
import { setSearch } from "../../../features/searchSlice"

const SearchBar = () => {
  const dispatch = useDispatch()
  const [searchTerm, setSearchTerm] = useState("")

  const handleChange = (event) => {
    setSearchTerm(event.target.value)
    dispatch(setSearch(event.target.value))
  }
  return (
    <div className="container__searchbar">
      <CustomTextField
        label="Recherche"
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  )
}

export default SearchBar
