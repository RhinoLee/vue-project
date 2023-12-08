<script setup lang="ts">
import { ref } from 'vue'
import { Search, Plus } from '@element-plus/icons-vue'

defineEmits(['openCreateModal', 'searchHandler'])

const activeName = ref('search')
const searchText = ref('')
</script>

<template>
  <div>
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item title="查詢條件" name="search">
        <main>
          <el-form label-width="auto" labelPosition="left" :inline="true">
            <el-form-item label="標題">
              <el-input v-model="searchText" placeholder="請輸入標題" />
            </el-form-item>
          </el-form>
        </main>
        <footer class="footer">
          <el-row justify="end">
            <el-button type="primary" :icon="Search" @click="$emit('searchHandler', searchText)"
              >查詢</el-button
            >
            <el-button type="success" :icon="Plus" @click="$emit('openCreateModal')"
              >新增</el-button
            >
          </el-row>
        </footer>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<style scoped>
.footer {
  padding: 12px 16px;
  background-color: #ebeef5;
}
:deep(.el-collapse-item__header),
main {
  padding: 0px 16px;
}
:deep(.el-collapse-item__content) {
  padding-top: 25px;
}
</style>
