<template>
  <div class="category">
    <Button :icon="isOpen && 'arrow-up' || 'arrow-down'"
            class="category__show-button"
            @click="$emit('open')" />
    <div class="category__title">
      <text-highlight :queries="searchText">{{ title }}</text-highlight>
    </div>
    <div class="category__description">
      <text-highlight :queries="searchText">{{ description }}</text-highlight>
    </div>
    <ControlButtons @delete="$emit('delete')"
                    @on-drag="$emit('on-drag')"
                    @off-drag="$emit('off-drag')" />
  </div>
</template>

<script>
import ControlButtons from "@/components/tree/ControlButtons";
import Button from "@/components/Button";

export default {
  name: "Category",
  components: {Button, ControlButtons},
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    isOpen: {
      type: Boolean,
      default: false
    },
    searchText: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.category {
  display: flex;
  align-items: center;
  column-gap: 15px;
  padding: 16px;
  border: 1px solid #DFE4EF;

  &__title {
    font-weight: 500;
    font-size: 15px;
  }

  &__description {
    flex: 1;
    font-size: 11px;
    color: #8E9CBB;
  }

  &__show-button {
    padding: 7px;

    &::v-deep .icon {
      width: 8px;
      height: 8px;
    }
  }
}
</style>