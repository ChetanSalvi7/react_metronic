import Swal from 'sweetalert2'


export const DeleteListItem = (deleteItem: any, setLoading:any) => {
  return Swal.fire({
    icon: 'warning',
    title: 'Are you sure?',
    text: 'You won\'t be able to revert this!',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
    reverseButtons: true,
    allowOutsideClick: false,
  }).then(async (result) => {
    if (result.isConfirmed) {
      setLoading(true)
      await deleteItem.mutateAsync()
    }
  })
}

export const UpdateMarkup = (updateMarkupData: any) => {
  return Swal.fire({
    icon: 'warning',
    title: 'Are you sure?',
    text: 'You won\'t be able to revert this! This will change all your daily prices.',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
    focusCancel: true,
    reverseButtons: true,
    allowOutsideClick: false,
  }).then(async (result) => {
    if (result.isConfirmed) {
      await updateMarkupData.mutateAsync()
    }
  })
}