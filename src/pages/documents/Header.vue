<template>
  <header class="header">
    <div class="header__row">
      <h1>Документы</h1>
      <div class="header__buttons">
        <Button icon="mark" />
        <Button icon="plus" label="Новый тип" />
        <Button icon="plus" label="Новый документ" />
      </div>
    </div>
    <div>
      <SearchField @change-search-text="(searchText) => $emit('change-search-text', searchText)" />
    </div>
  </header>
</template>

<script>
import Button from "@/components/Button";
import SearchField from "@/pages/documents/SearchField";

export default {
  name: "Header",
  components: {SearchField, Button},

}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: column;
  row-gap: 23px;

  &__row {
    display: flex;
    align-items: center;
  }

  &__buttons {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    column-gap: 10px;
  }
}
</style>