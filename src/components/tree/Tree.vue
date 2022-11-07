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
                @on-move="onMoveDocument"
                @on-drag="draggable=true"
                @off-drag="draggable=false"
                @delete-category="id => $emit('delete-category', id)"
                @delete-document="id => $emit('delete-document', id)" />
    </draggable>
    <div class="tree__parentless-docs">
      <draggable group="documents"
                 ghostClass="document_ghost"
                 dragClass="document_drag"
                 :disabled="!draggable && !isDragging"
                 @start="onDragStart"
                 @end="onDragEnd"
                 @add="onMoveDocument"
                 @update="onMoveDocument"
                 :value="parentlessDocs"
                 :removeCloneOnHide="false">
        <Document v-for="document in parentlessDocs"
                  :key="document.id"
                  :title="document.title"
                  :comment="document.comment"
                  :data-document-id="document.id"
                  :searchText="searchText"
                  @on-drag="draggable=true"
                  @off-drag="draggable=false"
                  @delete="$emit('delete-document', document.id)" />
      </draggable>
    </div>
  </div>
</template>

<script>
import Document from "@/components/tree/Document";
import TreeNode from "@/components/tree/TreeNode";
import draggable from 'vuedraggable';

export default {
  name: "Tree",
  components: {TreeNode, Document, draggable},
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
      tree: this.getTree(),
      parentlessDocs: this.getParentlessDocs(),
      draggable: false,
      isDragging: false
    };
  },
  methods: {
    getTree() {
      return this.categories.map(category => {
        const documents = this.documents.filter(document => document.parentId === category.id);
        return {...category, isOpen: false, documents}
      })
    },
    getParentlessDocs() {
      return this.documents.filter(document => document.parentId === null);
    },
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
  watch: {
    categories() {
      this.tree = this.getTree();
      this.parentlessDocs = this.getParentlessDocs();
    },
    documents() {
      this.tree = this.getTree();
      this.parentlessDocs = this.getParentlessDocs();
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