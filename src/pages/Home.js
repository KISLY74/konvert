import { Button } from "react-bootstrap"
import Convert from "../components/Convert"
import { useNavigate } from "react-router-dom"

export default function Home() {
  const history = useNavigate()

  return <div className="d-flex justify-content-center align-items-center flex-column" style={{ height: '100vh' }}>
    <Convert />
    <Button variant="success" onClick={() => history('/pdf')}>Открыть в pdf</Button>
  </div>
}