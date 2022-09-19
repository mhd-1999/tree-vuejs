<template>
  <div class="button-zone">
    <button @click.prevent="handleCancel">Huỷ</button>
    <button @click.prevent="handleSave" :disabled="isDisabled">Lưu</button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ButtonZone",
  data() {
    return {
      isSave: false,
    };
  },
  methods: {
    handleSave() {
      this.$emit("handleSave");
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
  },
  computed: {
    ...mapGetters(["isDisabled"]),
  },
};
</script>

<style scoped>
.button-zone {
  text-align: end;
  margin-top: 6px;
}
.button-zone button {
  width: 108px;
  padding: 10px;
  cursor: pointer;
}
.button-zone button:first-child {
  margin-right: 20px;
  color: #48647f;
  background: white;
  border: 2px solid #dbdbdb;
  border-radius: 4px;
}
.button-zone button:last-child {
  background: #48647f;
  opacity: 0.4;
  border: 2px solid #ffffff;
  border-radius: 4px;
  color: white;
}
.button-zone button:last-child:hover {
  opacity: 1;
  border-color: #dbdbdb;
}
</style>
