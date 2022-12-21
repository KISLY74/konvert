import "./shapes.scss"
import InitSection from "./InitSection"
import { useRef } from "react"
const data = require('../data')

export default function Convert() {
  const convertRef = useRef()

  return <div id="convert" ref={convertRef}>
    {data.map((el, i) => <div key={JSON.stringify(el)} id={el.id}>
      <InitSection
        num={i + 1}
        name={el.name}
        description={el.description}
        convertRef={convertRef}
      />
    </div>)}
  </div>
}