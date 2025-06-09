import Swal from "sweetalert2";

export function printError(err: any) {
    console.log(err);
    const Toast = Swal.mixin({
        toast: true,
        position: "bottom",
        showConfirmButton: false,
        timer: 2000,
    })
    return Toast.fire({
        icon: "error",
        title: err.error.error,
    });
}