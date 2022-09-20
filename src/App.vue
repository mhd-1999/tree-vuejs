<template>
  <div id="app">
    <div class="list">
      <ListTree />
    </div>
  </div>
</template>

<script>
import ListTree from "./components/ListTree.vue";
export default {
  name: "App",
  components: { ListTree },
};
</script>

<style>
body {
  background: white;
}
body::-webkit-scrollbar {
  display: none;
}
</style>
