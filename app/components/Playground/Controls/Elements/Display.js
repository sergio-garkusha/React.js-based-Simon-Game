import React from 'react'

class Display extends React.Component {

  render () {
    const p = this.props

    let cls = p.started ? 'on' : 'off'
    let stepQuantity = (p.step.length) ? p.step.length : '--'

    if (p.wrong) stepQuantity = '!!'
    if (typeof stepQuantity == 'number' && stepQuantity < 10) stepQuantity = '0' + stepQuantity

    if (p.win) stepQuantity = 'win'
    if (!p.switch) stepQuantity = false
    if (p.wrong || p.counter) cls = cls + ' blink'

    return <li className={cls}><span id='display'>{stepQuantity}</span></li>
  }

}

export default Display
