import { AppState } from '../AppState'
import { api } from './AxiosService'
class NotesService {
  async getNotesByBugId(bugId) {
    const res = await api.get(`api/bugs/${bugId}/notes`)
    AppState.notes = res.data
  }

  async createNote(newNote, id) {
    await api.post('api/notes/', newNote)
    this.getNotesByBugId(id)
  }

  async deleteNote(id, bugId) {
    await api.delete(`api/notes/${id}`)
    this.getNotesByBugId(bugId)
  }
}

export const notesService = new NotesService()
