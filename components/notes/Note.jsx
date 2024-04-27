'use client'
import React,{useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { styled } from 'styled-components'
import { saveNoteToIDB } from '@/utils/idb'

const StyledNote = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${props => props.color || '#8758ff'};
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
  & p {
      margin-left: 1.25rem;
      width:75%
  }
`


export const Note = ({
  id,
  task,
  status,
  deleteNote,
  toggleCompletion,
  color,
  priority,
  editNote,
}) => {


   

  return (

    <StyledNote
      color={color}
      className={`${status ? 'completed' : 'incomplete'}`}
      key={priority}
    >
    
      <p
        // className={`${status ? 'completed' : 'incomplete'}`}
        onClick={() => {
          let updateStatus = !status
          let type = 'toggleCompletion'
          toggleCompletion({ id, updateStatus, type })
        }}
      >
        {task}
      </p>
      <div >
        <FontAwesomeIcon
          className='edit-icon'
          icon={faPenToSquare}
          onClick={() => {
            let type = 'editNote'
            toggleCompletion({ id, type })
          }}
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
