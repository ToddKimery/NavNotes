import { getAllNotes } from '@/pages/api/notesApi'
import { toggleCompletion } from './api/notesApi'

export const queryKeys = {
  allNotes: 'allNotes',
  ssrNotes: 'ssrNotes',
  deleteNote: 'deleteNote',
  addNote: 'addNote',
  toggleCompletion: 'toggleCompletion',
  getAllNotes: 'getAllNotes',
  subscribed: 'subscribed',
}
