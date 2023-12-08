import { defineStore } from 'pinia'
import { getAdListAPI, createAdAPI, editAdAPI, filterAdAPI } from '@/services/advertise'
import type { AdvertiseObj } from '@/services/advertise'

interface State {
  tableData: []
}

const useAdvertiseStore = defineStore({
  id: 'advertise',
  state: (): State => ({
    tableData: []
  }),
  actions: {
    async getData() {
      try {
        const result = await getAdListAPI()
        this.tableData = result?.data ?? []
      } catch (error) {
        console.log(error)
      }
    },
    async createData(data: AdvertiseObj) {
      try {
        await createAdAPI(data)
      } catch (error) {
        console.log(error)
      }
    },
    async editData(data: AdvertiseObj) {
      try {
        await editAdAPI(data)
      } catch (error) {
        console.log(error)
      }
    },
    async filterData(data: string) {
      try {
        const result = await filterAdAPI(data)
        this.tableData = result?.data ?? []
      } catch (error) {
        console.log(error)
      }
    }
  }
})

export default useAdvertiseStore
