<template>
  <div class="modal "
       id="new-note-form"
       tabindex="-1"
       role="dialog"
       aria-labelledby="exampleModalLabel"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            New Note
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form @submit.prevent="createNote">
          <div class="modal-body">
            <div class="form-group">
              <label for="body">Body</label>
              <input type="text"
                     class="form-control"
                     id="body"
                     placeholder="Title..."
                     v-model="state.newNote.body"
                     required
              >
            </div>
            <div class="form-group">
              <label for="description" class="col-form-label">Description</label>
              <input type="text"
                     class="form-control"
                     id="description"
                     placeholder="Description..."
                     minlength="3"
                     v-model="state.newNote.description"
              >
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-link text-dark" data-dismiss="modal">
              Close
            </button>
            <button type="submit" class="btn btn-primary">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { notesService } from '../services/NotesService'
import $ from 'jquery'
import Notification from '../utils/Notification'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
export default {
  name: 'CreateNoteModal',
  setup() {
    const route = useRoute()
    const state = reactive({
      newNote: {},
      notes: computed(() => AppState.notes)
    })
    return {
      state,
      route,
      async createNote() {
        try {
          state.newNote.bug = route.params.id
          // notesService or bugService in the back end for this function?
          await notesService.createNote(state.newNote, route.params.id)
          state.newNote = {}
          $('#new-note-form').modal('hide')
          Notification.toast('Note Added!', 'success')
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
</style>
