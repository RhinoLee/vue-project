<script setup lang="ts">
import { useField } from 'vee-validate'
import type { Option } from '@/types/form'

export interface Props {
  name: string
  label: string
  placeholder: string
  options: Option[]
}

const props = defineProps<Props>()

const { value, errorMessage } = useField(() => props.name)
</script>

<template>
  <el-col :span="12">
    <el-form label-width="auto" label-position="top">
      <el-form-item :label="label" :class="{ 'is-error': errorMessage }">
        <el-select v-model="value" :name="name" :placeholder="placeholder">
          <template v-for="option in options" :key="option.value">
            <el-option :label="option.label" :value="option.value" />
          </template>
        </el-select>
        <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
      </el-form-item>
    </el-form>
  </el-col>
</template>
