import type { AxiosInstance } from "axios";
import { defineStore } from "pinia";
import { bills } from "~/utils/repository/bills";

export const useBillsStore = defineStore("billsStore", () => {
  const { $auth } = useNuxtApp();
  const billsRepo = bills($auth as AxiosInstance);

  /*** State */
  const billList = ref([]);
  const bill = ref({});
  const loading = ref(false);
  const errors = ref({});
  const message = ref("");

  /*** Computed */
  const getBills = computed(() => {
    return billList.value ?? [];
  });

  const getLoading = computed(() => {
    return loading.value ? true : false;
  });

  /*** Actions */
  const fetchList = () => {
    loading.value = true;
    billsRepo
      .getBills()
      .then((res) => {
        billList.value = res.data.result;
        message.value = res.data.message;
      })
      .catch((err) => {
        message.value = err;
      })
      .finally(() => (loading.value = false));
  };

  return { fetchList, getBills, getLoading };
});
