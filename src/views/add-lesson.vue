<template>
    <div class="panel">
        <div class="mb-5">
            <form class="space-y-5" @submit.prevent="submitForm()">
                <div>
                    <label for="name">Tên bài học</label>
                    <input type="text" class="form-input" name="name" v-model="name" />
                </div>
                <div>
                    <label for="grade">Dành cho lớp</label>
                    <input type="text" class="form-input" name="grade" v-model="grade" />
                </div>
                <div>
                    <label for="url">Link Youtube</label>
                    <input type="text" class="form-input" name="url" v-model="url" />
                </div>
                <button type="submit" class="btn btn-primary !mt-6">Thêm</button>
            </form>
        </div>
    </div>
</template>
<script lang="ts" setup>
// Import the Vue Composition API
import { ref, onMounted } from 'vue';

// Define the form data as reactive references
const name = ref('');
const grade = ref('');
const url = ref('');

// Define a function to handle the form submission
const submitForm = async () => {
    const apiUrl = import.meta.env.VITE_APP_API_URL + 'admin/lessons';

    if (!name.value || !grade.value) {
        alert('Hãy điền vào chỗ trống');
        return;
    }

    // Create a payload object with the form data
    const payload = {
        name: name.value,
        grade: grade.value,
        url: url.value
    };

    // Send a POST request to the server with the payload
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        // Check if the response is successful
        if (response.ok) {
            // Display a success message
            alert('Thêm bài học thành công');
            // Clear the input fields
            name.value = '';
            grade.value = '';
            url.value = '';
        } else {
            // Display an error message
            alert('Lỗi khi thêm bài học');
        }
    } catch (error) {
        // Display an error message
        console.error('Something went wrong: ' + error);
    }
};


</script>