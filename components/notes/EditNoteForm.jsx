import React, { useState } from 'react'

export const EditNoteForm = ({ editNote, task }) => {
  const [value, setValue] = useState(task.task)

  const handleSubmit = e => {
    // prevent default action
    e.preventDefault()
    // edit note
    editNote(value, task.id)
  }
  return (
    <form onSubmit={handleSubmit} className='NoteForm'>
      <input
        type='text'
        value={value}
        onChange={e => setValue(e.target.value)}
        className='note-input'
        placeholder='Update task'
      />
      <button type='submit' className='note-btn'>
        Add Task
      </button>
    </form>
  )
}
