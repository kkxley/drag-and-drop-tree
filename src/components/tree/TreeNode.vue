<template>
  <div :class="['tree-node', {'tree-node_open': isOpen && category.documents.length}]">
    <Category :title="category.title"
              :description="category.description"
              :searchText="searchText"
              @delete="$emit('delete-category', category.id)"
              @open="isOpen = !isOpen"
              @on-drag="$emit('on-drag')"
              @off-drag="$emit('off-drag')"
              :is-open="isOpen" />
    <div class="tree-node__child-group">
      <DraggableDocuments :is-disable="!draggable"
                          :category-id="category.id"
                          :value="category.documents"
                          @on-drag-start="$emit('on-drag-start', $event)"
                          @on-drag-end="$emit('on-drag-end', $event)"
                          @on-add-document="beforeAdd"
                          @on-move-document="$emit('on-move-document', $event)">
        <template v-if="isOpen">
          <Document v-for="document in category.documents"
                    :key="document.id"
                    :title="document.title"
                    :comment="document.comment"
                    :data-document-id="document.id"
                    :searchText="searchText"
                    @on-drag="$emit('on-drag')"
                    @off-drag="$emit('off-drag')"
                    @delete="$emit('delete-document', document.id)" />
        </template>
      </DraggableDocuments>
    </div>
  </div>
</template>

<script>
import Category from "@/components/tree/Category";
import Document from "@/components/tree/Document";
import DraggableDocuments from "@/components/tree/DraggableDocuments";

export default {
  name: "TreeNode",
  components: {DraggableDocuments, Document, Category},
  props: {
    category: {
      type: Object,
      required: true
    },
    draggable: {
      type: Boolean,
      default: false
    },
    searchText: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    beforeAdd(evt) {
      this.isOpen = true;
      this.$emit('on-move-document', evt);
    }
  },
  watch: {
    searchText(value) {
      if (!value) {
        return;
      }
      const regex = new RegExp(value, 'i');
      const isHighlight = this.category.documents.some(document => regex.test(document.title) || regex.test(document.comment));
      if (isHighlight) {
        this.isOpen = true;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tree-node {
  display: flex;
  flex-direction: column;

  &__child-group {
    margin-left: 16px;

    &::v-deep .document {
      border-top: none;

      &:last-child {
        border-bottom: none;
      }
    }
  }

  &_ghost {
    padding: 0;
    border: none;
    border-top: 5px solid #0066FF !important;

    &::v-deep .category {
      display: none;
    }
  }

  &_ghost &__child-group, &_drag &__child-group {
    display: none;
  }

  &_open {
    border-bottom: 1px solid #DFE4EF;
  }
}
</style>