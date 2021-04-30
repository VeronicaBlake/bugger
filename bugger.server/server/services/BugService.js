import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BugsService {
  async find(query = {}) {
    return await dbContext.Bugs.find(query) // NOTE .populate('creator', 'name, etc')
  }

  async findOne(id) {
    const data = await dbContext.Bugs.findOne({ _id: id })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return data
  }

  async findNotesByBug(id) {
    return await dbContext.Notes.find({ bugId: id }) // NOTE .populate('creator', 'name', etc)
  }

  async create(body) {
    return await dbContext.Bugs.create(body)
  }

  async edit(body) {
    const data = await dbContext.Bugs.findOneAndUpdate({ _id: body.id }, body, { new: true })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return data
  }

  async delete(id, creatorId) {
    const data = await dbContext.Bugs.findOneAndDelete({ _id: id, creatorId })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return 'Successfully Deleted'
  }
}

export const bugsService = new BugsService()

// if closed = false
