import { AppState } from '../AppState'
import router from '../router'
import { api } from './AxiosService'

class BugsService {
  async getAllBugs() {
    const res = await api.get('api/bugs')
    AppState.bugs = res.data
  }

  async getBugById(id) {
    const res = await api.get(`api/bugs/${id}`)
    AppState.activeBug = res.data
  }

  async getNotesByBugId(bugId) {
    const res = await api.get(`api/bugs/${bugId}/notes`)
    // NOTE you must now specify which specific object in AppState.notes is being referenced.
    AppState.notes[bugId] = res.data
  }

  async createBug(data) {
    const res = await api.post('api/bugs', data)
    AppState.bugs.push(res.data)
    router.push({ name: 'Bug', params: { id: res.data.id } })
  }

  async editBug(bugId, edit) {
    await api.put(`api/bugs/${bugId}`, edit)
    await this.getAllBugs()
  }

  async deleteBug(bugId) {
    await api.delete(`api/bugs/${bugId}`)
    await this.getAllBugs()
  }
}

export const bugsService = new BugsService()
