import { makeAutoObservable } from "mobx"

export default class PDFDataStore {
  constructor() {
    this._data = new Map()
    this._show = false
    this._imgBytes = []
    makeAutoObservable(this)
  }
  setData(key, value) {
    this._data.set(key, value)
  }
  setShow(bool) {
    this._show = bool
  }
  setImgBytes(buff) {
    this._imgBytes.push(buff)
  }
  clearImgBytes() {
    this._imgBytes.clear()
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