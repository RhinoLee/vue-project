import { ref } from 'vue'
import type DynamicForm from '@/components/DynamicForm.vue'

const useDynamicForm = () => {
  const formMadalRef = ref<InstanceType<typeof DynamicForm> | null>(null)

  function createClickHandler() {
    formMadalRef.value?.setModalVisible()
  }
  function editClickHandler(itemData: any) {
    formMadalRef.value?.setModalVisible(itemData)
  }

  return { formMadalRef, createClickHandler, editClickHandler }
}

export default useDynamicForm
