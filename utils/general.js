
import { openDB } from 'idb'
import { createClient } from '@/utils/supabase/server'
import {deleteDatabase} from '@/public/idb'


export const signOut = async () => {
  'use server'

  const supabase = createClient()
  await supabase.auth.signOut()

  // Delete Databases
  
     try {
    await deleteDatabase(databaseName)
  } catch (error) { console.error('Error clearing IDB: ', error) }

  return redirect('/')
  }
