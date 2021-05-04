<template>
  <tr>
    <th scope="row">
      {{ bug.title }}
    </th>
    <td>{{ bug.creator.name }}</td>
    <td>
      <span v-if="bug.closed" class="text-danger">Closed</span>
      <span v-else class="text-success">Open</span>
    </td>
    <td>{{ new Date (bug.updatedAt).toLocaleString(time) }}</td>
    <router-link :to="{ name: 'BugsDetailsPage', params: { id: bug.id } }">
      <td title="View Bug Details">
        View Details
      </td>
    </router-link>
  </tr>
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

</style>
