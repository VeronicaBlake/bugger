<template>
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <div class="row justify-content-center" v-if="user.isAuthenticated">
      <div>
        <router-link :to="{name: 'Bug'}">
          <button type="button" class="btn btn-lg btn-dark mx-auto text-light mt-md-2 mt-3 mb-md-2" title="View Bugs">
            VIEW/REPORT BUGS
          </button>
        </router-link>
      </div>
    </div>
    <div class="row justify-content-center" v-else>
      <div class="col-md-6 col-10 shadow bg-light text-center p-3 m-md-4 my-md-3 my-4">
        <h1>Log in to view or report bugs</h1>
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
