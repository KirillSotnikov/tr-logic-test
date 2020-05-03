
class StringValidator {
  constructor (value, name = '') {
    this.value = value
    this.name = name
    this.errors = []
  }

  addError (message) {
    this.errors.push({ errorMessage: message })
  }

  isEmpty () {
    if (!this.value.trim()) {
      this.addError(`Значение ${this.name} не должно быть пустым`)
    }
    return this
  }

  maxSize (size) {
    if (this.value.length > size) {
      this.addError(`Количество ${this.name} не должно быть больше ${size}`)
    }
    return this
  }

  getResult () {
    return {
      result: this.value,
      errors: this.errors
    }
  }
}

export {
  StringValidator
}