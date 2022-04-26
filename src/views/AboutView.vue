<template>
  <div class='container'> 
    <AccueilAnglais />
  </div>
  <div>
    <MyMenu />
  </div>
</template>

<script>

import MyMenu from '@/components/MyMenu.vue'
// import AccueilSite from '@/components/Accueil.vue'
import AccueilAnglais from '@/components/AccueilAnglais.vue'

export default {
  name: "AboutView",
  components: {
    MyMenu,
    // AccueilSite,
    AccueilAnglais 
  },
}
</script>

