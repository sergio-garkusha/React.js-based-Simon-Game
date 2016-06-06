import React from 'react'
import Controls from './Controls'
import Rows from './Sectors/Rows'
import GameSettings from './GameSettings'

class Playground extends React.Component {

  render () {
    const s = this.props.state.state
    const p = this.props.state

    return (
      <section className='playground'>
        <Rows
          game={s}
          cells={[1,2,3,4]}
          acts={{
            inputHumapStep: p.inputHumapStep
          }}
        />
        <Controls
          game={s}
          acts={{
            switchSimon: p.switchSimon,
            startSimon: p.startSimon,
            toggleStrict: p.toggleStrict
          }}
        />
        <GameSettings
          sets={s.STEPS_QTY}
          sounds={s.sounds}
          stats={s.total_score}
          acts={{
            setStepsQty: p.setStepsQty,
            toggleGameSounds: p.toggleGameSounds
          }}
        />
      </section>
    )
  }

}

export default Playground
