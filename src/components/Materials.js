import model from "../files/Biznes-model_Ostervaldera.docx"
import method from "../files/Metod_konverta_5R.docx"
import "../styles/materials.scss"
import fileDocx from "../assets/fileDocx.png"

const Materials = () => {
  return <section className="section-materials">
    <h2>Обучающие материалы</h2>
    <div className="materials">
      <a className="materials__file" href={model} rel="noopener" download>
        <img src={fileDocx} alt="modelFile" />
        Нажми, чтобы скачать файл</a>
      <a className="materials__file" href={method} rel="noopener" download>
        <img src={fileDocx} alt="modelFile" />
        Нажми, чтобы скачать файл</a>
    </div>
  </section>
}

export default Materials