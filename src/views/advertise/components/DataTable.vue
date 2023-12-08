<script setup lang="ts">
import { Edit } from '@element-plus/icons-vue'

export interface Props {
  tableData: []
}

defineEmits(['openEditModal'])

defineProps<Props>()
</script>

<template>
  <el-table :data="tableData" border style="width: 100%">
    <!-- 圖片 -->
    <el-table-column label="圖片" width="180">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-image v-if="scope.row.image" :src="scope.row.image" />
        </div>
      </template>
    </el-table-column>
    <!-- 標題 -->
    <el-table-column prop="title" label="標題" />
    <!-- 功能 -->
    <el-table-column label="功能" width="120">
      <template #default="scope">
        <el-button link type="primary" size="small">
          <el-icon @click="$emit('openEditModal', scope.row)"><Edit /></el-icon>
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style lang="less" scoped></style>
