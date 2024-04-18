'use client'
import { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'

const StyledButton = styled.button`
  background-color: 'transparent';
  border-radius: 1.5em;
  display: block;
  position: relative;
  width: ${props => (props.isRunning || props.isDone ? '3em' : '7.5em')};
  height: 3em;
  transition: width 0.3s ease-in-out;
  ${props =>
    (props.isRunning || props.isDone) &&
    css`
      outline: none;
      pointer-events: none;
      user-select: none;
    `}
  &:not(:disabled):active {
    transform: translateY(0.1em);
  }
`

const Text = styled.span`
  background-color: ${props => (props.isRunning ? 'transparent' : props.bg1)};
  border-radius: inherit;
  color: ${props => (props.isRunning ? 'transparent' : 'white')};
  display: inline-block;
  padding: 0.75em 1.5em;
  width: 100%;
  visibility: ${props => (props.isRunning ? 'hidden' : 'visible')};
  transition: background-color 0.15s linear, color 0.15s 0.3s ease-in-out,
    visibility 0.3s steps(1);
`

const Progress = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 3em;
  height: 3em;
  visibility: ${props =>
    props.isRunning || props.isDone ? 'visible' : 'hidden'};
  transition: visibility 0.3s 0.3s steps(1, start);
`

const Track = styled.circle`
  fill: none;
  stroke: ${props => (props.isDone ? props.bg1 : props.bg2)};
  stroke-width: ${props => (props.isRunning || props.isDone ? '8' : '24')};
  transition: stroke 0.3s, stroke-width 0.3s;
`

const Fill = styled.circle.attrs({
  cx: '24',
  cy: '24',
  r: '20',
})`
  fill: none;
  stroke: ${props => props.bg2};
  stroke-width: 8;
  transform: rotate(-90deg);
  stroke-dasharray: 125.66 125.66;
  stroke-dashoffset: ${props => (props.isRunning ? '0' : '125.66')};
  transition: stroke-dashoffset 2s 0.6s linear;
`

const Check = styled.polyline`
  fill: none;
  stroke: white;
  stroke-width: 4;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 34 34;
  stroke-dashoffset: ${props => (props.isDone ? '0' : '34')};
  transition: stroke-dashoffset 0.3s 0.3s ease-out;
`

const MorphingButton = ({ bg1, bg2, text, handleSubmit }) => {
  const [isRunning, setIsRunning] = useState(false)
  const [isDone, setIsDone] = useState(false)

  const handleClick = e => {
    handleSubmit(e)
    setIsRunning(true)
    setTimeout(() => {
      setIsRunning(false)
      setIsDone(true)
      setTimeout(() => {
        setIsDone(false)
      }, 1500)
    }, 2600)
  }

  return (
    <StyledButton
      onClick={handleClick}
      disabled={isRunning || isDone}
      isRunning={isRunning}
      isDone={isDone}
      handleSubmit={handleSubmit}
    >
      <Text
        isRunning={isRunning}
        isDone={isDone}
        type='submit'
        bg1={bg1}
        bg2={bg2}
      >
        {text}
      </Text>
      <Progress isRunning={isRunning} isDone={isDone}>
        <Track
          cx='24'
          cy='24'
          r='20'
          isRunning={isRunning}
          isDone={isDone}
          bg1={bg1}
          bg2={bg2}
        />
        <Fill cx='24' cy='24' r='20' isRunning={isRunning} />
        {isDone && <Check points='12,24 20,32 36,16' />}
      </Progress>
    </StyledButton>
  )
}

export default MorphingButton
