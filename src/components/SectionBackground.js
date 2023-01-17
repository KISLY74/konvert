import "../styles/sectionBackground.scss"
import background from "../assets/background.jpg"

const SectionBackground = () => {
  return <section className="section">
    <div className="title">
      <p>В СООТВЕТСТВИИ С МОДЕЛЬЮ "КОНВЕРТ"</p>
      <h1>ПОМОГАЕМ РЕАЛИЗОВЫВАТЬ ПРОЕКТЫ</h1>
    </div>
    <img className="section__background" src={background} alt="background" />
  </section>
}

export default SectionBackground