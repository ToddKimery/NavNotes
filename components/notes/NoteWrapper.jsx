'use client'

import { useState } from 'react'
import { Note } from './Note'
import { NoteForm } from './NoteForm'
import { EditNoteForm } from './EditNoteForm'
import styles from 'styled-components'
import { useEffect } from 'react'
// import { deleteNote, addNote, toggleCompletion } from '@/services/api/notesApi'
import { getNotes } from '@/services/api/notesApi'
import { QueryClient, useQuery } from '@tanstack/react-query'

import {
  useDeleteNote,
  useAddNote,
  useToggleCompletion,
  useGetNotes,
} from '@/services/hooks/useNoteTraditional'
import { queryKeys } from '@/services/constants'
// import { useGetNotes } from '@/services/hooks/useNote'

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

function NoteWrapper({ userData, state }) {
  console.log('state: ', state)
  const { deleteNoteMutation } = useDeleteNote()
  const { addNoteMutation } = useAddNote()
  const { toggleCompletionMutation } = useToggleCompletion()
  const { data: notes, isLoading } = useGetNotes()

  // const { data: notes, isLoading } = useQuery({
  //   queryKey: [queryKeys.allNotes],
  //   queryFn: getNotes,
  // })

  // console.log('new notes: ', notes)
  // const addNote = note => {
  //   setNotes([
  //     ...notes,
  //     { id: uuidv4(), task: note, completed: false, isEditing: false },
  //   ])
  // }

  // const deleteNote = async id => {
  //   console.log('deleteNote', id)
  //   const res = await fetch('', {
  //     method: 'DELETE',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ id }),
  //   })

  //   if (!res.ok) {
  //     throw new Error('Error deleting note')
  //   }
  // }

  const toggleComplete = id => {
    setNotes(
      notes.map(note =>
        note.id === id ? { ...note, completed: !note.completed } : note
      )
    )
  }

  const editNote = id => {
    setNotes(
      notes.map(note =>
        note.id === id ? { ...note, isEditing: !note.isEditing } : note
      )
    )
  }

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
      {/* display notes */}
      {Array.isArray(notes) &&
        notes.map(note =>
          note.isEditing ? (
            <EditNoteForm editNote={editTask} task={note} />
          ) : (
            Array.isArray(notes) && (
              <Note
                id={note.id}
                key={note.id}
                task={note.title}
                status={note.completed}
                deleteNote={deleteNoteMutation}
                editNote={editNote}
                toggleCompletion={toggleCompletionMutation}
                state={state}
              />
            )
          )
        )}
      {!Array.isArray(notes) || (notes.length === 0 && <p>No tasks yet</p>)}
      {state}
    </NoteWrapperStyled>
  )
}

export default NoteWrapper
