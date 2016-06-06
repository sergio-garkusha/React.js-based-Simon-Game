import React from 'react'

class StrictButton extends React.Component {
  constructor () {
    super()
    this.toggleStrict = this.toggleStrict.bind(this)
  }

  toggleStrict () {
    if (this.props.switch) {
      this.props.act(!this.props.strict)
    }
  }

  render () {
    const cls = this.props.strict ? 'on' : 'off'
    return <li className={cls}><span id='strict-light'></span><button onClick={this.toggleStrict} id='strict'></button></li>
  }
}

export default StrictButton
