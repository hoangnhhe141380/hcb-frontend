<template>
    <div>
        <div class="panel py-0 pt-5 flex justify-start">
            <button @click.prevent="handleBack" class="btn btn-danger w-1/6">Trờ về</button>
        </div>
        <div class="panel pb-6 flex justify-center">
            <div class="w-11/12 md:w-custom">
                <h4 class="font-semibold text-xl text-center mb-4 text-blue-600">Thêm người dùng</h4>
                <form @submit.prevent="handleAddUser">
                    <div>
                        <label>Tên đăng nhập</label>
                        <input v-model="newUser.username" type="text" class="form-input my-1" required />
                    </div>
                    <div>
                        <label>Mật Khẩu</label>
                        <input v-model="newUser.password" type="password" class="form-input my-1" required />
                    </div>
                    <div>
                        <label>Họ và tên</label>
                        <input v-model="newUser.fullName" type="text" class="form-input my-1" required />
                    </div>
                    <div>
                        <label>Email</label>
                        <input v-model="newUser.email" type="email" class="form-input my-1" required />
                    </div>
                    <div>
                        <label>Phân quyền</label>
                        <multiselect
                            v-model="newUser.role"
                            :options="roles"
                            class="custom-multiselect"
                            :searchable="true"
                            placeholder="Chọn quyền"
                            :label="'label'"
                            select-label=""
                            deselect-label=""
                            :close-on-select="true"
                            aria-required="true"
                        >
                        </multiselect>
                    </div>
                    <button type="submit" class="btn btn-primary mt-6 w-1/3 mx-auto">Xác nhận</button>
                </form>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { ref, onMounted, computed } from 'vue';
    import { useRouter } from 'vue-router';
    import Vue3Datatable from '@bhplugin/vue3-datatable';
    import axios from 'axios';
    import { useAppStore } from '@/stores/index';
    import { useMeta } from '@/composables/use-meta';
    import { RESPONSE_STATUS, LOCAL_STORAGE_AUTH } from '@/utils/constants';
    import { localStorageHelper } from '@/utils/helper';
    import Multiselect from '@suadelabs/vue3-multiselect';
    import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
    import { roles } from '../contants/roles';
    import Swal from 'sweetalert2';

    const router = useRouter();

    useMeta({ title: 'Người dùng' });

    interface UserFormType {
        username: string;
        fullName: string;
        password: string;
        role: {
            label: string;
            value: string;
        };
        email: string;
    }

    const newUser = ref<UserFormType>({
        username: '',
        fullName: '',
        password: '',
        role: {
            label: 'Admin',
            value: 'ADMIN',
        },
        email: '',
    });

    const handleAddUser = async () => {
        console.log(newUser.value);

        const apiUrl = import.meta.env.VITE_APP_API_URL + 'admin/users';
        const headers = {
            Authorization: 'Bearer ' + localStorageHelper.get(LOCAL_STORAGE_AUTH),
        };
        const payload = {
            ...newUser.value,
            role: newUser.value.role.value,
        };

        try {
            const response = await axios.post(apiUrl, payload, { headers }); // Make the POST request
            if (response.data.status.displayMessage === 'Success.') {
                showSuccessAlert();
                handleBack();
            }
        } catch (error) {
            showFailureAlert();
        }
    };

    const handleBack = () => router.push('/nguoi-dung');

    const showFailureAlert = async () => {
        Swal.fire({
            icon: 'error',
            title: 'Đã có lỗi xảy ra',
            padding: '2em',
            customClass: 'sweet-alerts',
        });
    };

    const showSuccessAlert = async () => {
        Swal.fire({
            icon: 'success',
            title: 'Thêm người dùng thành công',
            padding: '2em',
            customClass: 'sweet-alerts',
        });
    };
</script>
