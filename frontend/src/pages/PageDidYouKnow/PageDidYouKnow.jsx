// CSS
import "./PageDidYouKnow.scss"

// REACT
import { useState } from "react"

// Components
import EditDidYouKnow from "../../components/EditDidYouKnow/EditDidYouKnow"
import TableDidYouKnow from "../../components/TableDidYouKnow/TableDidYouKnow"
import DisplayDidYouKnow from "../../components/DisplayDidYouKnow/DisplayDidYouKnow"

// Hooks
import { useDidYouKnows } from "../../hooks/useDidYouKnow"

const PageDidYouKnow = () => {
  const [selected, setSelected] = useState(null)

  const { data: didyouknows = [], isLoading, isError } = useDidYouKnows()

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Error loading didyouknows</p>
  }

  return (
    <section className="container__pagedidyouknow">
      <TableDidYouKnow
        didyouknows={didyouknows}
        selected={selected}
        onSelect={setSelected}
      />

      <div className="container__pagedidyouknow__content">
        <EditDidYouKnow didYouKnow={selected} onChange={setSelected} />
        <DisplayDidYouKnow didYouKnow={selected} />
      </div>
    </section>
  )
}

export default PageDidYouKnow
