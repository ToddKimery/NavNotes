import React, { useState } from 'react'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'


const TrainingFormStyled = styled.form`
  width: 100%;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const TrainingInput = styled.input`
  outline: none;
  background: none;
  border: 1px solid #8758ff;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  width: 100%;
  color: #fff;

  &::placeholder {
    color: #ffffff4d;
    padding: 0.5rem 1rem;
    text-align: center;
  }
`

const TrainingButton = styled.button`
  background: #ec2020;
  color: #fff;
  border: none;
  padding: 0.55rem;
  cursor: pointer;
  width: 50%;
  margin-bottom: 2rem;
  border-radius: 10px;

  &:hover {
    background-color: rgba(236, 32, 3, 0.8);
  }
  &:active {
    background-color: rgba(151, 22, 24, 0.9);
    border: 1px solid #000;
  }
`

export const TrainingForm = ({ addTraining }) => {
  const [course, setTraining] = useState({
    id: '',
    message: '',
    completed: false,
    isEditing: false,
  })

  const handleChange = e => {
    setTraining(prev => ({
      ...prev,
      message: e.target.value,
    }))
  }

  const handleSubmit = e => {
    // prevent default action
    e.preventDefault()
    if (course.message !== '') {
      course.id = uuidv4()
      addTraining(course)
      // clear form after submission
    }
    setTraining({
      id: '',
      message: '',
      completed: false,
      isEditing: false,
    })
  }

  return (
    <TrainingFormStyled onSubmit={handleSubmit}>
      <TrainingInput
        type='text'
        value={course.message}
        onChange={e => handleChange(e)}
        placeholder='What is the task today?'
      />
      <TrainingButton type='submit'>Add Task</TrainingButton>
      {/* <MorphingButton
        type='submit'
        bg2={'rgba(151, 22, 24, 0.9)'}
        bg1={'rgba(236, 32, 3, 0.8)'}
        text={'Add Training'}
        handleSubmit={handleSubmit}
      /> */}
    </TrainingFormStyled>
  )
}
