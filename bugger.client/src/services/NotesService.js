import { AppState } from '../AppState'
import { api } from './AxiosService'
class NotesService {
  async getNotesByBugId(bugId) {
    const res = await api.get(`api/bugs/${bugId}/notes`)
    AppState.notes = res.data
    console.log(res.data)
  }

  async createNote(newNote, id) {
    await api.post('api/notes/', newNote)
    this.getNotesByBugId(id)
  }

//   async deleteNote(activeNote, bugId) {
//     await api.delete(`api/bugs/${bugId}`)
//     if (activeNote.closed === false) {
//       AppState.activeNote.closed = true
//     } else {
//       Notification.toast('BUG CLOSED')
//     }
//   }
}

export const notesService = new NotesService()
