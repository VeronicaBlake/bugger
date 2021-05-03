<template>
  <div class="bugs-component">
    <router-link :to="{ name: 'BugsDetails', params:{id:bug.id} }" title="View Bug Details">
      <div class="card justify-content-around">
        <div class="card-body">
          <div class="div flexCol">
            {{ bug.title }}
          </div>
          <div class="div flexCol">
            <img class="rounded-cirlce" :src="bug.creator.picture" alt="Bug Creator Profile Picture">
            {{ bug.creator.name }}
          </div>
          <div class="div flexCol">
            <span v-if="bug.closed" class="text-danger"> Closed </span>
            <span v-else class="text-success"> Open </span>
          </div>
          <!-- <div>
            {{ new Date (bug.updatedAt).toLocalString( time) }}
          </div> -->
        </div>
      </div>
    </router-link>
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
