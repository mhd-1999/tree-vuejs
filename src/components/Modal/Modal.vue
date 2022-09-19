<template>
  <div class="modal">
    <div class="modal-item">
      <div class="modal-title">
        <p>Thêm mới phòng ban</p>
      </div>
      <div class="modal-content">
        <InputModal
          v-for="item in inputFields"
          :key="item.id"
          :label="item.label"
          :placeHolder="item.placeHolder"
          :warningStatus="item.warningStatus"
          :className="item.className"
          :inputValue.sync="vm[item.inputValue]"
          @handleChangeInput="handleChangeInput"
        />
        <ButtonZone
          @handleSave="handleSave"
          @handleCancel="handleCancel"
        ></ButtonZone>
      </div>
    </div>
  </div>
</template>

<script>
import InputModal from "./InputModal.vue";
import ButtonZone from "./ButtonZone.vue";
import { inputFields } from "@/constant/constant";
export default {
  name: "ModalBox",
  components: { ButtonZone, InputModal },
  data() {
    return {
      inputFields,
      department: "",
      departmentCode: "",
      isValidate: false,
      isDisabled: false,
    };
  },
  computed: {
    vm() {
      return this;
    },
  },
  methods: {
    handleSave() {
      this.$emit("handleForm", {
        type: "add",
        name: this.department,
        code: this.departmentCode,
        children: [],
      });
    },
    handleCancel() {
      this.$emit("handleForm", { type: "cancel" });
    },
    handleChangeInput() {
      const format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/; // eslint-disable-line
      if (this.department.match(format) || this.department == null) {
        this.isValidate = true;
        this.isDisabled = true;
        this.$store.commit("SET_DISABLED", this.isDisabled);
      } else {
        this.isValidate = false;
        this.isDisabled = false;
        this.$store.commit("SET_DISABLED", this.isDisabled);
      }
    },
  },
};
</script>

<style scoped>
p {
  margin: 0;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
}
.modal-item {
  width: 500px;
  margin: 15% auto;
  background: white;
  border-radius: 10px;
}
.modal-item .modal-title {
  font-size: 24px;
  color: white;
  padding: 11px 29px;
  background: #48647f;
  font-weight: 700;
  border-radius: 10px 10px 0 0;
}
.modal-item .modal-content {
  padding: 25px 25px 19px 33px;
}
/deep/ .input-name.active {
  border-color: red;
  color: red;
}
</style>
