<template>
  <div class="tree">
    <draggable group="categories"
               ghostClass="tree-node_ghost"
               dragClass="tree-node_drag"
               @start="onDragStart"
               @end="onDragEnd"
               :disabled="!draggable && !isDragging"
               :removeCloneOnHide="false">
      <TreeNode v-for="category in tree"
                :key="category.id"
                :category="category"
                :searchText="searchText"
                :draggable="draggable || isDragging"
                @on-drag-start="onDragStart"
                @on-drag-end="onDragEnd"
                @on-move-document="onMoveDocument"
                @on-drag="draggable=true"
                @off-drag="draggable=false"
                @delete-category="id => $emit('delete-category', id)"
                @delete-document="id => $emit('delete-document', id)" />
    </draggable>
    <div class="tree__parentless-docs">
      <DraggableDocuments :is-disable="!draggable && !isDragging"
                          :value="parentlessDocs"
                          @on-drag-start="onDragStart"
                          @on-drag-end="onDragEnd"
                          @on-add-document="onMoveDocument"
                          @on-move-document="onMoveDocument">
        <Document v-for="document in parentlessDocs"
                  :key="document.id"
                  :title="document.title"
                  :comment="document.comment"
                  :data-document-id="document.id"
                  :searchText="searchText"
                  @on-drag="draggable=true"
                  @off-drag="draggable=false"
                  @delete="$emit('delete-document', document.id)" />
      </DraggableDocuments>
    </div>
  </div>
</template>

<script>
import Document from "@/components/tree/Document";
import TreeNode from "@/components/tree/TreeNode";
import draggable from 'vuedraggable';
import DraggableDocuments from "@/components/tree/DraggableDocuments";

export default {
  name: "Tree",
  components: {DraggableDocuments, TreeNode, Document, draggable},
  props: {
    categories: {
      type: Array,
      default: () => []
    },
    documents: {
      type: Array,
      default: () => []
    },
    searchText: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      draggable: false,
      isDragging: false
    };
  },
  methods: {
    onDragStart(evt) {
      this.isDragging = true;
      evt.clone.style.display = "flex";
      evt.clone.style.opacity = "0.2";
    },
    onDragEnd() {
      this.isDragging = false;
    },
    onMoveDocument(evt) {
      const documentId = parseInt(evt.item.getAttribute('data-document-id'));
      const to = {
        categoryId: parseInt(evt.to.getAttribute('data-category-id')) || null,
        index: evt.newIndex
      };
      this.$emit('move-document', documentId, to);
    }
  },
  computed: {
    tree() {
      return this.categories.map(category => {
        const documents = this.documents.filter(document => document.parentId === category.id);
        return {...category, isOpen: false, documents}
      })
    },
    parentlessDocs() {
      return this.documents.filter(document => document.parentId === null);
    }
  }
}
</script>

<style lang="scss" scoped>
.tree {
  display: flex;
  flex-direction: column;
  max-width: 1190px;

  &::v-deep {
    .tree-node + .tree-node .category, .document + .document {
      border-top: none;
    }

    .tree-node_open:last-of-type {
      border-bottom: none;

      .tree-node__child-group:last-of-type {
        border-bottom: 1px solid #DFE4EF;
      }
    }
  }

  &__parentless-docs {
    margin-top: 14px;
  }
}
</style>