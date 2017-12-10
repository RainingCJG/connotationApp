<template>
  <div class="typepic">
    <img v-lazy="data.group.large_image.url_list[0].url" :alt="data.group.category_name">
  </div>
</template>

<script>
export default {
  name: 'typepic',
  props: {
    data: ''
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .typepic img{
    width: 100%;
  }
</style>