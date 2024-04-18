'use client'

import { useState } from 'react'
import { Note } from './Note'
import { NoteForm } from './NoteForm'
import { EditNoteForm } from './EditNoteForm'
import styles from 'styled-components'
import { queryKeys } from '@/services/constants'
import { useQuery } from '@tanstack/react-query'
import { getAllNotes } from '@/pages/api/newNotesApi'

import { getNotes, ssrNotes } from '@/pages/api/notesApi'
// import { deleteNote, addNote, toggleCompletion } from '@/services/api/notesApi'

import {
  useDeleteNote,
  useAddNote,
  // useToggleCompletion,
  useGetNotes,
  useGetAllNotes,
} from '@/services/hooks/useNote'
import {
  // useDeleteNote,
  useToggleCompletion,
} from '@/services/hooks/useNoteTraditional'

const NoteWrapperStyled = styles.div`
  background: #1a1a40;
  margin-top: 5rem;
  padding: 2rem;
  border-radius: 5px;
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

const NoteWrapperCopy = ({ dehydrationState, data2, userData, cat }) => {
  // const { data: getAllNotes } = useGetAllNotes()
  const notes = data2
  notes && console.log('Where are my notes?', notes)

  const { deleteNoteMutation } = useDeleteNote()
  const { addNoteMutation } = useAddNote()
  const { toggleCompletionMutation } = useToggleCompletion()

  const testData = useQuery({
    queryKey: [queryKeys.getAllNotes],
    queryFn: getAllNotes,
  })
  console.log('Cat:', cat)
  // const { data: notes } = useQuery({
  //   queryKey: [queryKeys.allNotes],
  //   queryFn: getNotes,
  // })

  // ### Working with useGetNotes ###

  // const { data: notes } = useQuery({
  //   queryKey: [queryKeys.allNotes],
  //   queryFn: () => fetchAPI('/api/notes', 'GET'),
  // })

  // if (dehydrationState) {
  //   console.log('clientSide: ', dehydrationState)
  // }
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
        <h1> Welcome back, {userData[0]?.firstName}! </h1>
      ) : (
        <h1> Welcome to Notes 3.0! </h1>
      )}
      <NoteForm addNote={addNoteMutation} />
      {/* display notes */}

      {notes
        ? notes.map(note =>
            note.isEditing ? (
              <EditNoteForm editNote={editTask} task={note} />
            ) : (
              <Note
                id={note.id}
                key={note.id}
                task={note.title}
                status={note.completed}
                deleteNote={deleteNoteMutation}
                editNote={editNote}
                toggleCompletion={toggleCompletionMutation}
              />
            )
          )
        : 'Finding your notes...'}
      {notes && notes.length === 0 && <p>No tasks yet</p>}
    </NoteWrapperStyled>
  )
}

export default NoteWrapperCopy
