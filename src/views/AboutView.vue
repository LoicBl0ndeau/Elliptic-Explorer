<template>
  <div class='container'> 
    <Accueil />
  </div>
  <div>
    <MyMenu />
  </div>
</template>

<script>

import MyMenu from '@/components/MyMenu.vue'
import Accueil from '@/components/Accueil.vue'

export default {
  name: "AboutView",
  components: {
    MyMenu,
    Accueil
  },
}
</script>

