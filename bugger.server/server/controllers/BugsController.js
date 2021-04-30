import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { bugsService } from '../services/BugsService'

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .get('', this.getAllBugs)
      .get('/:id', this.getBugById)
      .get('/:id/lists', this.getListsByBugId)
      .post('', this.createBug)
      .put('/:id', this.editBug)
      .delete('/:id', this.deleteBug)
  }

  async getAllBugs(req, res, next) {
    try {
      const bugs = await bugsService.find({ ...req.query, creatorId: req.userInfo.id })
      return res.send(bugs)
    } catch (error) {
      next(error)
    }
  }

  async getBugById(req, res, next) {
    try {
      const bug = await bugsService.findOne({ _id: req.params.id })
      return res.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async getNotesByBugId(req, res, next) {
    try {
      const lists = await bugsService.findNotesByBug({ _id: req.params.id })
      return res.send(lists)
    } catch (error) {
      next(error)
    }
  }

  async createBug(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      const bug = await bugsService.create(req.body)
      return res.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async editBug(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const data = await bugsService.edit(req.body)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async deleteBug(req, res, next) {
    try {
      const data = await bugsService.delete(req.params.id, req.userInfo.id)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
