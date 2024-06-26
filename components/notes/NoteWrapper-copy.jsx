'use client'

import { useState } from 'react'
import { Note } from './Note'
import { NoteForm } from './NoteForm'
import { EditNoteForm } from './EditNoteForm'
import styles from 'styled-components'

import {
  useDeleteNote,
  useAddNote,
  useToggleCompletion,
  useGetNotes,
} from '@/services/hooks/useNoteTraditional'


const NoteWrapperStyled = styles.div`
  background: #1a1a40;
  margin-top: 5rem;
  padding: 2rem;
  border-radius: 5px;
  min-width:45vw;
  & h1 {
      color: #fff;
  margin-bottom: 0.5rem;
  font-size: 1.75rem;
  text-align:center;
  }
  & p{
    text-align: center;
    font-style: italic;
  }
`

function NoteWrapper({ userData }) {
  const { deleteNoteMutation } = useDeleteNote()
  const { addNoteMutation } = useAddNote()
  const { toggleCompletionMutation } = useToggleCompletion()
  const { data: notes, isLoading } = useGetNotes()

  const editTask = (task, id) => {
    setNotes(
      notes.map(note =>
        note.id === id ? { ...note, task, isEditing: !note.isEditing } : note
      )
    )
  }

  return (
    <NoteWrapperStyled>
      {userData ? (
        <h1> Welcome back, {userData[0].firstName}! </h1>
      ) : (
        <h1> Welcome to Notes 3.0! </h1>
      )}
      <NoteForm addNote={addNoteMutation} />

      {Array.isArray(notes) &&
        notes
          .sort((a, b) => {
            console.log('a', a.priority, 'b', b.priority)
            return a.priority - b.priority
          })
          .map(note =>
            note.editing ? (
              <EditNoteForm
                editNote={editTask}
                task={note.title}
                id={note.id}
              />
            ) : (
              Array.isArray(notes) && (
                <Note
                  id={note.id}
                  key={note.id}
                  task={note.title}
                  status={note.completed}
                  deleteNote={deleteNoteMutation}
                  toggleCompletion={toggleCompletionMutation}
                />
              )
            )
          )}
      {!Array.isArray(notes) || (notes.length === 0 && <p>No tasks yet</p>)}
    </NoteWrapperStyled>
  )
}

export default NoteWrapper
