<template>
  <!--在线编辑简历-->
    <div>
      <v-distpicker :province="select.province" :city="select.city" :area="select.area"></v-distpicker>
    </div>
</template>

<script>
import VDistpicker from 'v-distpicker'
export default {
  name: 'EditResume',
  components: { VDistpicker },
  data() {
    return {
      select: { province: '', city: '', area: '' },
    }
  },
}
</script>

<style scoped>

</style>
