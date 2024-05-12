'use client'
import { Note } from './Note'
import { NoteForm } from './NoteForm'
import { EditNoteForm } from './EditNoteForm'
import styles from 'styled-components'
import { useEffect, useState } from 'react'

import {
  useDeleteNote,
  useAddNote,
  useToggleCompletion,
  useGetNotes,
} from '@/services/hooks/useNoteTraditional'
import { clearItemsFromIDB, getItemsFromIDB, saveItemToIDB } from '@/public/idb.js'


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
    text-align: left;
    font-style: italic;
  }
`

const SpinnerContainer = styles.div`
  display: flex;
  align-contents: center;
  justify-content: center;
  width: 100%;
  height: 60%;
  `

function NoteWrapper({ userData }) {
  
  const { deleteNoteMutation } = useDeleteNote()
  const { addNoteMutation } = useAddNote()
  const { toggleCompletionMutation } = useToggleCompletion()
  const { data: fetchNotes, isLoading } = useGetNotes()
  const [notes, setNotes] = useState()
  const [dbNotes,setDbNotes] = useState()
  const [dbData,setDBData] = useState()

  

//  useEffect(()=>{
// function save(id,status,task){
// console.log({id:{status,task}})
//   saveNoteToIDB({id,status,task})
// }
// save(id,status,task)
//  },[])
  

  // useEffect(() => {
  //   const fetchData = () => {
  //     try {
        
  //        setDBData(getItemsFromIDB('notes'))
        
        
  //     } catch (error) {
  //       console.log("NoteWrapper ERROR: ",error)
  //     }
     
  //     if (!isLoading) {
  //       // console.log("fetchNotes done loading: ", fetchNotes);
  //       setNotes(fetchNotes)
  //       clearItemsFromIDB('notes')
  //       notes.forEach((note,index) => saveItemToIDB('notes',{...note}))
  //       // saveNoteToIDB(...fetchNotes)
  //     }else if (dbData && dbData.length>0) {
  //       console.log('dbData: ',Array.from(dbData))
  //       setNotes(dbData)
  //       return;
  //     } else {
  //       setNotes([]);
  //     }
  //   };

  //   fetchData();
  // }, [isLoading]);

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

      {!Array.isArray(notes)?(<SpinnerContainer>
        Loading data...
      </SpinnerContainer> ) : 
        notes
          .sort((a, b) => {
          return(a.priority - b.priority)
          })
          .map(note =>
            note.editing ? (
              <EditNoteForm
                editNote={editTask}
                task={note.title}
                id={note.id}
                key={note.id}
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
                  note={note}
                />
              )
            )
          )}
      {!Array.isArray(notes) || (notes.length === 0 && <p>No tasks yet</p>)}
    </NoteWrapperStyled>
  )
}

export default NoteWrapper

