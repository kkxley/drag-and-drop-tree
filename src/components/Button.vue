<template>
  <button @click="$emit('click')" class="button">
    <i :class="['icon',  `icon-${icon}`]"/>
    <span v-if="label" class="button__label">
      {{ label }}
    </span>
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    icon: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.button {
  border-radius: 50px;
  border: 1px solid #D3D8DF;
  background: #fff;
  cursor: pointer;
  padding: 9px 10px;
  display: flex;
  align-items: center;

  &__label {
    font-size: 12px;
    font-weight: 600;
    padding-right: 10px;
  }

  .icon + &__label {
    padding-left: 10px;
  }
}
</style>