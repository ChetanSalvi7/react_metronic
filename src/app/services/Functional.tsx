import Swal from 'sweetalert2'
import {useNavigate} from 'react-router-dom'
import {shallowEqual, useSelector} from 'react-redux'
// @ts-ignore
import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'
import React from 'react'
import {RootState} from '../../setup'


export function CheckAccess(module: any) {
    const accesses = useSelector<RootState>(({auth}) => auth.accesses, shallowEqual)
    if (accesses) {
        // @ts-ignore
        return accesses.includes(module)
    }
    return false
}

export function CheckModulesAccess(modules: string[]) {
    const accesses = useSelector<RootState>(({auth}) => auth.accesses, shallowEqual)
    if (accesses) {
        // @ts-ignore
        return accesses.some((ai) => modules.includes(ai))
    }
    return false
}

export function IsRootUserOrAdmin() {
    const user: any = useSelector<RootState>(({auth}) => auth.user, shallowEqual)
    return user?.is_root || user?.group?.id === 1
}

export const handleNotificationPrompt = (
    title: any,
    message: any,
    icon: any,
    history: any,
    redirect_to: any = ''
) => {
    Swal.fire({
        title: title,
        html: message,
        icon: icon,
        allowOutsideClick: false,
    }).then(() => {
        Swal.close()
        if (redirect_to !== '') {
            history.push(redirect_to)
        }
    })
}

export const handleNotificationWithToastify = (
    data: any,
    history: any = null,
    redirect_to: any = ''
) => {
    Toastify({
        text: data.message,
        duration: 3000,
        newWindow: true,
        gravity: 'top',
        position: 'right',
        className: data?.success ? 'toastify-info' : 'toastify-error',
        stopOnFocus: true,
        onClick: function () {
            if (redirect_to !== '') {
                history.push(redirect_to)
            }
        },
    }).showToast()
}

export const SYSTEM_MODULES = {
    navigation: {
        administrative_links: {
            booking: [
                'bookings.index',
                'bookings.create',
                'bookings.show',
                'bookings.edit',
                'bookings.delete',
            ],
            group: ['groups.index', 'groups.create', 'groups.show', 'groups.edit', 'groups.delete'],
            configuration: ['configurations.index'],
            calendar: ['calendar.index'],
        },

        masters: {
            agent: ['agents.index', 'agents.create', 'agents.show', 'agents.edit', 'agents.delete'],
            hotel: [
                'hotels.index',
                'hotels.create',
                'hotels.show',
                'hotels.edit',
                'hotels.delete',

            ],
            sight_seeing: [
                'sight_seeings.index',
                'sight_seeings.create',
                'sight_seeings.show',
                'sight_seeings.edit',
                'sight_seeings.delete',
                'sight_seeings.stop_sale',
            ],
            user: ['users.index', 'users.create', 'users.show', 'users.edit', 'users.delete'],
            attendance: [
                'attendances.index',
                'attendances.create',
                'attendances.show',
                'attendances.edit',
                'attendances.delete',
                'attendances.approved',
            ],
            banner: ['banners.index', 'banners.create', 'banners.show', 'banners.edit', 'banners.delete'],
        },
    },
}

export function BackButton() {
    const navigate = useNavigate()
    return (
        <button
            className='btn btn-secondary'
            type='button'
            onClick={() => {
                navigate(-1)
                /*Swal.fire({
                  icon: 'warning',
                  title: 'Are you sure?',
                  text: 'The changes added would be lost, do you still want to exit?',
                  showCancelButton: true,
                  confirmButtonText: 'Yes',
                  cancelButtonText: 'No',
                  reverseButtons: true,
                  allowOutsideClick: false,
                }).then(result => {
                  if (result.isConfirmed) {
                    navigate(-1)
                  }
                })*/
            }}
        >
            Back
        </button>
    )
}

export function BackButtonForDetailPage({path = ''}) {
    const navigate = useNavigate()
    return (
        <button
            className='btn btn-outline-secondary'
            type='button'
            onClick={() => {
                path ? navigate(path) : navigate(-1)
            }}
        >
            Back
        </button>
    )
}

export function PurposeForm({type}: any) {
    return (
        <div className='col-md-4'>
            <div className='card gutter-b'>
                <div className='card-body'>
                    <p className='font-weight-bolder text-uppercase mb-10'>
                        {`PURPOSE.${type}.TITLE`}
                    </p>
                    <p>{`PURPOSE.${type}.DESCRIPTION`}</p>
                </div>
            </div>
        </div>
    )
}

export function SubmitForm({handleSubmit, values}: any) {
    return (
        <div className='row'>
            <div className='col-md-12'>
                <div className='form-group'>
                    <button
                        type='submit'
                        name='submit'
                        className='btn btn-primary me-2'
                        onSubmit={() => handleSubmit()}
                    >
                        {values.id ? 'Update' : 'Create'}
                    </button>
                    <BackButton/>
                </div>
            </div>
        </div>
    )
}


export const handleManualChange = (handleChange: any, name: string, value: string) => {
    let event = {
        target: {
            name: name,
            value: value,
        },
    }
    handleChange(event)
}


export const checkEmpty = (value: string) => {
    return value ? value : '-'
}

// export const serializeValueWithArray = (values: any) => {
//   const options = {
//     indices: true,
//     nullsAsUndefineds: false,
//     booleansAsIntegers: false,
//     allowEmptyArrays: true,
//   }
//   return serialize(values, options)
// }



export const getInitials = (name: any) => {
    name = !!name ? name.split(' ') : ['Amigo', 'Amigo']
    if (name.length > 2) {
        name = [name[0], name[name.length - 1]]
    }
    return name.length > 1
        ? name[0].substring(0, 1).toUpperCase() + name[1].substring(0, 1).toUpperCase()
        : name[0].substring(0, 1).toUpperCase()
}

export const convertBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.onload = () => {
            resolve(fileReader.result)
        }
        fileReader.onerror = (error) => {
            reject(error)
        }
    })
}
