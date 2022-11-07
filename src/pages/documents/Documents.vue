<template>
  <div class="documents">
    <Header @change-search-text="onChangeSearchText" />
    <Tree class="documents__tree"
          :categories="categories"
          :documents="documents"
          :search-text="searchText"
          @delete-category="deleteCategory"
          @delete-document="deleteDocument"
          @move-document="moveDocument" />
  </div>
</template>

<script>
import Header from "@/pages/documents/Header";
import Tree from "@/components/tree/Tree";

const CATEGORIES = [
  {
    id: 1,
    title: 'Обязательные для всех',
    description: 'Документы, обязательные для всех сотрудников без исключения'
  },
  {
    id: 2,
    title: 'Обязательные для трудоустройства',
    description: 'Документы, без которых невозможно трудоустройство человека на какую бы то ни было должность в компании вне зависимости от граж'
  },
  {
    id: 3,
    title: 'Специальные'
  }
];

const DOCUMENTS = [
  {
    id: 1,
    parentId: 1,
    title: 'Паспорт',
    comment: 'Для всех'
  },
  {
    id: 2,
    parentId: 1,
    title: 'ИНН',
    comment: 'Для всех'
  },
  {
    id: 3,
    parentId: null,
    title: 'Трудовой договор'
  },
  {
    id: 4,
    parentId: null,
    title: 'Мед. книжка'
  },
  {
    id: 5,
    parentId: 2,
    title: 'Какой то документ',
    comment: 'Его описание'
  },
  {
    id: 6,
    parentId: 2,
    title: 'Еще документ',
    comment: 'Его описание'
  }
];

export default {
  name: "Documents",
  components: {Tree, Header},
  data() {
    return {
      categories: CATEGORIES,
      documents: DOCUMENTS,
      searchText: ''
    }
  },
  methods: {
    deleteCategory(id) {
      this.documents = this.documents.filter(document => document.parentId !== id);
      this.categories = this.categories.filter(category => category.id !== id);
    },
    deleteDocument(id) {
      this.documents = this.documents.filter(document => document.id !== id);
    },
    moveDocument(documentId, to) {
      const documentIndex = this.documents.findIndex(document => document.id === documentId);
      const document = {...this.documents[documentIndex], parentId: to.categoryId};
      const documents = [...this.documents.slice(0, documentIndex), ...this.documents.slice(documentIndex + 1)];

      let newIndex = 0, localIndex = 0;
      for (const document of documents) {
        if (localIndex === to.index) {
          break;
        }
        if (document.parentId === to.categoryId) {
          localIndex++;
        }
        newIndex++;
      }

      this.documents = [...documents.slice(0, newIndex), {...document}, ...documents.slice(newIndex)]
    },
    onChangeSearchText(value) {
      this.searchText = value;
    }
  }
}
</script>

<style lang="scss" scoped>
.documents {
  padding: 38px 30px;

  &__tree {
    margin-top: 19px;
  }
}
</style>