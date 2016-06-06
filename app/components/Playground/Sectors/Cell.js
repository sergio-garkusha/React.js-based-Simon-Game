import React from 'react'

class Cell extends React.Component {
  constructor () {
    super()
    this.inputHumapStep = this.inputHumapStep.bind(this)
  }

  inputHumapStep () {
    this.props.act(this.props.id)
  }

  render () {
    const p = this.props
    let on = p.current ? 'on' : 'off'

    if (!p.blocked) {
      return <li className={on} onClick={this.inputHumapStep} id={`cell-${p.id}`}></li>
    } else {
      on = on + ' blocked'
      return <li className={on} id={`cell-${p.id}`}></li>
    }
  }
}

export default Cell
