<template>
  <div class="bug-page container">
    <div class="row justify-content-left my-4" v-if="state.loading">
      <div class="col-12 text-center p-3 m-md4 my-md-3 my-4">
        <i class="fas fa-bug fa-spin text-success large-icon mx-1"></i>
      </div>
      <h2>Curent Bugs:</h2>
      <button type="button" class="btn- btn-lg btn-dark mx-3" @click="createBug()" title="Report Bug" v-if="state.user.isAuthenticated">
        REPORT NEW BUG
      </button>
    </div>
    <div class="row" v-if="state.bugs[0]">
      <BugComponent v-for="b in state.bugs" :key="b.id" :bug="bug" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
import Notification from '../utils/Notification'
import { useRoute } from 'vue-router'
export default {
  name: 'Bug',
  setup() {
    const route = useRoute()
    const state = reactive({
      loading: true,
      bugs: computed(() => AppState.bugs),
      newBug: computed(() => AppState.newBug),
      account: computed(() => AppState.account),
      user: computed(() => AppState.user)
    })
    // notes don't show on this page, only all bugs. We only need a getAllBugs funtion
    onMounted(async() => {
      try {
        await bugsService.getAllBugs()
        state.loading = true
      } catch (error) {
        Notification.toast('Error: ', error, 'error')
      }
    })
    return {
      state,
      route,
      async sortByStatus(bugs) {
        try {
          await bugsService.sortByStatus(bugs)
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
