import Swal from 'sweetalert2';


export const showFailureAlert = async (msg) => {
    let text = msg !== '' ? msg : '';
    Swal.fire({
        icon: 'error',
        title: 'Đã có lỗi xảy ra',
        text: text,
        padding: '2em',
        customClass: 'sweet-alerts',
    });
}

export const showSuccessAlert = async (msg) => {
    Swal.fire({
        icon: 'success',
        title: msg,
        padding: '2em',
        customClass: 'sweet-alerts',
    });
}
