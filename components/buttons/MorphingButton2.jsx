import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'

// Define CSS Variables within Styled Components
const colors = {
  hue: 223,
  get bg1() {
    return `hsl(${this.hue}, 10%, 90%)`
  },
  get bg2() {
    return `hsl(${this.hue}, 10%, 80%)`
  },
  get fg1() {
    return `hsl(${this.hue}, 10%, 10%)`
  },
  get fg2() {
    return `hsl(${this.hue}, 10%, 20%)`
  },
  get primary1() {
    return `hsl(${this.hue}, 90%, 55%)`
  },
  get primary2() {
    return `hsl(${this.hue}, 90%, 45%)`
  },
}

const Button = styled.button`
  background-color: red;
  /* background-color: red; */
  border-radius: 1.5em;
  display: block;
  position: relative;
  width: ${props => (props.running || props.done ? '3em' : '7.5em')};
  height: 3em;
  transition: width 0.3s ease-in-out;
  outline: none;
  pointer-events: ${props => (props.running || props.done ? 'none' : 'auto')};
  user-select: none;

  &:not(:disabled):active {
    transform: translateY(0.1em);
  }

  ${({ running, done }) =>
    running || done
      ? css`
          pointer-events: none;
          user-select: none;
        `
      : ''}
`

const ButtonText = styled.span`
  background-color: ${props => (props.running ? colors.bg2 : colors.primary1)};
  border-radius: inherit;
  color: ${props => (props.running || props.done ? 'red' : 'hsl(0, 0%, 100%)')};
  display: inline-block;
  padding: 0.75em 1.5em;
  transition: background-color 0.15s linear, color 0.15s 0.3s ease-in-out;
  width: 100%;
  visibility: ${props => (props.running ? 'hidden' : 'visible')};
`

const Progress = styled.svg`
  overflow: visible;
  position: absolute;
  top: 0;
  left: 0;
  width: 3em;
  height: 3em;
  visibility: ${props => (props.running || props.done ? 'visible' : 'hidden')};
`

const Circle = styled.circle`
  fill: none;
  stroke: ${props => (props.done ? colors.primary1 : colors.bg2)};
  stroke-width: ${props => (props.done || props.running ? '8' : '24')};
  r: ${props => (props.done || props.running ? '20' : '12')};
  transition: r 0.3s ease-in-out, stroke-width 0.3s ease-in-out,
    stroke-dashoffset 2s 0.6s linear;
`

const Polyline = styled.polyline`
  fill: none;
  stroke: hsl(0, 0%, 100%);
  stroke-width: 4;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 34 34;
  stroke-dashoffset: ${props => (props.done ? '0' : '34')};
  transition: stroke-dashoffset 0.3s 0.3s ease-out;
`

const MorphingButton2 = () => {
  const [buttonState, setButtonState] = useState('idle')

  useEffect(() => {
    let doneTimeout, resetTimeout

    if (buttonState === 'running') {
      doneTimeout = setTimeout(() => {
        setButtonState('done')

        resetTimeout = setTimeout(() => {
          setButtonState('idle')
        }, 1500)
      }, 2600) // 600 ms delay + 2000 ms duration

      return () => {
        clearTimeout(doneTimeout)
        clearTimeout(resetTimeout)
      }
    }
  }, [buttonState])

  const handleClick = () => {
    setButtonState('running')
  }

  return (
    <Button
      disabled={buttonState !== 'idle'}
      running={buttonState === 'running'}
      done={buttonState === 'done'}
      onClick={handleClick}
    >
      <ButtonText
        running={buttonState === 'running'}
        done={buttonState === 'done'}
      >
        Submit
      </ButtonText>
      <Progress
        running={buttonState === 'running'}
        done={buttonState === 'done'}
      >
        <Circle
          className='btn__progress-track'
          cx='24'
          cy='24'
          done={buttonState === 'done'}
          running={buttonState === 'running'}
        />
        <Circle
          className='btn__progress-fill'
          cx='24'
          cy='24'
          done={buttonState === 'done'}
          running={buttonState === 'running'}
        />
        <Polyline
          className='btn__progress-check'
          points='12,24 20,32 36,16'
          done={buttonState === 'done'}
        />
      </Progress>
    </Button>
  )
}

export default MorphingButton2
