import {FC} from 'react'

type Props = {
  path?: string
}
export const ImageCell: FC<Props> = ({path}) => {
  return <>
    {
      path ? <a target="_blank" rel="noreferrer" href={`${process.env.REACT_APP_AWS_URL}${path}`}><i className='fa fa-image' /></a> : '-'
    }
  </>
}