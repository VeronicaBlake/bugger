import { AppState } from '../AppState'
import router from '../router'
import { api } from './AxiosService'
import Notification from '../utils/Notification'

class BugsService {
  async getAllBugs() {
    try {
      const res = await api.get('api/bugs')
      AppState.bugs = res.data
      // console.log(res.data)
    } catch (error) {
      Notification.toast('ERROR LOADING BUGS')
    }
  }

  async hideClosed() {
    if (document.getElementById('filter-box').checked) {
      AppState.bugs = AppState.bugs.filter(bug => bug.closed !== true)
    } else {
      this.getAllBugs()
    }
  }

  async getActiveBug(bugId) {
    try {
      const res = await api.get(`api/bugs/${bugId}`)
      AppState.activeBug = res.data
    } catch (error) {
      Notification.toast('ERROR LOADING BUG')
    }
  }

  async getNotesByBugId(bugId) {
    const res = await api.get(`api/bugs/${bugId}/notes`)
    // NOTE you must now specify which specific object in AppState.notes is being referenced.
    AppState.notes[bugId] = res.data
  }

  async createBug(body) {
    const res = await api.post('api/bugs', body)
    router.push({ name: 'Bug', params: { id: res.data.id } })
    this.getAllBugs()
  }

  async editBug(bugId, edit) {
    await api.put(`api/bugs/${bugId}`, edit)
    await this.getAllBugs()
  }

  async closeBug(activeBug, bugId) {
    await api.delete(`api/bugs/${bugId}`)
    if (activeBug.closed === false) {
      AppState.activeBug.closed = true
    } else {
      Notification.toast('BUG CLOSED')
    }
  }
}

export const bugsService = new BugsService()
