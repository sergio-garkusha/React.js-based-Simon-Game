import React from 'react'

class GameSettings extends React.Component {

  setStepsQty (e) {
    this.props.acts.setStepsQty(e.target.value)
  }

  toggleGameSounds () {
    this.props.acts.toggleGameSounds()
  }

  render () {
    const p = this.props
    const sounds = p.sounds ? 'on' : 'off'
    const steps = p.sets < 10 ? `0${p.sets}` : p.sets

    return (
      <section className='game-settings'>
        <h3>Game Sets & Stats</h3>
        <ul>
          <li>Steps: {steps}</li>
          <li>
            <input
              type='range'
              min='4'
              step='1'
              max='20'
              onChange={this.setStepsQty.bind(this)}
              value={p.STEPS_QTY}
            />
          </li>
        </ul>
        <ul>
          <li>Score: {p.stats}</li>
        </ul>
        <ul>
          <li>Sound: <span onClick={this.toggleGameSounds.bind(this)}>{sounds}</span></li>
        </ul>
      </section>
    )
  }

}

export default GameSettings
