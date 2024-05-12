'use client'


import { Training } from '@/components/training/Training'
import { TrainingForm } from '@/components/training/TrainingForm'
import { EditTrainingForm } from '@/components/training/EditTrainingForm'
import styles from 'styled-components'
import { useEffect, useState } from 'react'

import {
  useDeleteTraining,
  useAddTraining,
  useToggleCompletion,
  useGetTraining,
} from '@/services/hooks/useTraining'
import { clearItemsFromIDB, getItemsFromIDB, saveItemToIDB } from '@/public/idb'


const TrainingWrapperStyled = styles.div`
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

function TrainingWrapper({ userData }) {
  
  const { deleteTrainingMutation } = useDeleteTraining()
  const { addTrainingMutation } = useAddTraining()
  const { toggleCompletionMutation } = useToggleCompletion()
  const { data: fetchTraining, isLoading } = useGetTraining()
  const [training, setTraining] = useState()
  const [dbTraining,setDbTraining] = useState()
 const [dbData,setDBData] = useState()
  

//  useEffect(()=>{
// function save(id,status,task){
// console.log({id:{status,task}})
//   saveTrainingToIDB({id,status,task})
// }
// save(id,status,task)
//  },[])
  

  // useEffect(() => {
  //   const fetchData = () => {
  //     try {
        
  //         setDBData(getItemsFromIDB('notes'))
        
  //     } catch (error) {
  //       console.log("TrainingWrapper ERROR: ",error)
  //     }
     
  //     if (!isLoading && fetchTraining && fetchTraining.length > 0) {
  //       console.log("fetchTraining done loading: ", fetchTraining);
  //       setTraining(fetchTraining)
  //       clearItemsFromIDB('training')
  //       // fetchTraining.forEach(course => saveItemToIDB('training',{...course}))
  //       // saveTrainingToIDB(...fetchTraining)
  //     }else if (dbData && dbData.length>0) {
  //       console.log('dbData: ',Array.from(dbData))
  //       setTraining(dbData)
  //       return;
  //     } else {
  //       setTraining([]);
  //     }
  //   };

  //   fetchData();
  // }, [isLoading]);

  const editTask = (task, id) => {
    setTraining(
      training.map(course =>
        course.id === id ? { ...course, task, isEditing: !course.isEditing } : course
      )
    )
  }

  return (
    <TrainingWrapperStyled>
      {userData ? (
        <h1> Welcome back, {userData[0].firstName}! </h1>
      ) : (
        <h1> Welcome to training 3.0! </h1>
      )}
      <TrainingForm addTraining={addTrainingMutation} />

      {!Array.isArray(training)?(<SpinnerContainer>
        Loading data...
      </SpinnerContainer> ) : 
        training
          .sort((a, b) => {
          return(a.priority - b.priority)
          })
          .map(course =>
            course.editing ? (
              <EditTrainingForm
                editTraining={editTask}
                task={course.title}
                id={course.id}
              />
            ) : (
              Array.isArray(training) && (
                <Training
                  id={course.id}
                  key={course.id}
                  task={course.title}
                  status={course.completed}
                  deleteTraining={deleteTrainingMutation}
                  toggleCompletion={toggleCompletionMutation}
                  course={course}
                />
              )
            )
          )}
      {!Array.isArray(training) || (training.length === 0 && <p>No tasks yet</p>)}
    </TrainingWrapperStyled>
  )
}

export default TrainingWrapper

