<template>
  <div class="entry-list-container">
    <div>
      <input type="text" class="form-control" placeholder="Search..." aria-label="search" v-model="term" />
    </div>
    <div class="mt-2 d-flex flex-column">
      <button class="btn btn-primary mx-3" @click="$router.push({ name: 'entry', params: { id: 'new' } })">
        <i class="fa fa-plus-circle"></i>
        New entry
      </button>
    </div>
    <div class="entry-scrollarea">
      <EntryOne v-for="entry in entriesByTerm" :key="entry.id" :entry="entry" />
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapGetters } from "vuex";

export default {
  components: {
    EntryOne: defineAsyncComponent(() => import(/* webpackChunkName: "EntryOne" */ "./EntryOne.vue")),
  },
  computed: {
    ...mapGetters("journal", ["getEntriesByTerm"]),
    entriesByTerm() {
      return this.getEntriesByTerm(this.term);
    },
  },
  data() {
    return {
      term: "",
    };
  },
};
</script>

<style lang="scss" scoped>
.entry-list-container {
  border-right: 1px solid #2c3e50;
  height: calc(100vh - 56px);
}

.entry-scrollarea {
  height: calc(100vh - 110px);
  overflow: scroll;
}
</style>
