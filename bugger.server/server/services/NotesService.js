import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class NotesService {
  async create(body) {
    return await dbContext.Notes.create(body)
  }

  async delete(id, creatorId) {
    const data = await dbContext.Notes.findOneAndDelete({ _id: id, creatorId })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return 'Successfully Deleted'
  }

  async getNotesByBugId(id) {
    const notes = await dbContext.Notes.find({ bug: id }).populate('creator', 'name picture')
    return notes
  }
}
export const notesService = new NotesService()
