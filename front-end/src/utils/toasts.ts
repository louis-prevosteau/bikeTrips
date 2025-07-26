import i18next from 'i18next';
import { toast } from 'react-toastify';

export const handleSuccess = (message: string) => {
    toast.success(message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        pauseOnHover: false,
        closeOnClick: true,
    });
};

export const handleError = (error: any) => {
    if (error.response?.data?.message) {
        toast.error(i18next.t(error.response?.data?.message), {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            pauseOnHover: false,
            closeOnClick: true,
        });
    }
};