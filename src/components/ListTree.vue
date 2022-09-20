<template>
  <div class="list-tree">
    <div class="list-main">
      <Tree v-for="item in tree" :treeItem="item" :key="item.id" />
    </div>
  </div>
</template>

<script>
import Tree from "./Tree.vue";
import { tree } from "../constant/constant";
export default {
  name: "ListTree",
  components: { Tree },
  data() {
    return {
      tree,
    };
  },
};
</script>

<style scoped>
.list-tree {
  margin: 100px auto;
  padding: 32px 32px 16px 0;
  border-radius: 10px;
  width: 477px;
  border: 1px solid #dcdcdc;
}
</style>
