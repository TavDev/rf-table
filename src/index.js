import React, { useState, useEffect } from 'react'
import { ArrowDownUp } from 'react-bootstrap-icons'
import styles from './styles.module.scss'

export function Table(props) {
  const [selectAllChecked, setSelectAllChecked] = useState(false)
  const [callbackParams, setCallbackParams] = useState({
    type: 'pagination',
    page: props.pagination && props.pagination.page ? props.pagination.page : 1,
    limit:
      props.pagination && props.pagination.limit
        ? props.pagination.limit
        : 1000,
    filters: undefined,
    sortField: 'id',
    sortOrder: 'asc',
    cellEdit: undefined
  })

  useEffect(() => {
    if (props.onTableChange && typeof props.onTableChange === 'function') {
      props.onTableChange(callbackParams)
    }
  }, [callbackParams])

  const Header = () => {
    let elements = []
    //1. add checkbox
    if (props.selectRow) {
      elements = [
        ...elements,
        {
          content: (
            <input
              type='checkbox'
              defaultChecked={selectAllChecked}
              onClick={(e) => {
                let temp = {}
                // eslint-disable-next-line array-callback-return
                props.data.map((item, itemIndex) => {
                  temp = { ...temp, [itemIndex]: e.target.checked }
                })

                setSelectedRows(temp)
                setSelectAllChecked(e.target.checked)
                props.selectRow.onSelectAll(e.target.checked, props.data)
              }}
            />
          )
        }
      ]
    }
    //2. add other header
    if (props.columns) {
      // eslint-disable-next-line array-callback-return
      props.columns.map((column) => {
        elements = [
          ...elements,
          {
            content:
              typeof column.headerFormatter === 'function' ? (
                column.headerFormatter(column)
              ) : column.sort ? (
                <span
                  className={
                    column.dataField === callbackParams.sortField
                      ? `${styles.active} ${styles.sortable}`
                      : `${styles.sortable}`
                  }
                  onClick={() =>
                    setCallbackParams({
                      ...callbackParams,
                      sortField: column.dataField,
                      sortOrder:
                        column.dataField === callbackParams.sortField
                          ? callbackParams.sortOrder === 'asc'
                            ? 'desc'
                            : 'asc'
                          : 'asc',
                      type: 'sort'
                    })
                  }
                >
                  {column.text || column.header} <ArrowDownUp size={10} />
                  {column.dataField === callbackParams.sortField ? (
                    <span
                      className={`${styles.active} ${styles.sortOrderDesc}`}
                    >
                      {callbackParams.sortOrder}
                    </span>
                  ) : (
                    ''
                  )}
                </span>
              ) : (
                column.text || column.header
              ),
            className: column.headerClasses
          }
        ]
      })
    }
    return (
      <thead>
        <tr>
          {elements.map((element, index) => (
            <th key={index} className={element.className}>
              {element.content}
            </th>
          ))}
        </tr>
      </thead>
    )
  }

  const [selectedRows, setSelectedRows] = useState({})
  const Body = () => {
    let rows = []
    if (props.data) {
      // eslint-disable-next-line array-callback-return
      props.data.map((row, rowIndex) => {
        let elements = []
        //1. add checkbox
        if (props.selectRow) {
          elements = [
            ...elements,
            {
              content: (
                <input
                  defaultChecked={selectedRows[rowIndex]}
                  type='checkbox'
                  onClick={(e) => {
                    setSelectedRows({
                      ...selectedRows,
                      [rowIndex]: e.target.checked
                    })
                    props.selectRow.onSelect(row, e.target.checked)
                  }}
                />
              )
            }
          ]
        }
        //2. add other columns
        if (props.columns) {
          // eslint-disable-next-line array-callback-return
          props.columns.map((column) => {
            elements = [
              ...elements,
              {
                content:
                  typeof column.formatter === 'function'
                    ? column.formatter(row)
                    : row[column.dataField],
                className: column.classes
              }
            ]
          })
        }
        rows = [...rows, elements]
      })
    }

    return (
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((field, fieldIndex) => (
              <td key={fieldIndex} className={field.className}>
                {field.content}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    )
  }

  const pageLinkGenerator = (page, totalPage) => {
    let result = { prev: true, pages: [], next: true }
    if (page === 1) result = { ...result, prev: false }
    if (page === totalPage) result = { ...result, next: false }
    const range = [-2, -1, 0, 1, 2]
    // eslint-disable-next-line array-callback-return
    range.map((value) => {
      if (page + value > 0 && page + value <= totalPage) {
        result = { ...result, pages: [...result.pages, page + value] }
      }
    })
    return result
  }

  const Footer = () => {
    const configs = pageLinkGenerator(
      props.pagination.page,
      props.pagination.totalPage
    )
    return (
      <div className={`rfPager ${styles.pager}`}>
        <div className={styles.selector}>
          <div className='grid-filter'>
            <div className='mb-md-0 mb-3'>
              <select
                className='form-select'
                defaultValue={callbackParams.limit}
                onChange={(e) => {
                  setCallbackParams({
                    ...callbackParams,
                    limit: e.target.value,
                    type: 'pagination'
                  })
                }}
              >
                <option>5</option>
                <option>10</option>
                <option>30</option>
                <option>50</option>
                <option>100</option>
              </select>
            </div>
          </div>
        </div>

        <div className={styles.pages}>
          <ul>
            <li
              className={
                configs.prev
                  ? `${styles.pageItem}`
                  : `${styles.pageItem} ${styles.disabled}`
              }
            >
              <button
                className='border-1 border-light rounded-left page-link'
                onClick={() =>
                  setCallbackParams({
                    ...callbackParams,
                    page: callbackParams.page - 1,
                    type: 'pagination'
                  })
                }
              >
                {props.pagination.prePageText || 'Previous'}
              </button>
            </li>

            {configs.pages.map((pageItem, itemIndex) => (
              <li
                key={itemIndex}
                className={
                  pageItem === callbackParams.page
                    ? `${styles.pageItem} ${styles.active}`
                    : `${styles.pageItem}`
                }
              >
                <button
                  className='border-1 border-light  rounded-0 page-link'
                  onClick={() =>
                    setCallbackParams({
                      ...callbackParams,
                      page: pageItem,
                      type: 'pagination'
                    })
                  }
                >
                  {pageItem}
                </button>
              </li>
            ))}
            <li
              className={
                configs.next
                  ? `${styles.pageItem}`
                  : `${styles.pageItem} ${styles.disabled}`
              }
            >
              <button
                className='border-1 border-light rounded-right page-link'
                onClick={() =>
                  setCallbackParams({
                    ...callbackParams,
                    page: callbackParams.page + 1,
                    type: 'pagination'
                  })
                }
              >
                {props.pagination.nextPageText || 'Next'}
              </button>{' '}
            </li>
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`rfWrapper ${
        props.wrapperClassName ? props.wrapperClassName : ''
      }`}
    >
      <table className={`rfTable ${styles.table} ${props.className}`}>
        <Header />
        <Body />
      </table>
      {props.pagination ? <Footer /> : ''}
    </div>
  )
}
