'use client'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { styled } from 'styled-components'

const StyledNote = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #8758ff;
  color: #fff;
  padding: 0.75rem 1rem;
  border-radius: 5px;
  margin-bottom: 1rem;
  cursor: pointer;

  &.incomplete {
    color: #fff;
  }

  &.completed {
    color: #c5aeff;
    text-decoration: line-through;
    background-color: #8f8e8e;
    color: black;
  }
`

export const Note = ({
  id,
  task,
  status,
  deleteNote,
  editNote,
  toggleCompletion,
  state,
}) => {
  console.log('from Note.jsx: ', status)
  console.log('state from Note.jsx: ', state)
  return (
    <StyledNote className={`${status ? 'completed' : 'incomplete'}`}>
      <p
        // className={`${status ? 'completed' : 'incomplete'}`}
        onClick={() => {
          console.log('from Note.jsx: ', !status)
          let updateStatus = !status
          toggleCompletion({ id, updateStatus })
        }}
      >
        {task}
      </p>
      <div>
        <FontAwesomeIcon
          className='edit-icon'
          icon={faPenToSquare}
          onClick={() => editNote(key)}
        />
        <FontAwesomeIcon
          className='delete-icon'
          icon={faTrash}
          onClick={() => deleteNote(id)}
        />
      </div>
    </StyledNote>
  )
}
