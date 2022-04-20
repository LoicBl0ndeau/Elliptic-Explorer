<template>
  <div class='container'> 
    <!-- <button @click='open("francais")'>Français</button> -->
    <!-- <AccueilSite  v-show='isOpen.francqais'/> -->
    <!-- <button @click='open("anglais")'>Anglais</button> -->
    <AccueilAnglais />
  </div>
  <center>
    <img src="https://centre.hei.fr/wp-content/uploads/2020/10/junia.jpg" width="700" height="150"/>
  </center>
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
  /* data() {
    return {
      isOpen: {
        "francais": false,
        "anglais": false,
      },
    };
  },
  methods: {
    open(langue) {
      for (const [key, ] of Object.entries(this.isOpen)) {
        if (key == langue) {
          this.isOpen[key] = true;
        }
        else this.isOpen[key] = false;
      }
    },
  }, */
  components: {
    MyMenu,
    // AccueilSite,
    AccueilAnglais 
  },
}
</script>

<style scoped>
img {
  margin-left: 28%;
}
</style>

