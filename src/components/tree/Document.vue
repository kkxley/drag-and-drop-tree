<template>
  <div class="document">
    <div class="document__title">
      <text-highlight :queries="searchText">{{ title }}</text-highlight>
    </div>
    <div class="document__comment">
      <text-highlight :queries="searchText">{{ comment }}</text-highlight>
    </div>
    <ControlButtons
        class="document__buttons"
        @delete="$emit('delete')"
        @on-drag="$emit('on-drag')"
        @off-drag="$emit('off-drag')" />
  </div>
</template>

<script>
import ControlButtons from "@/components/tree/ControlButtons";

export default {
  name: "Document",
  components: {ControlButtons},
  props: {
    title: {
      type: String,
      required: true
    },
    comment: {
      type: String
    },
    searchText: {
      type: String,
      default: ''
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.document {
  display: flex;
  align-items: center;
  padding: 16px;
  border: 1px solid #DFE4EF;
  background: #fff;

  &__title {
    font-size: 13px;
  }

  &__comment {
    font-size: 11px;
    color: #8E9CBB;
    flex: 1;
  }

  &__title + &__comment {
    margin-left: 15px;
  }

  &_ghost {
    padding: 0;
    border: none;
    border-top: 5px solid #0066FF !important;
  }

  &_ghost &__title, &_ghost &__comment, &_ghost &__buttons {
    display: none;
  }

  &_drag {
    border: 1px solid #DFE4EF !important;
  }
}
</style>