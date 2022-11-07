<template>
  <draggable group="documents"
             ghostClass="document_ghost"
             dragClass="document_drag"
             :data-category-id="categoryId"
             :disabled="isDisable"
             @start="$emit('on-drag-start', $event)"
             @end="$emit('on-drag-end', $event)"
             @add="$emit('on-add-document', $event)"
             @update="$emit('on-move-document', $event)"
             :value="value"
             :removeCloneOnHide="false">
    <slot />
  </draggable>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  name: "DraggableDocuments",
  components: {draggable},
  props: {
    isDisable: {
      type: Boolean,
      default: false
    },
    categoryId: {
      type: Number,
      default: null
    },
    value: {
      type: Array,
      default: () => []
    }
  }
}
</script>