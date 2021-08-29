import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchFunction } from './todoSlice'
import { Table } from 'rf-table'
import 'rf-table/dist/index.css'
import { useParams, useHistory, generatePath } from 'react-router-dom'

export default function Todo() {
  const { page, limit } = useParams()
  const [sort, setSort] = useState({ field: 'id', order: 'asc' })
  const dispatch = useDispatch()
  const link = '/:page?/:limit?'
  const history = useHistory()
  const list = useSelector((state) => state.todo.list)
  const pagination = useSelector((state) => state.todo.pagination)
  useEffect(() => {
    dispatch(fetchFunction({ page, limit, sort }))
  }, [page, limit, sort, dispatch])

  const columns = [
    {
      dataField: 'id',
      header: 'ID',
      sort: true
    },
    {
      dataField: 'message',
      header: 'Message',
      sort: true,
      formatter: (row) => <>{`${row.id} ${row.message}`}</>
    }
  ]

  const selectRow = {
    mode: 'checkbox',
    clickToSelect: true,
    onSelect: (row, isSelect) => {
      console.log(row, isSelect)
    },
    onSelectAll: (isSelect, rows) => {
      console.log(rows, isSelect)
    }
  }

  return (
    <div>
      {list && (
        <Table
          className='table table-borderless table-striped m-0 align-middle'
          columns={columns}
          data={list}
          selectRow={selectRow}
          pagination={{
            page: page ? parseInt(page) : 1,
            limit: limit ? parseInt(limit) : 10,
            totalPage: pagination.totalPages
          }}
          onTableChange={(params) => {
            params.type === 'sort' &&
              setSort({ field: params.sortField, order: params.sortOrder })
            params.type === 'pagination' &&
              history.push(generatePath(link, params))
          }}
        />
      )}
    </div>
  )
}
