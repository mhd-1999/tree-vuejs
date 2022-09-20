<template>
  <div class="tree-menu">
    <TreeItem
      :tree="treeItem"
      @handleToggle="handleToggle"
      @handleFormList="handleForm"
    >
    </TreeItem>
    <TreeParent
      v-show="isShow"
      :treeItem="tree"
      v-for="tree in treeItem.children"
      :key="tree.id"
      @onFormList="handleActionList"
    />
  </div>
</template>

<script>
import TreeItem from "./TreeItem.vue";
export default {
  name: "TreeParent",
  components: { TreeItem },
  props: {
    treeItem: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isShow: false,
      id: null,
      treeList: this.treeItem,
    };
  },
  methods: {
    handleToggle() {
      this.isShow = !this.isShow;
    },
    handleForm(value) {
      if (value.type == "delete") {
        this.$emit("onFormList", {
          type: "delete",
          id: value.tree.id,
        });
      } else if (value.type == "levelUp") {
        this.$emit("onFormList", {
          type: "levelUp",
          id: value.tree.id,
        });
      } else if (value.type == "levelDown") {
        this.$emit("onFormList", {
          type: "levelDown",
          id: value.tree.id,
        });
      }
    },
    handleActionList(value) {
      if (value.type == "delete") {
        this.handleDeleteTreeItem(value.id);
      } else if (value.type == "levelUp") {
        this.$emit("onLevel", {
          type: "levelUp",
          value: this.treeItem,
        });
      } else if (value.type == "levelDown") {
        this.handleLevelDown(value.id);
      }
    },
    handleDeleteTreeItem(id) {
      this.treeItem.children.forEach((item, index) => {
        if (item.id === id) {
          this.treeList.children.splice(index, 1);
        }
      });
    },
    handleLevelDownChild(child) {
      for (let item of child) {
        item.level++;
        if (item.children) {
          this.handleLevelDownChild(item.children);
        }
      }
    },
    handleLevelDown(id) {
      let list = this.treeList.children;
      for (let i = 0; i < this.treeList.children.length; i++) {
        if (list[i].id === id) {
          list[i - 1].children.push(list[i]);
          list.splice(i, 1);
          console.log(list[1].children);
          this.handleLevelDownChild(list[i - 1].children);
        }
      }
    },
  },
};
</script>

<style scoped>
.tree-menu {
  margin-left: 32px;
  position: relative;
}
.tree-menu:before {
  content: "";
  position: absolute;
  top: -16px;
  width: 2px;
  height: 100%;
  left: -16px;
  background: #dcdcdc;
}
.tree-menu:last-child:before {
  height: 33px;
}
</style>
