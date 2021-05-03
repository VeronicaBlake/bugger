<template>
  <div class="bugs-component">
    <h1>Hello</h1>
    <router-link :to="{ name: 'BugDetailsPage', params:{id:bug.id} }" title="View Bug Details">
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
          <div>
            {{ new Date (bug.updatedAt).toLocalString(en, time) }}
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'BugsComponent',
  props: {
    bug: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {
      time: {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'

      }
    }
  },
  components: {}
}

</script>

<style scoped>

</style>
