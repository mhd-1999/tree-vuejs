<template>
  <div class="input-item">
    <label>{{ label }}</label>
    <input
      :type="typeInput"
      :placeholder="placeHolder"
      :value="inputValue"
      :class="isDisabled ? `active ${className}` : ''"
      @input="changeValue"
      @keyup="handleChangeInput"
    />
    <p v-if="isDisabled">{{ warningStatus }}</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "InputItem",
  props: {
    label: {
      type: String,
      default: "",
    },
    typeInput: {
      type: String,
      default: "",
    },
    placeHolder: {
      type: String,
      default: "",
    },
    warningStatus: {
      type: String,
      default: "",
    },
    inputValue: {
      type: String,
      default: "text",
      required: true,
    },
    className: {
      type: String,
      default: "",
    },
  },
  computed: {
    ...mapGetters(["isDisabled"]),
  },
  methods: {
    changeValue(e) {
      const textValue = e.target.value;
      this.$emit("update:inputValue", textValue);
    },
    handleChangeInput() {
      this.$emit("handleChangeInput");
    },
  },
};
</script>

<style scoped>
.input-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 14px;
}
p {
  text-align: start !important;
}
label {
  font-weight: 700;
  font-size: 16px;
  line-height: 14px;
  color: #48647f;
}
input {
  padding: 10px;
  border: 2px solid #dcdcdc;
  border-radius: 4px;
  margin-top: 9px;
}

input:focus {
  outline: none;
}
input::placeholder {
  color: #48647f;
}
p {
  text-align: end;
  font-size: 8px;
  color: red;
}
</style>
