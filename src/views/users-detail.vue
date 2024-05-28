<template>
    <div>
        <div class="panel py-0 pt-5 flex justify-start">
            <button @click.prevent="handleBack" class="btn btn-danger w-1/6">Trờ về</button>
        </div>
        <div class="panel pb-6 flex justify-center">
            <div class="w-11/12 md:w-custom">
                <h4 class="font-semibold text-xl text-center mb-4 text-blue-600">Chi tiết người dùng</h4>
                <div>
                    <label>Họ và tên</label>
                    <input v-model="user.fullName" type="text" class="form-input my-1" disabled />
                </div>
                <div>
                    <label>Tên đăng nhập</label>
                    <input v-model="user.username" type="text" class="form-input my-1" disabled />
                </div>
                <div>
                    <label>Email</label>
                    <input v-model="user.email" type="email" class="form-input my-1" disabled />
                </div>
                <div>
                    <label>Trạng thái</label>
                    <input v-model="user.status" type="text" class="form-input my-1" disabled />
                </div>
                <div>
                    <label>Phân quyền</label>
                    <input v-model="user.role" type="email" class="form-input my-1" disabled />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import axios from 'axios';
    import { useMeta } from '@/composables/use-meta';
    import { LOCAL_STORAGE_AUTH } from '@/utils/constants';
    import { localStorageHelper } from '@/utils/helper';
    import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';

    const router = useRouter();
    const route = useRoute();

    useMeta({ title: 'Chi tiết người dùng' });

    interface UserType {
        username: string;
        fullName: string;
        password: string;
        role: string;
        email: string;
        status: string;
    }

    const user = ref<UserType>({
        username: '',
        fullName: '',
        password: '',
        role: '',
        email: '',
        status: '',
    });

    const rows = ref([] || []);

    const fetchData = () => {
        const apiUrl = import.meta.env.VITE_APP_API_URL + 'admin/users';

        const headers = {
            Authorization: 'Bearer ' + localStorageHelper.get(LOCAL_STORAGE_AUTH),
        };

        axios
            .get(apiUrl, { headers })
            .then((response) => {
                const data = response.data.data as UserType[];
                user.value = data.find((user) => user?.username === route.params.username);
                user.value.status = user.value.status ? 'Active' : 'Inactive';
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };
    console.log(user.value);

    const handleBack = () => router.push('/nguoi-dung');

    onMounted(() => {
        fetchData();
    });
</script>
