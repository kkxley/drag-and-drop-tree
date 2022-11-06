<template>
  <div class="search-field">
    <i class="icon icon-search" />
    <input type="text" v-model="searchText" />
    <i v-show="searchText.length"
       @click="searchText = ''"
       class="icon icon-close" />
  </div>
</template>

<script>
export default {
  name: "SearchField",
  data() {
    return {
      searchText: ''
    };
  },
  watch: {
    searchText() {
      this.$emit('change-search-text', this.searchText.trim().toLowerCase());
    }
  }
}
</script>

<style lang="scss" scoped>
.search-field {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #0066FF;
  max-width: 500px;


  input {
    font-size: 15px;
    font-weight: 400;
    border: none;
    flex: 1;
    padding: 12px;

    &:focus {
      outline: none;
    }
  }

  .icon-close {
    cursor: pointer;
  }

}
</style>