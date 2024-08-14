import { defineStore } from 'pinia';
import axios from 'axios';

export const useService = defineStore({
  id: 'service',
  state: () => ({
    service: [],
  }),
  actions: {
    setService(data) {
      this.service = data;
    },
    pushService(data) {
      this.service.push(data);
    },
  },
  getters: {},
});
