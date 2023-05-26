<template>
  <div v-if="entry" class="entry-title d-flex justify-content-between p-2">
    <div>
      <span class="text-success fs-3 fw-bold">{{ day }}</span>
      <span class="mx-1 fs-3">{{ month }}</span>
      <span class="mx-2 fs-4 fw-light">{{ yearDay }}</span>
    </div>
    <div>
      <button class="btn btn-danger mx-2">
        Delete
        <i class="fas fa-trash"></i>
      </button>
      <button class="btn btn-primary">
        Upload
        <i class="fas fa-upload"></i>
      </button>
    </div>
  </div>
  <hr />
  <div class="d-flex flex-column px-3 h-75">
    <textarea class="form-control" rows="10" placeholder="What's happend today?" v-model="entry.text"></textarea>
  </div>
  <FollowActionButton icon="fas fa-save" />
  <img src="https://picsum.photos/200/300" alt="Random image" class="img-thumbnail" />
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapGetters } from "vuex";
import getDayMonthYear from "../helpers/getDayMonthYear";

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  components: {
    FollowActionButton: defineAsyncComponent(() => import("../components/FollowActionButton.vue")),
  },
  data() {
    return {
      entry: null,
    };
  },
  computed: {
    ...mapGetters("journal", ["getEntryById"]),
    day() {
      const { day } = getDayMonthYear(this.entry.date);
      return day;
    },
    month() {
      const { month } = getDayMonthYear(this.entry.date);
      return month;
    },
    yearDay() {
      const { yearDay } = getDayMonthYear(this.entry.date);
      return yearDay;
    },
  },
  methods: {
    getEntry() {
      const entry = this.getEntryById(Number(this.id));
      if (!entry) {
        return this.$router.push({ name: "no-entry" });
      }
      this.entry = entry;
    },
  },
  created() {
    this.getEntry();
  },
  watch: {
    id() {
      this.getEntry();
    },
  },
};
</script>

<style lang="scss" scoped>
textarea {
  font-size: 20px;
  border: none;
  height: 100%;
  &:focus {
    outline: none;
  }
}
img {
  width: 200px;
  position: fixed;
  bottom: 150px;
  right: 20px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
}
</style>
