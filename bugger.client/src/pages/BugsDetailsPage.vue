<template>
  <div class="home bug-detail container-fluid" v-if="state.activeBug">
    <div class="row mx-1 my-1 justify-content-between">
      <div class="col-md-6">
        <div>
          <h1>{{ state.activeBug.title }}</h1>
        </div>
      </div>
      <div class="col-md-3 d-flex">
        <h2 class="font-weight-lighter">
          Status:
          <span v-if="state.activeBug.closed" class="font-weight-bold text-danger">Closed</span>
          <span v-else class="text-success font-weight-bold">Open</span>
        </h2>
      </div>
    </div>

    <div class="row mx-1 my-1 justify-content-between">
      <div class="col-md-4 d-flex flex-row">
        <p class="font-weight-lighter">
          Reported by: <img :src="state.activeBug.creator.picture" height="30" alt="" class="user-photo rounded-circle mx-2"><b> {{ state.activeBug.creator.name }}</b>
        </p>
      </div>
      <div class="col-md-3">
        <div v-if="state.activeBug.closed"></div>
        <div v-else>
          <button v-if="state.user.isAuthenticated && state.account.id == state.activeBug.creatorId" class="btn btn-danger">
            Close Bug
          </button>
        </div>
      </div>
    </div>

    <div class="row mx-1 my-1">
      <div class="col-md-12">
      </div><p class="text-black-50 mb-0 mb-1 ml-1">
        {{ state.activeBug.title }} Description:
      </p>
    </div>
    <div class="card">
      <div class="card-body">
        {{ state.activeBug.description }}
      </div>
    </div>

    <div class="row mx-1 mt-4 align-items-center" v-if="state.notes">
      <div class="col-md-12">
        <h5>Notes</h5>
        <button class="btn btn-outline-primary"
                title="Add Note"
                data-toggle="modal"
                data-target="#new-note-form"
                v-if="state.user.isAuthenticated"
                type="button"
        >
          Add Note
        </button>
        <CreateNoteModal />
      </div>
    </div>

    <div class="row mx-1">
      <div class="col-md-12 mt-2">
        <table class="table table-hover tableColor">
          <thead>
            <tr>
              <th scope="col">
                Name
              </th>
              <th scope="col">
                Message
              </th>
              <th scope="col">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            <!-- Inject Note Component here. -->
            <NoteComponent v-for="note in state.notes" :key="note.id" :note="note" />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, onMounted } from 'vue'
import { AppState } from '../AppState'
import Notification from '../utils/Notification'
import { bugsService } from '../services/BugsService'
import { notesService } from '../services/NotesService'
import { useRoute } from 'vue-router'
export default {
  name: 'BugsDetailsPage',
  setup() {
    const route = useRoute()
    const state = reactive({
      activeBug: computed(() => AppState.activeBug),
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      notes: computed(() => AppState.notes)
    })
    onMounted(async() => {
      try {
        await bugsService.getActiveBug(route.params.id)
        await notesService.getNotesByBugId(route.params.id)
      } catch (error) {
        Notification.toast('error:' + error, 'warning')
      }
    })
    return {
      state,
      route
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.tableColor{
  background-color:rgb(255, 255, 255)
}
</style>
