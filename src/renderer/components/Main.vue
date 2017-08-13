<style>

</style>
<template>
    <div class="full-height">
        <div style='width: 68px;' class="full-height pull-left">
            <navigator></navigator>
        </div>
        <div class="full-height pull-left">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
  import navigator from './navigator.vue'
  export default {
    components: {navigator}
  }
</script>
