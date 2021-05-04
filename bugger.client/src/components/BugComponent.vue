<template>
  <div class="bugs-component">
    <div class="card justify-content-around m-3 shadow">
      <div class="card-body justify-content-center">
        <h3>
          {{ bug.title }}
        </h3>
        <span>
          <img class="rounded-circle playNice" :src="bug.creator.picture" alt="Bug Creator Profile Picture">
          {{ bug.creator.name }}
        </span>
        <div class="div flexCol">
          <span v-if="bug.closed" class="text-danger"> Closed </span>
          <span v-else class="text-success"> Open </span>
        </div>
        <span>Last edited: {{ new Date (bug.updatedAt).toLocaleString(time) }}</span>
        <div>
          <router-link :to="{ name: 'BugsDetailsPage', params:{id:bug.id} }" title="View Bug Details">
            View Details
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { bugsService } from '../services/BugsService'
import { AppState } from '../AppState'
import Notification from '../utils/Notification'
import { computed, reactive } from 'vue'
import { useRoute } from 'vue-router'
export default {
  name: 'BugComponent',
  props: {
    bug: {
      type: Object,
      required: true
    }
  },
  setup() {
    const route = useRoute()
    const state = reactive({
      account: computed(() => AppState.account)
    })
    return {
      state,
      route,
      time: {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      },
      async closeBug(id) {
        if (await Notification.confirmAction()) {
          try {
            await bugsService.closeBug(id)
            Notification.toast('Closed! ', 'error')
          } catch (error) {
            Notification.toast('Input canceled!', 'warning')
          }
        } else {
          Notification.toast('No worries!', 'success')
        }
      }
    }
  },
  components: {}
}

</script>

<style scoped>
.playNice{
  max-height: 3rem;
  max-width: 3rem;
}
</style>
