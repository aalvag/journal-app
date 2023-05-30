<template>
  <template v-if="entry">
    <div class="entry-title d-flex justify-content-between p-2">
      <div>
        <span class="text-success fs-3 fw-bold">{{ day }}</span>
        <span class="mx-1 fs-3">{{ month }}</span>
        <span class="mx-2 fs-4 fw-light">{{ yearDay }}</span>
      </div>
      <div>
        <input
          type="file"
          aria-label="upload"
          v-show="false"
          @change="onFileChange"
          ref="imageSelector"
          accept="image/png, image/jpeg"
        />
        <button v-if="entry.id" @click="onDeleteEntry(entry.id)" class="btn btn-danger mx-2">
          Delete
          <i class="fas fa-trash"></i>
        </button>
        <button class="btn btn-primary" @click="onSelectedFile">
          Upload
          <i class="fas fa-upload"></i>
        </button>
      </div>
    </div>
    <hr />
    <div class="d-flex flex-column px-3 h-75">
      <textarea class="form-control" rows="10" placeholder="What's happend today?" v-model="entry.text"></textarea>
    </div>
  </template>
  <FollowActionButton icon="fas fa-save" @on:click="saveEntry" />
  <img v-if="entry && !localImage" :src="entry.picture" alt="entry image" class="img-thumbnail" />
  <img v-if="localImage" :src="localImage" alt="load image" class="img-thumbnail" />
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import Swal from "sweetalert2";
import uploadImage from "../helpers/uploadImage";

import getDayMonthYear from "../helpers/getDayMonthYear";

export default {
  name: "EntryView",
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
      localImage: null,
      file: null,
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
    ...mapActions("journal", ["updateEntry", "createEntry", "deleteEntry"]),
    getEntry() {
      let entry;
      if (this.id === "new") {
        entry = {
          text: "",
          date: new Date().getTime(),
        };
      } else {
        entry = this.getEntryById(this.id);
        if (!entry) return this.$router.push({ name: "no-entry" });
      }

      this.entry = entry;
    },
    async saveEntry() {
      new Swal({
        title: "Wait a moment...",
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        showConfirmButton: false,
      });
      Swal.showLoading();
      if (this.file) {
        const picture = await uploadImage(this.file);
        this.entry.picture = picture;
      }

      if (this.entry.id) {
        await this.updateEntry(this.entry);
      } else {
        const id = await this.createEntry(this.entry);
        this.$router.push({ name: "entry", params: { id } });
      }
      this.file = null;

      Swal.close();
      Swal.fire({
        title: "Saved",
        icon: "success",
        timer: 2000,
        timerProgressBar: true,
      });
    },
    async onDeleteEntry(id) {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "The entry will be deleted permanently",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, keep it",
      });

      if (!result.isConfirmed) return;

      Swal.fire({
        title: "Wait a moment...",
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        showConfirmButton: false,
      });
      await this.deleteEntry(id);
      this.$router.push({ name: "no-entry" });
      Swal.fire({
        title: "Deleted",
        icon: "success",
        timer: 2000,
        timerProgressBar: true,
      });
    },
    onFileChange(e) {
      const file = e.target.files[0];
      if (!file) {
        this.localImage = null;
        return;
      }
      this.file = file;
      this.localImage = URL.createObjectURL(file);
    },
    onSelectedFile() {
      this.$refs.imageSelector.click();
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
