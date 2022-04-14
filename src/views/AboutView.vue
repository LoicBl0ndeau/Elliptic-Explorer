<template>
  <div class='container'> 
    <center><button @click='open("francais")'>Français</button></center>
    <AccueilSite v-show='isOpen.francais'/>
    <center><button @click='open("anglais")'>Anglais</button></center>
    <AccueilAnglais v-show='isOpen.anglais'/>
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
        "anglais": false,
      },
    };
  },
  methods: {
    changelangue() {
      this.francais = !this.francais;
    }, 
    open(langue) {
      for (const [key, ] of Object.entries(this.isOpen)) {
        if (key == langue) {
          this.isOpen[key] = true;
        }
        else this.isOpen[key] = false;
      }
    },
  },
  components: {
    MyMenu,
    AccueilSite,
    AccueilAnglais 
  },
}
</script>

