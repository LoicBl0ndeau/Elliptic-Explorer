<template>
  <MyMenu />
  <div id="main" class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>

import MyMenu from '@/components/MyMenu.vue'

export default {
  name: "AboutView",
  components: {
    MyMenu,
  }
}
</script>
