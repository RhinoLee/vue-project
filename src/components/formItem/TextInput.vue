<script setup lang="ts">
import { useField } from 'vee-validate'

export interface Props {
  name: string
  label: string
  placeholder: string
}

const props = defineProps<Props>()

const { value, errorMessage } = useField(() => props.name)
</script>

<template>
  <el-col :span="12">
    <el-form label-width="auto" label-position="top">
      <el-form-item :label="label" :class="{ 'is-error': errorMessage }">
        <el-input v-model="value" :name="name" :placeholder="placeholder" />
        <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
      </el-form-item>
    </el-form>
  </el-col>
</template>
