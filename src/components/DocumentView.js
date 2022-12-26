import { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { PDFDocument } from "pdf-lib";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import fontkit from "@pdf-lib/fontkit"
const data = require('../data')

export const DocumentView = observer(() => {
  const { pdfDataStore } = useContext(Context)
  const [source, setSource] = useState()
  const [load, setLoad] = useState(false)

  useEffect(() => {
    (async function () {
      const pdfDoc = await PDFDocument.create()
      const url2 = 'https://db.onlinewebfonts.com/t/643e59524d730ce6c6f2384eebf945f8.ttf'
      const fontBytes = await fetch(url2).then(res => res.arrayBuffer()).finally(() => setLoad(true))
      const page = pdfDoc.addPage()

      let customFont
      if (fontBytes) {
        pdfDoc.registerFontkit(fontkit)
        await pdfDoc.embedFont(fontBytes)
        customFont = await pdfDoc.embedFont(fontBytes)
      }

      let subItems = ""

      for (let j = 0; j < data.length; j++) {
        page.moveTo(35, 800)
        subItems += `${j + 1}. ${data[j].name.split(' ')[0]}\n`
        let subNum = 0
        for (let item of pdfDataStore.data) {
          if (data[j].description.includes(item[0])) {
            subNum++
            subItems += `\t${j + 1}.${subNum}. ${item[0]}: ${item[1]} \n`
          }
        }
      }

      function wrapText(text, fontSize) {
        let result = "", k = 0, count = 0

        for (let i = 0; i < text.length; i++) {
          result += text[i]
          if (fontSize * k > 1000) {
            k = 0
            result += '\n'
            count++
            if (count > 30) {
              moveTextToNextPage(text.slice(i))
              return result
            }
          }
          if (text[i] === '\n') {
            k = 0
            count++
            if (count > 30) {
              moveTextToNextPage(text.slice(i))
              return result
            }
          }
          k++
        }

        return result
      }

      const imagesBytes = pdfDataStore.imgBytes

      async function moveTextToNextPage(text) {
        const nextPage = pdfDoc.addPage()

        nextPage.moveTo(35, 800)
        nextPage.drawText(wrapText(text, 14), { font: customFont, size: 14 })
      }

      page.drawText(wrapText(subItems, 14), { font: customFont, size: 14 })

      const lastPage = pdfDoc.addPage()
      let coordX = 20, coordY = 600

      for (let i = 0; i < imagesBytes.length; i++) {
        const image = await pdfDoc.embedJpg(imagesBytes[i])
        const dims = image.scaleToFit(200, 200)

        if (i !== 0) i % 2 === 0 ? coordX += 210 : coordY -= 210

        lastPage.drawImage(image, {
          width: dims.width,
          height: dims.height,
          x: coordX,
          y: coordY
        })
      }

      const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true })
      setSource(pdfDataUri)
      pdfDataStore.clearImgBytes()
    })()
  }, [])

  return <>
    {load ?
      <iframe
        title="pdf"
        id="pdf"
        src={source}
        style={{ width: '100%', height: '100%' }
        } /> : <Spinner
        className="position-absolute start-50 top-50"
        animation="border"
        role="status" />}
  </>
})