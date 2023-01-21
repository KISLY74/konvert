import { observer } from "mobx-react-lite"
import { useContext, useRef, useState } from "react"
import { Form, Button } from "react-bootstrap"
import { Context } from "../index"
import { useEffect } from "react"

const FormDescription = observer(({ num, convertRef, items, setShow }) => {
  const { pdfDataStore } = useContext(Context)
  const [fill, setFill] = useState(true)
  const formRef = useRef()
  const fileRef = useRef()

  const saveData = () => {
    let groups = formRef.current.children
    convertRef.current.style.animation = 'none'

    for (let i = 0; i < groups.length - 1; i++) {
      let key = groups[i].children[0].innerText, value = groups[i].children[1].value
      if (!value.trim()) {
        alert('Не все поля заполнены')
        setFill(false)
        return
      } else {
        pdfDataStore.setData(key, value)
        setFill(true)
      }
    }
    if (fill) viewAndHide()
  }

  const viewAndHide = () => {
    convertRef.current.children[num - 1].classList.add('show')
    convertRef.current.children[num - 1].children[0].children[1].style.visibility = 'hidden'
    setShow(false)
    convertRef.current.style.animation = 'rotateConvert 1.5s'
  }

  const handleFile = (e) => pdfDataStore.setImgBytes(e.target.result)

  const handleChangeFile = (files) => {
    if (files.length > 3) {
      alert('Можно загрузить не более 3-х картинок!')
      fileRef.current.value = ''
      return
    }

    let filesArr = Array.from(files)

    if (filesArr.some(file => file.type !== 'image/png' && file.type !== 'image/jpeg')) {
      alert('Изображения только в формате .JPG, .PNG')
      fileRef.current.value = ''
      return
    }

    for (let i = 0; i < files.length; i++) {
      let fileData = new FileReader()

      fileData.onloadend = handleFile
      fileData.readAsArrayBuffer(files[i])
    }
  }

  useEffect(() => {
    pdfDataStore.clearImgBytes()
  }, [pdfDataStore])

  return <Form ref={formRef} className="d-flex flex-column">
    {num === 5 ? <Form.Group>
      <Form.Label>Загрузи картинку (только формат .jpg или .png)</Form.Label>
      <Form.Control
        multiple
        type="file"
        onChange={(e) => handleChangeFile(e.target.files)}
        ref={fileRef} />
    </Form.Group> : false}
    {items ? items.split(',').map(item =>
      <Form.Group key={item} className="mb-3">
        <Form.Label>{item}</Form.Label>
        <Form.Control
          as="textarea"
          placeholder={`Введите ${item}`}
          rows={3} />
      </Form.Group>) : false}
    <Button
      variant="success"
      onClick={(e) => saveData(e.target)}
      className="d-flex align-self-end">Готово</Button>
  </Form>
})

export default FormDescription