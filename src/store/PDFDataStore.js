import { makeAutoObservable } from "mobx"

export default class PDFDataStore {
  constructor() {
    this._data = new Map()
    this._show = false
    this._imgBytes = null
    makeAutoObservable(this)
  }
  setData(key, value) {
    this._data.set(key, value)
  }
  setShow(bool) {
    this._show = bool
  }
  setImgBytes(arrayBuf) {
    this._imgBytes = arrayBuf
  }
  get data() {
    return this._data.entries()
  }
  get show() {
    return this._show
  }
  get imgBytes() {
    return this._imgBytes
  }
}