<template>
  <div>
    <div class="parent" @contextmenu.prevent="handleRightClick">
      <div class="node-parent" @click="handleToggle">
        <div class="node">
          <p class="level">{{ tree.level }}</p>
          <p class="code">{{ tree.code }}</p>
          <p class="name">{{ tree.name }}</p>
        </div>
      </div>
      <slot></slot>
    </div>
    <OptionBox
      v-if="isOption"
      :movePosition="move"
      :item="tree"
      :style="{
        top: move.y + 'px',
        left: move.x + 'px',
        position: 'fixed',
        'z-index': 20,
      }"
      @handleOption="handleSave"
    ></OptionBox>
    <div
      class="mask"
      @contextmenu.prevent="handleLeftClick"
      @click="handleLeftClick"
      v-if="isOption"
    ></div>
  </div>
</template>

<script>
import OptionBox from "./OptionBox.vue";
export default {
  name: "TreeItem",
  data() {
    return {
      move: {},
      isOption: false,
      treeItem: this.tree,
    };
  },
  props: {
    tree: {
      type: Object,
      required: true,
    },
  },
  methods: {
    handleToggle() {
      this.$emit("handleToggle");
    },
    handleRightClick(e) {
      this.isOption = true;
      e.preventDefault();
      this.move.y = e.clientY;
      this.move.x = e.clientX;
    },
    handleLeftClick() {
      this.isOption = false;
    },
    handleSave(value) {
      if (value.type == "cancel") {
        this.isOption = false;
      } else if (value.type == "add") {
        this.isOption = false;
        this.$emit("handleToggle");
        this.handleAddTreeItem(value);
      } else if (value.type == "delete") {
        this.$emit("handleFormList", {
          type: value.type,
          tree: this.treeItem,
        });
      } else if (value.type == "levelUp") {
        this.$emit("handleFormList", {
          type: value.type,
          tree: this.treeItem,
        });
      } else if (value.type == "levelDown") {
        const tree = {
          id: this.treeItem.id,
          code: this.treeItem.code,
          name: this.treeItem.name,
          children: [...this.treeItem.children],
          level: Number(this.treeItem.level) + 1,
        };
        this.$emit("handleFormList", {
          type: value.type,
          id: this.treeItem.id,
          tree,
        });
      }
    },
    handleAddTreeItem(value) {
      let id = Math.random().toString(36).substring(2);
      this.treeItem.children.push({
        id,
        code: value.code,
        name: value.name,
        children: value.children,
        level: Number(this.tree.level) + 1,
      });
    },
  },
  components: { OptionBox },
};
</script>

<style scoped>
p {
  margin: 7px 8px;
  font-size: 14px;
  color: #666666;
  line-height: 18px;
}
p.level {
  color: white;
  background: #48647f;
  width: 18px;
  height: 18px;
  text-align: center;
  line-height: 19px;
  border-radius: 2px;
}
.node-parent {
  padding-bottom: 16px;
  cursor: pointer;
}
.node:before {
  content: "";
  position: absolute;
  top: 1rem;
  width: 16px;
  height: 2px;
  background: #dcdcdc;
  left: -16px;
}
.node {
  display: flex;
  flex-direction: row;
  background: #f0f0f0;
  border-radius: 4px;
}
.parent {
  position: relative;
  width: auto;
}
.node-parent:before {
  content: "";
  position: absolute;
  top: 1rem;
  width: 16px;
  height: 2px;
  background: #dcdcdc;
  left: -16px;
}
/* .option {
  display: none;
} */
/* .parent:before {
  content: "";
  position: absolute;
  top: -16px;
  width: 2px;
  height: 100%;
  left: -17px;
  background: #dcdcdc;
} */

.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
}
</style>
