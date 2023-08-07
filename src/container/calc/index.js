class Calc {
  static #value = ''

  static #NAME = 'calc'

  static #isDot = false

  static #memo = ''

  static add = (newValue) => {
    if (isNaN(this.#value[this.#value.length - 2])) {
      if (
        Number(this.#value[this.#value.length - 1]) === 0 &&
        this.#isDot == false
      ) {
        return null
      }
    }

    this.#value = this.#value.concat(newValue)
    this.#output()
  }

  static #output = () => {
    this.#save()
    window.output.innerHTML = this.#value
  }

  static dot = () => {
    if (this.#isDot) {
      return null
    }

    if (isNaN(this.#value[this.#value.length - 1])) {
      return null
    }

    this.#value = this.#value.concat('.')
    this.#output()
    this.#isDot = true
  }

  static op = (opValue) => {
    if (isNaN(this.#value[this.#value.length - 1])) {
      return null
    }

    this.#value = this.#value.concat(opValue)
    this.#output()
    this.#isDot = false
  }

  static reset = () => {
    this.#value = ''
    this.#isDot = false
    this.#output()
  }

  static result = () => {
    if (isNaN(this.#value[this.#value.length - 1])) {
      console.log(this.#value)
      return null
    }

    this.#value = String(eval(this.#value))

    if (this.#value.includes('.')) {
      this.#isDot = true
    } else {
      this.#isDot = false
    }

    this.#output()
    console.log(this.#value)
  }

  static #save = () => {
    window.localStorage.setItem(this.#NAME, this.#value)
  }

  static #load = () => {
    this.#value =
      window.localStorage.getItem(this.#NAME) || ''
  }

  static init = () => {
    this.#load()
    this.#output()
    console.log('calc is init')
  }

  static del = () => {
    this.#value = this.#value.slice(
      0,
      this.#value.length - 1,
    )
    this.#output()
  }

  static outputMemo = () => {
    if (this.#memo !== '') {
      window.memo.style.visibility = 'visible'
      window.memo.innerHTML = this.#memo
    } else {
      window.memo.style.visibility = 'hidden'
    }
  }

  static memoAdd = () => {
    this.result()
    this.#memo = String(
      Number(this.#memo) + Number(this.#value),
    )
    this.outputMemo()
  }

  static memoSub = () => {
    this.result()
    this.#memo = String(
      Number(this.#memo) - Number(this.#value),
    )
    this.outputMemo()
  }

  static memoRead = () => {
    this.#value = this.#memo
    this.#output()
  }

  static memoReset = () => {
    this.#memo = ''
    this.outputMemo()
  }
}

window.calc = Calc

// Calc.init()
