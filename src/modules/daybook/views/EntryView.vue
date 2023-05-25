<template>
  <div class="entry-title d-flex justify-content-between p-2">
    <div>
      <span class="text-success fs-3 fw-bold">15</span>
      <span class="mx-1 fs-3">Julio</span>
      <span class="mx-2 fs-4 fw-light">2021, jueves</span>
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
    <textarea class="form-control" rows="10" placeholder="What's happend today?"></textarea>
  </div>
  <FollowActionButton icon="fas fa-save" />
  <img src="https://picsum.photos/200/300" alt="Random image" class="img-thumbnail" />
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  components: {
    FollowActionButton: defineAsyncComponent(() => import("../components/FollowActionButton.vue")),
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
