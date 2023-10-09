import React, {ReactNode} from "react";
import Swal from "sweetalert2";


interface actionButtonParameters {
    onClick: () => void,
    checkAccessName?: string,
    children: ReactNode
}

export function DeleteIconButton({
                                     onClick,
                                     checkAccessName = '',
                                     children
                                 }: actionButtonParameters) {
    const handleClick = () => {
        Swal.fire({
            title: 'Are you sure',
            text: `you would like to remove this record ?`,
            icon: 'warning',
            cancelButtonText: `Cancel`,
            confirmButtonText: `Confirm`,
            showCancelButton: true,
            // confirmButtonColor: '#E97015',
            // cancelButtonColor: '#D7DADD',
        }).then((result) => {
            if (result.isConfirmed) {
                onClick()
            }
        });
    }
    return <span role={'button'} onClick={handleClick}>{children}</span>
}


interface LogoutInterface {
    onClick: () => void,
    children: ReactNode
}


export  function LogOutWithAlert({onClick,children}:LogoutInterface){
    const handleClick = () => {
        Swal.fire({
            title: 'Are you sure ?',
            // text: `you would like to log out ?`,
            icon: 'warning',
            cancelButtonText: `Cancel`,
            confirmButtonText: `Confirm`,
            showCancelButton: true,
            // confirmButtonColor: '#E97015',
            // cancelButtonColor: '#D7DADD',
        }).then((result) => {
            if (result.isConfirmed) {
                onClick()
            }
        });
    }
    return <span role={'button'} onClick={handleClick}>{children}</span>
}