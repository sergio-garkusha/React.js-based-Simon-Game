import React from 'react'

class Switch extends React.Component {

  constructor() {
    super()
    this.switchSimon = this.switchSimon.bind(this)
  }

  switchSimon () {
    this.props.acts.switchSimon(!this.props.switch)
  }

  render () {
    const sw = this.props.switch ? 'on' : 'off'

    return (
      <nav className='sec-block'>
        off<span onClick={this.switchSimon} className={sw}><i></i></span>on
      </nav>
    )
  }
}

export default Switch
