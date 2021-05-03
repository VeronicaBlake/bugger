<template>
  <div class="bug-details container">
    <div class="row">
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { bugsService } from '../services/BugsService'
import { notesService } from '../services/NotesService'
import Notification from '../utils/Notification'
export default {
  name: 'BugsDetails',
  setup() {
    const route = useRoute()
    const state = reactive({
      bugId: route.params.id,
      loading: true,
      newNote: {},
      notes: computed(() => AppState.notes[state.bugId]),
      activeBug: computed(() => AppState.activeBug)
    })
    onMounted(async() => {
      try {
        await bugsService.getNotesByBugId(state.bugId)
        state.loading = false
      } catch (error) {
        Notification.toast('Error: ', error, 'error')
      }
      try {
        await bugsService.getBugById(state.bugId)
      } catch (error) {
        Notification.toast('Error: ', error, 'error')
      }
    })
    return {
      state,
      async createNote() {
        try {
          await Notification.inputModal('Name your Note!', 'Note name here...')
          if (AppState.newPost.length > 20) {
            Notification.toast(`That's ${AppState.newPost.length - 20} too many characters!`, 'error')
          } else {
            AppState.newPost.bugId = state.bugId
            await notesService.createNote(state.bugId, AppState.newPost)
          }
        } catch (error) {
          Notification.toast('Error: ', error, 'error')
        }
      },
      user: computed(() => AppState.user)
    }
  }
}
</script>

<style scoped>

</style>
