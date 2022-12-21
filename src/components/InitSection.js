import { Button } from "react-bootstrap"
import { useState } from "react"
import ModalWindow from "./ModalWindow"

const InitSection = ({ convertRef, name, description, num }) => {
  const [show, setShow] = useState(false)

  return <div id="section">
    <p>{num}.
      <b> {name}</b>
      ({description})
    </p>
    <Button className="btn" onClick={() => setShow(true)}>Написать</Button>
    <ModalWindow
      convertRef={convertRef}
      show={show}
      setShow={setShow}
      num={num}
      name={name}
      description={description} />
  </div>
}

export default InitSection