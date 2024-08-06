import { useMemo, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AG_GRID_LOCALE_PT_BR } from "../config/table.config";

export default function TableComponent({ dados }: any) {
  const [rowData, setRowData] = useState<any[]>([]);

  useEffect(() => {
    if (dados) {
      setRowData(dados);
    }
  }, [dados]);

  const [columnDefs] = useState<any[]>([
    { field: "data", headerName: "Usuario" },
    { field: "qtde_concluido", headerName: "Status Concluidos" },
    { field: "qtde_emAberto", headerName: "Status em Aberto" },
    { field: "qtde_novos", headerName: "Status Novo" },
    { field: "qtde_pendente", headerName: "Status Pendente" },
    { field: "total", headerName: "Status Total" },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      filter: "agTextColumnFilter",
      floatingFilter: false,
      sortable: true,
      resizable: true,
    };
  }, []);

  return (
    <div className={"ag-theme-quartz"} style={{ height: 400, width: "100%" }}>
      <AgGridReact
        localeText={AG_GRID_LOCALE_PT_BR}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowSelection="multiple"
        suppressRowClickSelection={true}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 25, 50]}
        masterDetail={true}
      />
    </div>
  );
}
