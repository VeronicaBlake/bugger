import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BugsService {
  async find(query = {}) {
    return await dbContext.Bugs.find(query).populate('creator', 'name picture')
  }

  async findOne(id) {
    const data = await dbContext.Bugs.findOne({ _id: id }).populate('creator', 'name picture')
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return data
  }

  async findNotesByBug(id) {
    return await dbContext.Notes.find({ bugId: id }).populate('creator', 'name picture')
  }

  async create(body) {
    return await dbContext.Bugs.create(body)
  }

  async edit(body) {
    const bugBoi = await dbContext.Bugs.findOne({ _id: body.id })
    if (bugBoi.closed === true) {
      throw new BadRequest('Bug is Closed')
    }
    const data = await dbContext.Bugs.findOneAndUpdate({ _id: body.id, creatorId: body.creatorId }, body, { new: true })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return data
  }

  async delete(id, creatorId) {
    const closedBug = await dbContext.Bugs.findOne({ _id: id })
    if (closedBug.closed === true) {
      throw new BadRequest('Nope')
    }
    const data = await dbContext.Bugs.findOneAndUpdate({ _id: id, creatorId }, { closed: true })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return 'Successfully Deleted'
  }
}

export const bugsService = new BugsService()

// if closed = false
