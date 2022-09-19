<template>
  <div>
    <div class="option">
      <ul class="list-option">
        <li @click="isShow = true" class="option-item">Thêm phòng ban</li>
        <li @click="handleDelete" class="option-item">Xoá phòng ban</li>
        <li @click="handleLevelUp" class="option-item">Nâng level</li>
        <li @click="handleLevelDown" class="option-item">Giảm level</li>
      </ul>
    </div>
    <ModalBox v-show="isShow" @handleForm="handleForm"></ModalBox>
  </div>
</template>

<script>
import ModalBox from "./Modal/Modal.vue";
export default {
  name: "OptionBox",
  components: {
    ModalBox,
  },
  data() {
    return {
      isShow: false,
      isDisabled: false,
    };
  },
  methods: {
    handleDelete() {
      this.$emit("handleOption", { type: "delete" });
    },
    handleLevelUp() {
      this.$emit("handleOption", { type: "levelUp" });
    },
    handleLevelDown() {
      this.$emit("handleOption", { type: "levelDown" });
    },
    handleForm(value) {
      this.isShow = false;
      this.isDisabled = false;
      this.$store.commit("SET_DISABLED", this.isDisabled);
      this.$emit("handleOption", value);
    },
  },
};
</script>

<style scoped>
.option {
  width: 150px;
  border: 1px solid #ffffff;
  box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  background: white;
}
li {
  cursor: pointer;
}
.list-option {
  padding: 0;
  margin: 6px 0;
}
.option-item {
  width: auto;
  list-style: none;
  font-size: 12px;
  padding: 8px;
  text-align: start;
}
.option-item:hover {
  background: #48647f;
  color: white;
}
</style>
