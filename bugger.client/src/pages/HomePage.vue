<template>
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <div class="row justify-content-center">
      <div>
        <router-link :to="{name: 'Bug'}">
          <button type="button" class="btn btn-lg btn-dark mx-auto text-light mt-md-2 mt-3 mb-md-2" title="View Bugs">
            VIEW/REPORT BUGS
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'Home',
  setup() {
    return {
      user: computed(() => AppState.user)
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
