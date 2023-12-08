<script setup lang="ts">
import { ref, watch } from 'vue'
import { genFileId } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { useField } from 'vee-validate'

import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'

export interface Props {
  name: string
  label: string
  placeholder?: string
  isModalVisible?: boolean
}

const props = defineProps<Props>()

const { value } = useField(() => props.name)

const isShowPreview = ref(true)

const toBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
  })
}

const handleChange: UploadProps['onChange'] = async (uploadFile) => {
  if (uploadFile && uploadFile.raw) {
    const base64 = await toBase64(uploadFile.raw)
    // 轉成 base64 設定到表單 value 中
    value.value = base64

    // 編輯時，如果有上傳新的圖片，隱藏原本圖片
    isShowPreview.value = false
  } else {
    value.value = ''
  }
}

const upload = ref<UploadInstance>()
const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

// 關閉 or 開啟 modal 時，進行初始化
watch(
  () => props.isModalVisible,
  (isModalVisible) => {
    if (!isModalVisible) {
      upload.value!.clearFiles()
    } else {
      isShowPreview.value = Boolean(value.value)
    }
  },
  { immediate: true }
)
</script>

<template>
  <el-col :span="24">
    <label class="el-form-item__label">{{ label }}</label>
    <el-upload
      ref="upload"
      class="avatar-uploader"
      list-type="picture-card"
      accept="image/*"
      :on-change="handleChange"
      :on-exceed="handleExceed"
      :limit="1"
      :auto-upload="false"
    >
      <img v-if="isShowPreview && value" :src="value as string" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
  </el-col>
</template>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader :deep(.el-upload) {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader :deep(.el-upload):hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.avatar-uploader img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
</style>
