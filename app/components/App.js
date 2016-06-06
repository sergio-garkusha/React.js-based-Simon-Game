import React, { PropTypes } from 'react'
import Playground from './Playground'

class App extends React.Component {

  constructor (props) {
    super(props)

    this.winTimeout = false
    this.waitTimeout = false
    this.startTimeout = false
    this.wrongTimeout = false
    this.showInterval = false
    this.blinkTimeout = false
    this.currentSectorTimeout = false
    this.showStepsAgainTimeout = false

    this.initialState = {
      STEPS_QTY:     20,
      total_score:   0,
      sounds:        true,
      is_switched:   false,
      is_strict:     false,
      is_started:    false,
      is_waiting:    false,
      wait_timer:    5000,
      is_winner:     false,
      is_wrong:      false,
      current_sector: null,
      is_sectors_blocked: true,
      blink_counter:  false,
      AISequence:    [],
      HUSequence:    []
    }

    this.state = this.initialState

    this.tone1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3')
    this.tone2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3')
    this.tone3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3')
    this.tone4 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
    this.buzz  = new Audio('https://cdn.rawgit.com/Cu7ious/React.js-based-Simon-Game/master/assets/sounds/buzz.mp3')
    this.trumpet = new Audio('https://cdn.rawgit.com/Cu7ious/React.js-based-Simon-Game/master/assets/sounds/trumpet.mp3')

    this.startSimon = this.startSimon.bind(this)
    this.setStepsQty = this.setStepsQty.bind(this)
    this.switchSimon = this.switchSimon.bind(this)
    this.toggleStrict = this.toggleStrict.bind(this)
    this.inputHumapStep = this.inputHumapStep.bind(this)
    this.toggleGameSounds = this.toggleGameSounds.bind(this)
  }

  clearAll () {
    clearTimeout(this.winTimeout)
    clearTimeout(this.waitTimeout)
    clearTimeout(this.startTimeout)
    clearTimeout(this.blinkTimeout)
    clearTimeout(this.wrongTimeout)
    clearInterval(this.showInterval)
    clearTimeout(this.currentSectorTimeout)
    clearTimeout(this.showStepsAgainTimeout)
  }

  generateRandomNum () {
    return Math.floor(Math.random() * (4 - 1 + 1)) + 1
  }

  compareArraysSequences () {
    let AI = this.state.AISequence
    let HU = this.state.HUSequence
    let size = HU.length
    AI = [].concat(AI)
    AI = AI.splice(0, size)

    console.log(AI)
    console.log(HU)

    return (AI.length == HU.length) && AI.every((el, idx) => {
      return el === HU[idx]
    })
  }

  answerToGameEvent (status) {
    switch (status) {
      case 'NEXT_STEP':
        console.log('Listening to the next step')
        clearTimeout(this.waitTimeout)
        this.setState({is_waiting: true, wait_timer: 5000, is_sectors_blocked: false})
        return
      case 'WIN_GAME':
        this.setGameScore()
        console.log('All Steps are Correct! You Win!')
        if (this.state.sounds) this.playSound('trumpet')
        clearTimeout(this.waitTimeout)
        this.setState({
          is_waiting: false,
          wait_timer: 5000,
          is_sectors_blocked: true,
          HUSequence: [],
          is_winner: true
        })
        return
      case 'NEXT_LEVEL':
        console.log('All Steps are Correct! Let\'s go to the next level')
        clearTimeout(this.waitTimeout)
        this.setState({is_waiting: false, wait_timer: 5000, is_sectors_blocked: true, HUSequence: []})
        this.goToTheNextLevel()
        return
      case 'WRONG_STEP':
        console.log('Wrong!')
        if (this.state.sounds) this.playSound('buzz')
        clearTimeout(this.waitTimeout)

        if (!this.state.is_strict) {
          this.setState({is_waiting: false, wait_timer: 5000, is_sectors_blocked: true, HUSequence: [], is_wrong: true})
          this.showStepsAgainTimeout = setTimeout(() => {
            this.setState({is_wrong: false})
            this.showStepsToHuman()
          }, 1500)
        } else {
          this.startSimon()
        }
        return
    }
  }

  inputHumapStep (item) {

    const STEPS_QTY = this.state.STEPS_QTY
    const AILength = this.state.AISequence.length

    if (this.state.sounds) this.playSound(item)

    if (AILength && AILength <= STEPS_QTY) {

      this.addStepToHUSeq(item)

      if (this.compareArraysSequences()) {
        if (AILength != this.state.HUSequence.length) {
          this.answerToGameEvent('NEXT_STEP')
        } else {
          if (AILength == STEPS_QTY) {
            this.winTimeout = setTimeout(() => {this.answerToGameEvent('WIN_GAME')}, 1000)
          } else {
            this.answerToGameEvent('NEXT_LEVEL')
          }
        }
      } else {
        this.wrongTimeout = setTimeout(() => {this.answerToGameEvent('WRONG_STEP')}, 1000)
      }
    }

  }

  addStepToHUSeq (step) {
    let arr = this.state.HUSequence
    arr.push(step)
    this.setState({HUSequence: arr})
  }

  waitForHumanResponse () {
    this.waitTimeout = setTimeout(() => {
      if (this.state.wait_timer > 0) {
        console.log(new Date(this.state.wait_timer).getSeconds())
        const tick = this.state.wait_timer - 1000
        this.setState({wait_timer: tick})
      } else {
        this.setState({is_waiting: false, wait_timer: 5000, is_sectors_blocked: true})
        this.answerToGameEvent('WRONG_STEP')
        clearTimeout(this.waitTimeout)
      }
    }, 1000)
  }

  showStepsToHuman () {
    let AIS = [].concat(this.state.AISequence)

    console.log('Showing steps to human')

    this.showInterval = setInterval(() => {
      if (AIS.length) {
        this.setState({current_sector: null})
        this.currentSectorTimeout = setTimeout(() => {
          const spliced = AIS.splice(0,1)
          if (this.state.sounds) this.playSound(spliced[0])
          this.setState({current_sector: spliced})

          switch (spliced[0]) {
            case 1: console.log('%c  ', 'background: #2B8C45'); break
            case 2: console.log('%c  ', 'background: #B9352A'); break
            case 3: console.log('%c  ', 'background: #E2A904'); break
            case 4: console.log('%c  ', 'background: #3265B9'); break
          }

        }, 500)
      } else {
        this.setState({current_sector: null})
        clearTimeout(this.currentSectorTimeout)
        clearInterval(this.showInterval)
        this.setState({is_waiting: true, is_sectors_blocked: false})
      }
    }, 1000)
  }

  toggleStrict (s) {
    this.setState({is_strict: s})

    const status = s ? 'on' : 'off'
    console.log(`Strict mode was switched ${status}`)
  }

  playSound (sound) {
    if (typeof sound == 'number') {
      this['tone' + sound].play()
    } else {
      switch (sound) {
        case 'buzz':
          setTimeout(() => {
            this.buzz.pause()
            this.buzz.currentTime = 0
          }, 500)
          this.buzz.play()
          break;
        case 'trumpet':
          this.trumpet.play()
          break;
      }
    }
  }

  startSimon () {
    this.clearAll()

    this.setState({
      HUSequence: [], AISequence: [], is_winner: false, is_waiting: false, is_wrong: false
    })

    this.startTimeout = setTimeout(() => {
      this.setState(
        Object.assign({}, this.initialState, {
          blink_counter: false,
          STEPS_QTY: this.state.STEPS_QTY,
          sounds: this.state.sounds,
          total_score: this.state.total_score,
          is_switched: this.state.is_switched,
          is_strict: this.state.is_strict,
          wait_timer: 5000,
          AISequence: [],
          HUSequence: []
        })
      )

      this.goToTheNextLevel()
    }, 3000)

    this.setState({blink_counter: true})
    console.log('Game was started/restarted')
  }

  goToTheNextLevel () {
    this.addStep(this.generateRandomNum())
  }

  addStep (item) {
    let AIS = this.state.AISequence
    AIS.push(item)
    this.setState({AISequence: AIS})
    this.showStepsToHuman()
  }

  switchSimon (s) {
    this.clearAll()
    this.setState(Object.assign({}, this.initialState, {
      is_switched: s,
      AISequence: [],
      STEPS_QTY: this.state.STEPS_QTY,
      sounds: this.state.sounds,
      total_score: this.state.total_score
    }))

    const status = s ? 'on' : 'off'
    console.log(`Game was switched ${status}`)
  }

  toggleGameSounds () {
    this.setState({sounds: !this.state.sounds})
  }

  setStepsQty (n) {
    this.setState({STEPS_QTY: n})
  }

  setGameScore () {
    this.setState({
      STEPS_QTY: this.state.STEPS_QTY,
      total_score: ++this.state.total_score
    })
  }

  componentDidUpdate () {
    clearTimeout(this.waitTimeout)
    if (this.state.is_waiting) {
      this.waitForHumanResponse()
    }
  }

  render () {
    return <Playground state={this} />
  }
}

App.propTypes = {
  game: PropTypes.object
}

export default App
