import React, { useState, useEffect } from "react";
import { ArrowDownUp } from "react-bootstrap-icons";
import "./table.css";

export function Remote(props) {
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [callbackParams, setCallbackParams] = useState({
    type: "pagination",
    page: props.pagination && props.pagination.page ? props.pagination.page : 1,
    limit:
      props.pagination && props.pagination.limit
        ? props.pagination.limit
        : 1000,
    filters: undefined,
    sortField: "id",
    sortOrder: "asc",
    cellEdit: undefined,
  });

  useEffect(() => {
    if (props.onTableChange && typeof props.onTableChange === "function") {
      props.onTableChange(callbackParams);
    }
  }, [callbackParams]);

  const Header = () => {
    let elements = [];
    //1. add checkbox
    if (props.selectRow) {
      elements = [
        ...elements,
        {
          content: (
            <input
              type="checkbox"
              defaultChecked={selectAllChecked}
              onClick={(e) => {
                let temp = {};
                // eslint-disable-next-line array-callback-return
                props.data.map((item, itemIndex) => {
                  temp = { ...temp, [itemIndex]: e.target.checked };
                });

                setSelectedRows(temp);
                setSelectAllChecked(e.target.checked);
                props.selectRow.onSelectAll(e.target.checked, props.data);
              }}
            />
          ),
        },
      ];
    }
    //2. add other header
    if (props.columns) {
      // eslint-disable-next-line array-callback-return
      props.columns.map((column) => {
        elements = [
          ...elements,
          {
            content:
              typeof column.headerFormatter === "function" ? (
                column.headerFormatter(column)
              ) : column.sort ? (
                <span
                  className={
                    column.dataField === callbackParams.sortField
                      ? "active sortable"
                      : "sortable"
                  }
                  onClick={() =>
                    setCallbackParams({
                      ...callbackParams,
                      sortField: column.dataField,
                      sortOrder:
                        column.dataField === callbackParams.sortField
                          ? callbackParams.sortOrder === "asc"
                            ? "desc"
                            : "asc"
                          : "asc",
                      type: "sort",
                    })
                  }
                >
                  {column.text || column.header} <ArrowDownUp size={10} />
                  {column.dataField === callbackParams.sortField ? (
                    <span className="sort-order-desc">
                      {callbackParams.sortOrder}
                    </span>
                  ) : (
                    ""
                  )}
                </span>
              ) : (
                column.text || column.header
              ),
            className: column.headerClasses,
          },
        ];
      });
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
    );
  };

  const [selectedRows, setSelectedRows] = useState({});
  const CustomCheckBox = (props) => {
    return (
      <input
        defaultChecked={selectedRows[props.rowIndex]}
        type="checkbox"
        onClick={(e) => {
          setSelectedRows((prev) => {
            return {
              ...prev,
              [props.rowIndex]: e.target.checked,
            };
          });
          props.onChanged(props.data, e.target.checked);
        }}
      />
    );
  };

  const Body = () => {
    let rows = [];
    if (props.data) {
      // eslint-disable-next-line array-callback-return
      props.data.map((row, rowIndex) => {
        let elements = [];
        //1. add checkbox
        if (props.selectRow) {
          elements = [
            ...elements,
            {
              content: (
                <CustomCheckBox
                  onChanged={props.selectRow.onSelect}
                  data={row}
                  rowIndex={rowIndex}
                />
              ),
            },
          ];
        }
        //2. add other columns
        if (props.columns) {
          // eslint-disable-next-line array-callback-return
          props.columns.map((column) => {
            elements = [
              ...elements,
              {
                content:
                  typeof column.formatter === "function"
                    ? column.formatter(row)
                    : row.text,
                className: column.classes,
              },
            ];
          });
        }
        rows = [...rows, elements];
      });
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
    );
  };

  const pageLinkGenerator = (page, totalPage) => {
    let result = { prev: true, pages: [], next: true };
    if (page === 1) result = { ...result, prev: false };
    if (page === totalPage) result = { ...result, next: false };
    const range = [-2, -1, 0, 1, 2];
    // eslint-disable-next-line array-callback-return
    range.map((value) => {
      if (page + value > 0 && page + value <= totalPage) {
        result = { ...result, pages: [...result.pages, page + value] };
      }
    });
    return result;
  };

  const Footer = () => {
    const configs = pageLinkGenerator(
      props.pagination.page,
      props.pagination.totalPage
    );
    return (
      <div className="p-2">
        <div className="row">
          <div className="col-auto">
            <div className="grid-filter">
              <div className="mb-md-0 mb-3">
                <select
                  className="form-select"
                  defaultValue={callbackParams.limit}
                  onChange={(e) => {
                    setCallbackParams({
                      ...callbackParams,
                      limit: e.target.value,
                      type: "pagination",
                    });
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

          <div className="col">
            <div className="d-flex">
              <ul className="pagination ms-auto">
                <li
                  className={configs.prev ? "page-item" : "page-item disabled"}
                >
                  <button
                    className="border-1 border-light rounded-left page-link"
                    onClick={() =>
                      setCallbackParams({
                        ...callbackParams,
                        page: callbackParams.page - 1,
                        type: "pagination",
                      })
                    }
                  >
                    {props.pagination.prePageText || "Previous"}
                  </button>
                </li>

                {configs.pages.map((pageItem, itemIndex) => (
                  <li
                    key={itemIndex}
                    className={
                      pageItem === callbackParams.page
                        ? "page-item active"
                        : "page-item"
                    }
                  >
                    <button
                      className="border-1 border-light  rounded-0 page-link"
                      onClick={() =>
                        setCallbackParams({
                          ...callbackParams,
                          page: pageItem,
                          type: "pagination",
                        })
                      }
                    >
                      {pageItem}
                    </button>
                  </li>
                ))}
                <li
                  className={configs.next ? "page-item" : "page-item disabled"}
                >
                  <button
                    className="border-1 border-light rounded-right page-link"
                    onClick={() =>
                      setCallbackParams({
                        ...callbackParams,
                        page: callbackParams.page + 1,
                        type: "pagination",
                      })
                    }
                  >
                    {props.pagination.nextPageText || "Next"}
                  </button>{" "}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={props.wrapperClassName}>
      <table className={props.className}>
        <Header />
        <Body />
      </table>
      {props.pagination ? <Footer /> : ""}
    </div>
  );
}
