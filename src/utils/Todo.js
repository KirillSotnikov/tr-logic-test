import { v4 as uuidv4 } from 'uuid'

export default class Todo {
  constructor ({ id, checked, text }) {
    this.id = id || uuidv4()
    this.checked = checked || false
    this.text = text || ''
  }

  setId (id) {
    this.id = id
  }

  setChecked (checked) {
    this.checked = checked
  }

  setText (text) {
    this.text = text
  }

  getResult () {
    return {
      id: this.id,
      checked: this.checked,
      text: this.text
    }
  }

}