<template>
  <div class="bug-page container">
    <div class="row justify-content-left my-4" v-if="state.loading">
      <div class="col-12 text-center p-2 m-md4 my-md-3 my-2">
        <i class="fas fa-bug fa-5x fa-spin text-success"></i>
      </div>
    </div>
    <div class=" my-3">
      <h2>Curent Bugs:</h2>
      <button type="button"
              class="btn- btn-lg btn-dark mx-3"
              data-toggle="modal"
              data-target="#new-bug-form"
              title="Report Bug"
              v-if="state.user.isAuthenticated"
      >
        REPORT NEW BUG
      </button>
      <CreateBugModal />
    </div>
    <div class="col-md-6 d-flex justify-content-end align-items-end">
      <span>Hide Closed Bugs
        <input type="checkbox"
               class="filter-checkbox cursor-pointer"
               id="filter-box"
               name="filter-box"
               title="Hide Closed Bugs"
               @click="hideClosed"
        >
      </span>
    </div>
    <div class="row justify-content-center" v-if="state.bugs[0]">
      <BugComponent v-for="b in state.bugs" :key="b.id" :bug="b" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
import Notification from '../utils/Notification'
// import { useRoute } from 'vue-router'
import CreateBugModal from '../components/CreateBugModal.vue'
export default {
  components: { CreateBugModal },
  name: 'Bug',
  setup() {
    // const route = useRoute()
    const state = reactive({
      loading: true,
      bugs: computed(() => AppState.bugs),
      newBug: computed(() => AppState.newBug),
      account: computed(() => AppState.account),
      user: computed(() => AppState.user)
    })
    onMounted(async() => {
      try {
        await bugsService.getAllBugs()
        state.loading = false
      } catch (error) {
        Notification.toast('Error: ', error, 'error')
      }
    })
    return {
      state,
      async hideClosed(bugs) {
        try {
          await bugsService.hideClosedBugs(bugs)
        } catch (error) {
          Notification.toast('Error: ' + error, ' error')
        }
      },
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
