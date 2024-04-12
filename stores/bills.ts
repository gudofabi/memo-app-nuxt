import type { AxiosInstance } from "axios";
import { defineStore } from "pinia";
import type { BillType } from "~/types/billTypes";
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

  const getBill = computed(() => {
    return bill.value ?? {};
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

  const fetchBillById = (id: string) => {
    loading.value = true;
    billsRepo
      .getBillById(id)
      .then((res) => {
        bill.value = res.data.result;
        message.value = res.data.message;
      })
      .catch((err) => {
        message.value = err.response.data.message;
      })
      .finally(() => (loading.value = false));
  };

  const update = async (id: string, params: BillType) => {
    return await billsRepo.updateBill(id, params);
  };

  const create = async (params: BillType) => {
    return await billsRepo.createBill(params);
  };

  const destroy = async (billId: string) => {
    return await billsRepo.deleteBill(billId);
  };

  return {
    fetchList,
    fetchBillById,
    update,
    create,
    destroy,
    getBills,
    getBill,
    getLoading,
  };
});
