class Calc {
  static #value = ''

  static #NAME = 'calc'

  static #isDot = false

  static #memo = ''

  //точность вычислений
  static #precision = 8

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
    window.output.innerText = this.#value
  }

  static dot = () => {
    if (this.#isDot) {
      return null
    }

    if (isNaN(this.#value[this.#value.length - 1])) {
      return null
    }

    this.#value = this.#value.concat('.')
    this.#isDot = true
    this.#output()
  }

  static op = (opValue) => {
    if (
      isNaN(this.#value[this.#value.length - 1]) &&
      opValue !== '-'
    ) {
      return null
    }

    if (
      opValue === '-' &&
      this.#value[this.#value.length - 1] === '-'
    ) {
      return null
    }

    this.#value = this.#value.concat(opValue)
    this.#isDot = false
    this.#output()
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

    // this.#value = String(eval(this.#value))
    //===========================================
    let temp = eval(this.#value)

    if (Number.isInteger(temp)) this.#value = String(temp)
    else this.#value = this.#cutNumber(temp)
    //===========================================

    if (this.#value.includes('.')) {
      this.#isDot = true
    } else {
      this.#isDot = false
    }

    console.log(this.#value)
    this.#output()
  }

  static #cutNumber = (temp) => {
    temp = String(temp.toFixed(this.#precision))

    while (temp.endsWith('0')) {
      temp = temp.slice(0, temp.length - 1)
    }

    return temp
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

    if (this.#value.includes('.')) this.#isDot = true
    else this.#isDot = false

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
    if (isNaN(this.#value[this.#value.length - 1])) {
      return null
    }

    this.result()

    let temp = Number(this.#memo) + Number(this.#value)

    if (Number.isInteger(temp)) this.#memo = String(temp)
    else this.#memo = this.#cutNumber(temp)

    this.outputMemo()
  }

  static memoSub = () => {
    if (isNaN(this.#value[this.#value.length - 1])) {
      return null
    }

    this.result()

    let temp = Number(this.#memo) - Number(this.#value)

    if (Number.isInteger(temp)) this.#memo = String(temp)
    else this.#memo = this.#cutNumber(temp)

    this.outputMemo()
  }

  static memoRead = () => {
    if (this.#memo === '') {
      return null
    } else if (
      this.#value[this.#value.length - 1] === '-' &&
      Number(this.#memo) < 0
    ) {
      return null
    } else if (
      !isNaN(this.#value[this.#value.length - 1]) ||
      this.#value[this.#value.length - 1] === '.'
    ) {
      this.#value = this.#memo
    } else {
      this.#value = this.#value.concat(this.#memo)
    }

    this.#output()
  }

  static memoReset = () => {
    this.#memo = ''
    this.outputMemo()
  }
}

window.calc = Calc

// Calc.init()

window.addEventListener('keydown', (e) => {
  // if (e.code === 'Numpad1' || e.code === 'Digit1')
  //   Calc.add(1)
  // if (e.code === 'Numpad2' || e.code === 'Digit2')
  //   Calc.add(2)
  // if (e.code === 'Numpad3' || e.code === 'Digit3')
  //   Calc.add(3)
  // if (e.code === 'Numpad4' || e.code === 'Digit4')
  //   Calc.add(4)
  // if (e.code === 'Numpad5' || e.code === 'Digit5')
  //   Calc.add(5)
  // if (e.code === 'Numpad6' || e.code === 'Digit6')
  //   Calc.add(6)
  // if (e.code === 'Numpad7' || e.code === 'Digit7')
  //   Calc.add(7)

  // if (e.code === 'Numpad8') Calc.add(8)
  // if (e.code === 'Digit8') {
  //   if (e.shiftKey) Calc.op('*')
  //   else Calc.add(8)
  // }

  // if (e.code === 'Numpad9' || e.code === 'Digit9')
  //   Calc.add(9)
  // if (e.code === 'Numpad0' || e.code === 'Digit0')
  //   Calc.add(0)

  // if (e.code === 'NumpadSubtract') Calc.op('-')
  // if (e.code === 'NumpadAdd') Calc.op('+')
  // if (e.code === 'NumpadMultiply') Calc.op('*')
  // if (e.code === 'NumpadDivide' || e.code === 'Slash')
  //   Calc.op('/')

  // if (e.code === 'NumpadEnter' || e.code === 'Enter')
  //   Calc.result()

  // if (e.code === 'Equal') {
  //   if (e.shiftKey) Calc.op('+')
  //   else Calc.result()
  // }

  // if (e.code === 'Minus') Calc.op('-')

  // if (e.code === 'NumpadDecimal' || e.code === 'Period')
  //   Calc.dot()
  // if (e.code === 'Delete') Calc.reset()
  // if (e.code === 'Backspace') Calc.del()

  // memo -------------------------------------------------------
  if (e.code === 'KeyM') {
    if (e.shiftKey) Calc.memoAdd()
    else if (e.ctrlKey) Calc.memoSub()
    else if (e.altKey) Calc.memoReset()
    else Calc.memoRead()
  }

  // new  -------------------------------------------------------
  if (e.code === 'Numpad1') {
    Calc.add(1)
  } else if (e.code === 'Digit1') {
    Calc.add(1)
  } else if (e.code === 'Numpad2') {
    Calc.add(2)
  } else if (e.code === 'Digit2') {
    Calc.add(2)
  } else if (e.code === 'Numpad3') {
    Calc.add(3)
  } else if (e.code === 'Digit3') {
    Calc.add(3)
  } else if (e.code === 'Numpad4') {
    Calc.add(4)
  } else if (e.code === 'Digit4') {
    Calc.add(4)
  } else if (e.code === 'Numpad5') {
    Calc.add(5)
  } else if (e.code === 'Digit5') {
    Calc.add(5)
  } else if (e.code === 'Numpad6') {
    Calc.add(6)
  } else if (e.code === 'Digit6') {
    Calc.add(6)
  } else if (e.code === 'Numpad7') {
    Calc.add(7)
  } else if (e.code === 'Digit7') {
    Calc.add(7)
  } else if (e.code === 'Numpad8') {
    Calc.add(8)
  } else if (e.code === 'Digit8') {
    if (e.shiftKey) Calc.op('*')
    else Calc.add(8)
  } else if (e.code === 'Numpad9') {
    Calc.add(9)
  } else if (e.code === 'Digit9') {
    Calc.add(9)
  } else if (e.code === 'Numpad0') {
    Calc.add(0)
  } else if (e.code === 'Digit0') {
    Calc.add(0)
  } else if (e.code === 'NumpadSubtract') {
    Calc.op('-')
  } else if (e.code === 'NumpadAdd') {
    Calc.op('+')
  } else if (e.code === 'NumpadMultiply') {
    Calc.op('*')
  } else if (e.code === 'NumpadDivide') {
    Calc.op('/')
  } else if (e.code === 'Slash') {
    Calc.op('/')
  } else if (e.code === 'NumpadEnter') {
    Calc.result()
  } else if (e.code === 'Enter') {
    Calc.result()
  } else if (e.code === 'Equal') {
    if (e.shiftKey) Calc.op('+')
    else Calc.result()
  } else if (e.code === 'Minus') {
    Calc.op('-')
  } else if (e.code === 'NumpadDecimal') {
    Calc.dot()
  } else if (e.code === 'Period') {
    Calc.dot()
  } else if (e.code === 'Delete') {
    Calc.reset()
  } else if (e.code === 'Backspace') {
    Calc.del()
  }
})
