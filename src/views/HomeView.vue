<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <button class="btn btn-primary" @click="goToDayBook">Primary button</button>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  methods: {
    goToDayBook() {
      this.$router.push({ name: "daybook" });
    },
  },
};
</script>

