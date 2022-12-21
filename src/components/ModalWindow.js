import { Modal } from "react-bootstrap"
import FormDescription from "./FormDescription"

const ModalWindow = ({ convertRef, show, setShow, num, name, description }) => {
  return <Modal show={show} onHide={() => setShow(false)}>
    <Modal.Header closeButton>
      <Modal.Title>{num}. {name}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <FormDescription
        num={num}
        convertRef={convertRef}
        items={description}
        setShow={setShow} />
    </Modal.Body>
  </Modal>
}

export default ModalWindow