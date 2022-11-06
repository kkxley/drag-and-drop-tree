<template>
  <div class="control-buttons">
    <button class="control-buttons__button">
      <i class="icon icon-edit" />
    </button>
    <button class="control-buttons__button" @click="$emit('delete')">
      <i class="icon icon-delete" />
    </button>
    <button class="control-buttons__button control-buttons__button_move" @mouseenter="$emit('on-drag')"
            @mouseleave="$emit('off-drag')">
      <i class="icon icon-move" />
    </button>
  </div>
</template>

<script>
export default {
  name: "ControlButtons"
}
</script>

<style lang="scss" scoped>
.control-buttons {
  display: flex;
  align-items: center;
  column-gap: 20px;

  &__button {
    background: none;
    border: none;
    cursor: pointer;

    &_move {
      cursor: move;
    }
  }
}
</style>