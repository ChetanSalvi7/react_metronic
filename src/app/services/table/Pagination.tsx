import clsx from 'clsx'

function doPaging(current: number, isLoading: any, updatePage: any, {range = 1, pages = 1, start = 1}) {
  let i = Math.min(pages + start - range, Math.max(start, current - (range / 2 | 0)))
  const end = i + range
  let links = []
  links.push(<li
    key={'prev'}
    className={clsx('page-item', {
      disabled: isLoading,
      previous: true,
      next: false,
    })}
  >
    <button
      className='page-link'
      onClick={() => {
        (current !== 1) && updatePage(current - 1)
      }}
      dangerouslySetInnerHTML={{__html: '&laquo; Previous'}}
      style={{cursor: 'pointer'}}
    />
  </li>)
  while (i < end) {
    if (i > 0) {
      links.push(<li
        key={i}
        className={clsx('page-item', {
          active: current === i,
          disabled: isLoading,
          previous: false,
          next: false,
        })}
      >
        <button
          className='page-link'
          data-param={i}
          onClick={(e) => {
            updatePage(parseInt(e.currentTarget.getAttribute('data-param') as string))
          }}
          dangerouslySetInnerHTML={{__html: i.toString()}}
          style={{cursor: 'pointer'}}
        />
      </li>)
    }
    i++
  }
  links.push(<li
    key={'next'}
    className={clsx('page-item', {
      disabled: isLoading,
      previous: false,
      next: true,
    })}
  >
    <button
      className='page-link'
      onClick={() => {
        (current !== pages) && updatePage(current + 1)
      }}
      dangerouslySetInnerHTML={{__html: 'Next &raquo;'}}
      style={{cursor: 'pointer'}}
    />
  </li>)
  return links
}

export const Pagination = (currentPage: number, totalPages: number, isLoading: any, updatePage: any) => {
  const paging = {range: 5, pages: totalPages}
  return <>
    <div id='kt_table_users_paginate'>
      <ul className='pagination'>
        {doPaging(currentPage, isLoading, updatePage, paging)}
      </ul>
    </div>
  </>

}