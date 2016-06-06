import React from 'react'
import Cell from './Cell'

class Rows extends React.Component {

  render () {
    const p = this.props
    let result = p.cells.map(el => {
      const current = (p.game.current_sector == el) ? true : false
      const blocked = p.game.is_sectors_blocked

      return <Cell blocked={blocked} current={current} id={el} act={p.acts.inputHumapStep} />
    })

    return (
      <div>
        <ul className='row'>
          {result[0]}
          {result[1]}
        </ul>
        <ul className='row'>
          {result[2]}
          {result[3]}
        </ul>
      </div>
    )
  }
}

export default Rows
