<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import useAdvertiseStore from '@/stores/advertise/advertise'
import FilterBar from '@/components/FilterBar.vue'
import DynamicForm from '@/components/DynamicForm.vue'
import { formSchema, defaultFormValues } from './config/formSchema'
import useDynamicForm from '@/composables/useDynamicForm'
import validationSchema from './config/validationSchema'
import DataTable from './components/DataTable.vue'
import type { AdvertiseObj } from '@/services/advertise'

const advertiseStore = useAdvertiseStore()
const { tableData } = storeToRefs(advertiseStore)

const { formMadalRef, createClickHandler, editClickHandler } = useDynamicForm()

const onCreateSubmit = async (values: AdvertiseObj) => {
  // Remove the 'id' field from the values object
  delete values.id

  await advertiseStore.createData(values)
  await advertiseStore.getData()
}

const onEditSubmit = async (values: AdvertiseObj) => {
  await advertiseStore.editData(values)
  await advertiseStore.getData()
}

const searchHandler = async (searchText: string) => {
  if (searchText) {
    await advertiseStore.filterData(searchText)
  } else {
    await advertiseStore.getData()
  }
}

onMounted(async () => {
  await advertiseStore.getData()
})
</script>

<template>
  <div>
    <div class="common-layout">
      <el-container>
        <el-header height="auto">
          <FilterBar
            @openCreateModal="createClickHandler"
            @searchHandler="searchHandler"
          ></FilterBar>
        </el-header>
        <el-main>
          <DataTable :tableData="tableData" @openEditModal="editClickHandler"></DataTable>
        </el-main>
      </el-container>
    </div>

    <DynamicForm
      ref="formMadalRef"
      :formSchema="formSchema"
      :validationSchema="validationSchema"
      :defaultFormValues="defaultFormValues"
      @onCreateSubmit="onCreateSubmit"
      @onEditSubmit="onEditSubmit"
    ></DynamicForm>
  </div>
</template>

<style scoped></style>
