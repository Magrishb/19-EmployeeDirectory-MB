import React, { useMemo } from "react";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import my_data from "./my_data.json";
import { COLUMNS } from "./columns";
import GlobalFilter from "./GlobalFilter";

const DataTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => my_data, []);

  const tableInstance = useTable(
    {
      columns: columns,
      data: data,
    },
    useGlobalFilter,
    useSortBy
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = tableInstance;

  const { globalFilter } = state;

  return (
    <>
      <div className="row">
        <div className="col-sm">
          <div className="action-widget" id="blurb">
            Click on a column heading below to sort the table.
          </div>
        </div>
        <div className="col-sm">
          <div className="action-widget" id="search-div">
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
          </div>
        </div>
      </div>

      <div>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <span>
                            {"  "}
                            <i class="fas fa-arrow-down"></i>
                          </span>
                        ) : (
                          <span>
                            {"  "}
                            <i class="fas fa-arrow-up"></i>
                          </span>
                        )
                      ) : (
                        ""
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DataTable;
