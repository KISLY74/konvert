import { useContext, useEffect, useState } from "react"
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { backgrounds } from "../assets/backgrounds"
import { observer } from "mobx-react-lite";
import { Context } from "..";
import data from "../data";
pdfMake.vfs = pdfFonts.pdfMake.vfs;


const PdfPreview = observer(() => {
  const { pdfDataStore } = useContext(Context)
  const [source, setSource] = useState()

  function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  async function pdfLoad() {
    let text = []

    for (let j = 0; j < data.length; j++) {
      text.push({ text: `${j + 1}. ${data[j].name.split(' ')[0]}\n`, fontSize: 15, bold: true })

      let num = 0

      if (j === 4) {
        text.push({ text: 'Изображения: ', italics: true, margin: [0, 5, 0, 0] })

        for (let i = 0; i < pdfDataStore.imgBytes.length; i++)
          text.push({
            image: `data:image/jpeg;base64,${arrayBufferToBase64(pdfDataStore.imgBytes[i])}`,
            width: 300,
            margin: [5, 5],
            alignment: 'center'
          })
      }

      for (let item of pdfDataStore.data) {
        if (data[j].description.includes(item[0])) {
          num++
          text.push({ text: `\t${j + 1}.${num}. ${item[0]}.`, bold: true, fontSize: 12, margin: [15, 10, 0, 0], })
          text.push({ text: `${item[1]} \n`, margin: [15, 5, 0, 0], lineHeight: 1.5 })
        }
      }
    }

    const docDefinition = {
      pageSize: 'A4',
      background(currentPage, pageSize) {
        return [
          {
            image: backgrounds.pageBackground,
            width: pageSize.width,
            height: pageSize.height,
            opacity: 0.3
          }
        ]
      },
      content: text
    }

    const pdfDocGenerator = pdfMake.createPdf(docDefinition)
    pdfDocGenerator.getDataUrl((dataUrl) => {
      setSource(dataUrl)
    })
  }

  useEffect(() => {
    pdfLoad()
  }, [])

  return <iframe
    title="pdf"
    src={source}
    style={{ width: '100%', height: '100%' }
    } />
})

export default PdfPreview