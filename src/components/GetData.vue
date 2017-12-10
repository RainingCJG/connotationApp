<template>
  <div class="getdata">
  </div>
</template>

<script>
export default {
  name: 'getdata',
  props: {
    type: ''
  },
  data () {
    return {
      currentTime: 0,
      preTime: 0
    }
  },
  created () {
    var date = new Date()
    this.preTime = parseInt(parseInt(this.currentTime) / 1000).toString()
    this.currentTime = date.getTime()
    this.$http.get('/api/neihan/stream/mix/v1/?mpic=1&webp=1&essence=1&content_type=' + this.type + '&message_cursor=-1&am_longitude=110&am_latitude=120&am_city=%E5%8C%97%E4%BA%AC%E5%B8%82&am_loc_time=' + this.currentTime + '&count=30&min_time=' + this.preTime + '&screen_width=1450&do00le_col_mode=0&iid=3216590132&device_id=32613520945&ac=wifi&channel=360&aid=7&app_name=joke_essay&version_code=612&version_name=6.1.2&device_platform=android&ssmix=a&device_type=sansung&device_brand=xiaomi&os_api=28&os_version=6.10.1&uuid=326135942187625&openudid=3dg6s95rhg2a3dg5&manifest_version_code=612&resolution=1450*2800&dpi=620&update_version_code=6120').then((res) => {
      console.log(res.data.data.data)
      var data = res.data.data.data
      this.$emit('getData', data)
    }, (res) => {
      console.log('error')
      this.$emit('getData', '[]')
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>