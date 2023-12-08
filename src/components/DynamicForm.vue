<script setup lang="ts">
import { ref, type Component } from 'vue'
import { useForm } from 'vee-validate'
import TextInput from '@/components/formItem/TextInput.vue'
import SelectInput from '@/components/formItem/SelectInput.vue'
import SingleImageInput from '@/components/formItem/SingleImageInput.vue'
import type { FormSchema } from '@/types/form'
import type { AdvertiseObj } from '@/services/advertise'

interface Props {
  validationSchema: Object
  formSchema: FormSchema
  defaultFormValues: AdvertiseObj
}

const props = defineProps<Props>()
const emit = defineEmits(['onCreateSubmit', 'onEditSubmit'])

// 從配置文件的 type 決定要使用哪種 formItem
function resolveComponent(type: string): Component | undefined {
  if (type === 'text') return TextInput
  if (type === 'select') return SelectInput
  if (type === 'singleImage') return SingleImageInput
}

const { resetForm, handleSubmit } = useForm({
  validationSchema: props.validationSchema
})

const isModalVisible = ref(false)
const isCreateForm = ref(true)
function setModalVisible(data?: AdvertiseObj) {
  isModalVisible.value = !isModalVisible.value

  if (data) {
    // 編輯表單
    isCreateForm.value = false
    // 將 data 資料設定到表單的初始值
    resetForm({ values: data })
  } else {
    // 新增表單
    isCreateForm.value = true
    // 重置表單的初始值
    resetForm({ values: props.defaultFormValues })
  }
}

function cancelHandler() {
  setModalVisible()
}

const onSubmit = handleSubmit((values) => {
  if (isCreateForm.value) {
    emit('onCreateSubmit', values)
  } else {
    emit('onEditSubmit', values)
  }
  setModalVisible()
})

defineExpose({
  setModalVisible
})
</script>

<template>
  <el-dialog v-model="isModalVisible" title="新增資訊">
    <div>
      <form>
        <el-row :gutter="16">
          <template v-for="(field, idx) in formSchema.fields" :key="idx + field.label">
            <component
              :is="resolveComponent(field.type)"
              :name="field.name"
              :label="field.label"
              :placeholder="field.placeholder"
              :options="field.options ?? null"
              :isModalVisible="isModalVisible"
            />
          </template>
        </el-row>
      </form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="onSubmit">儲存</el-button>
        <el-button @click="cancelHandler">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>
