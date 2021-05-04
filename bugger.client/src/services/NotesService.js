
import { api } from './AxiosService'
class NotesService {
//   async getAllNotes() {
//     try {
//       const res = await api.get('api/bugs')
//       AppState.bugs = res.data
//     } catch (error) {
//       Notification.toast('ERROR LOADING BUGS')
//     }
//   }

  async createNote(newNote, id) {
    await api.post('api/notes/', newNote)
    this.getAllNotes(id)
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
