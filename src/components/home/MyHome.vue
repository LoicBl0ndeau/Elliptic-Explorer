<template>
  <div class="container" id="my-home-component">
    <center><button @click="open('francais')">Français</button></center>
    <AccueilSite v-show="isOpen.francais" />
    <center><button @click="open('anglais')">Anglais</button></center>
    <AccueilAnglais v-show="isOpen.anglais" />
  </div>
</template>

<script>
import AccueilSite from "@/components/home/MyHomeFr.vue";
import AccueilAnglais from "@/components/home/MyHomeEn.vue";

export default {
  name: "MyHome",
  data() {
    return {
      isOpen: {
        francais: false,
        anglais: false,
      },
    };
  },
  methods: {
    changelangue() {
      this.francais = !this.francais;
    },
    open(langue) {
      for (const [key] of Object.entries(this.isOpen)) {
        if (key == langue) {
          this.isOpen[key] = true;
        } else this.isOpen[key] = false;
      }
    },
  },
  components: {
    AccueilSite,
    AccueilAnglais,
  },
};
</script>

