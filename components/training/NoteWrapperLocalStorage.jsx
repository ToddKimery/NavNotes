import { useState, useEffect } from 'react'
import { NoteForm } from './NoteForm'
import { v4 as uuidv4 } from 'uuid'
import { Note } from './Note'
import { EditNoteForm } from './EditNoteForm'
uuidv4()

export const NoteWrapperLocalStorage = () => {
  const [notes, setNotes] = useState()

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || []
    setNotes(savedNotes)
  }, [])

  const addNote = note => {
    const newNotes = [
      ...notes,
      { id: uuidv4(), task: note, completed: false, isEditing: false },
    ]
    setNotes(newNotes)
    localStorage.setItem('notes', JSON.stringify(newNotes))
  }

  const toggleComplete = id => {
    const newNotes = notes.map(note =>
      note.id === id ? { ...note, completed: !note.completed } : note
    )
    setNotes(newNotes)
    localStorage.setItem('notes', JSON.stringify(newNotes))
  }

  const deleteNote = id => {
    const newNotes = notes.filter(note => note.id !== id)
    setNotes(newNotes)
    localStorage.setItem('notes', JSON.stringify(newNotes))
  }

  const editNote = id => {
    setNotes(
      notes.map(note =>
        note.id === id ? { ...note, isEditing: !note.isEditing } : note
      )
    )
  }

  const editTask = (task, id) => {
    const newNotes = notes.map(note =>
      note.id === id ? { ...note, task, isEditing: !note.isEditing } : note
    )
    setNotes(newNotes)
    localStorage.setItem('notes', JSON.stringify(newNotes))
  }
  return (
    <div className='NoteWrapper'>
      <h1>Get Things Done!</h1>
      <NoteForm addNote={addNote} />
      {notes.map((note, index) =>
        note.isEditing ? (
          <EditNoteForm editNote={editTask} task={note} />
        ) : (
          <Note
            task={note}
            key={index}
            toggleComplete={toggleComplete}
            deleteNote={deleteNote}
            editNote={editNote}
          />
        )
      )}
    </div>
  )
}
