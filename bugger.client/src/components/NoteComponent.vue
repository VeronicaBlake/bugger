<template class="note-component">
  <tr>
    <th scope="row">
      <p class="font-weight-lighter">
        <img :src="note.creator.picture" height="20" alt="" class="user-photo rounded-circle">
        {{ note.creator.name }}
      </p>
    </th>
    <td>{{ note.body }}</td>
    <td><i class="fas fa-sm fa-trash text-warning" title="Delete this note" v-if="state.user.isAuthenticated && state.account.id == note.creatorId"></i></td>
  </tr>
</template>

<script>
import { reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
export default {
  name: 'NoteComponent',
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    const state = reactive({
      account: computed(() => AppState.account),
      user: computed(() => AppState.user)
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
</style>
