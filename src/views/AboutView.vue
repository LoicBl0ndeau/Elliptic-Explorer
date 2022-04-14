<template>
  <div class='container'> 
    <center><button @click='changelangue'>Français</button></center>
    <AccueilSite v-show='isOpen.francais'/>
    <AccueilAnglais />
  </div>
  <div>
    <MyMenu />
  </div>
</template>

<script>

import MyMenu from '@/components/MyMenu.vue'
import AccueilSite from '@/components/Accueil.vue'
import AccueilAnglais from '@/components/AccueilAnglais.vue'

export default {
  name: "AboutView",
  data() {
    return {
      isOpen: {
        "francais": false,
      },
    };
  },
  methods: {
    changelangue() {
      this.francais = !this.francais;
    }, 
  },
  components: {
    MyMenu,
    AccueilSite,
    AccueilAnglais 
  },
}
</script>

