# rf-table

> React functional table component

[![NPM](https://img.shields.io/npm/v/rf-table.svg)](https://www.npmjs.com/package/rf-table) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save rf-table
```

## Sample data using in the example below

```jsx
const data = [
  { id: 1, message: 'Hello' },
  { id: 2, message: 'World!' },
  { id: 3, message: 'This' },
  { id: 4, message: 'is' },
  { id: 5, message: 'rf-table' },
  { id: 6, message: 'NPM' },
  { id: 7, message: 'package!' }
]
```

## Usage

1. Import the package

```jsx
import { Table } from 'rf-table'
import 'rf-table/dist/index.css'
```

2. Define selection column (optional):

```jsx
const selectRow = {
  mode: 'checkbox',
  clickToSelect: true,
  onSelect: (row, isSelect) => {
    //this callback function will be triggered when a single row selection toggles
    console.log(row, isSelect)
  },
  onSelectAll: (isSelect, rows) => {
    //this callback function will be triggered when all rows selection toggles
    console.log(rows, isSelect)
  }
}
```

3. Define other columns

```jsx
//note: sort and formatter are optional.
const columns = [
  {
    dataField: 'id',
    header: 'ID',
    sort: true,
    formatter: (row) => {
      return row.id
    }
  },
  {
    dataField: 'message',
    header: 'Message',
    sort: true,
    formatter: (row) => <>{`${row.id} ${row.message}`}</>
  }
]
```

4. Create component

```jsx
<Table
  className='customClassName'
  columns={columns}
  data={list}
  selectRow={selectRow}
/>
```

5. Please checkout my example for more advanced usage including how to integrate with Redux, Pagination, Sorting.

## License

MIT © [TavDev](https://github.com/TavDev)
