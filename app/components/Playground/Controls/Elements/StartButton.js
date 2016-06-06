import React from 'react'

class StartButton extends React.Component {
  constructor () {
    super()
    this.pressStart = this.pressStart.bind(this)
  }

  pressStart () {
    const p = this.props
    if (p.switch) {
      p.act()
    }
  }

  render () {
    return <li><button onClick={this.pressStart} id='start'></button></li>
  }
}

export default StartButton
