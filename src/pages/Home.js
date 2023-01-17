import { Button } from "react-bootstrap"
import Convert from "../components/Convert"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import SectionBackground from "../components/SectionBackground"

export default function Home() {
  const history = useNavigate()

  return <>
    <Header />
    <SectionBackground />
    <section className="section-convert" style={{ height: '100vh' }}>
      <Convert />
      <Button variant="success" onClick={() => history('/pdf')}>Открыть в pdf</Button>
    </section>
  </>

}