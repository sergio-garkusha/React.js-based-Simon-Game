import React from 'react'
import Display from './Elements/Display'
import StartButton from './Elements/StartButton'
import StrictButton from './Elements/StrictButton'
import Switch from './Elements/Switch'

class Controls extends React.Component {
  constructor () {
    super()
  }

  render () {
    const p = this.props

    return (
      <section className='controls'>
        <h3>Simon<sup>&#x000AE;</sup></h3>
        <nav className='firs-block'>
          <ul className='controls-row'>
            <Display
              win={p.game.is_winner} wrong={p.game.is_wrong}
              counter={p.game.blink_counter} switch={p.game.is_switched}
              started={p.game.is_started} step={p.game.AISequence}
            />
            <StartButton switch={p.game.is_switched} started={p.game.is_started} act={p.acts.startSimon} />
            <StrictButton switch={p.game.is_switched} strict={p.game.is_strict} act={p.acts.toggleStrict} />
          </ul>
          <ul className='controls-row'>
            <li>Count</li>
            <li>Start</li>
            <li>Strict</li>
          </ul>
        </nav>
        <Switch
          switch={p.game.is_switched}
          acts={{
            switchSimon: p.acts.switchSimon
          }}
        />
    </section>
    )
  }
}

export default Controls
