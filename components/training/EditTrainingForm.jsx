import React, { useState } from 'react'
import styled from 'styled-components'
import { Training } from './Training'
import { useToggleCompletion } from '@/services/hooks/useTraining'

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

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const TrainingButton = styled.button`
  text-align: center;
  background: ${props => props.color || '#ec2020'};
  border: 1px solid rgba(255,255,255,.9);
  color: #fff;
  /* border: none; */
  padding: 0.55rem;
  cursor: pointer;
  width: 45%;
  margin: 0.5rem 2rem 2rem 0.5rem;
  /* margin-bottom: 2rem; */
  border-radius: 10px;

  &:hover {
    background-color: ${props => props.hover ||'rgba(236, 32, 3, 0.8)'};
  }
  &:active {
    transform: scale(0.95);
    background-color: ${props=>props.hover  ||' rgba(151, 22, 24, 0.9)'};
    border: 2px solid rgba(255,255,255,.4);
  }
`
const EditTrainingContainer = styled.div`
  margin-top: 4rem;
`

export const EditTrainingForm = ({ task, id }) => {
  const { toggleCompletionMutation } = useToggleCompletion()
  const [value, setValue] = useState(task)

  const handleSubmit = e => {
  
    e.preventDefault()
    toggleCompletionMutation({
      id: id,
      title: value,
      type: 'updateEdit',
      editing: false,
    })
    // edit Training
    // editTraining(value, task.id)
  }
  const handleClick = e => {
    e.preventDefault()
    console.log('clicked')
  }

  return (
    <>
      <EditTrainingContainer>
        <Training task={task} id={id} color='skyBlue' />
        <form onSubmit={handleSubmit} className='TrainingForm'>
          <TrainingInput
            id={id}
            type='text'
            value={value}
            onChange={e => setValue(e.target.value)}
            className='Training-input'
            placeholder='Update task'
          />
          <ButtonContainer>
            <TrainingButton type='submit' color={'green'} hover={'darkgreen'}>
              Update Training
            </TrainingButton>
            <TrainingButton
              onClick={() => {
                toggleCompletionMutation({
                  id,
                  editing: false,
                  type: 'cancelEdit',
                })
              }}
            >
              Cancel
            </TrainingButton>
          </ButtonContainer>
        </form>
      </EditTrainingContainer>
    </>
  )
}
