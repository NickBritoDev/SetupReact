import { useMemo, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AG_GRID_LOCALE_PT_BR } from "../config/table.config";

export default function TableComponent({ dados }: any) {
  const [rowData, setRowData] = useState<any[]>([]);

  useEffect(() => {
    if (dados) {
      setRowData(dados.resultado);
    }
  }, [dados]);

  const [columnDefs] = useState<any[]>([
    { field: "label", headerName: "Agrupamento" },
    { field: "qtde_concluidos", headerName: "Concluidos" },
    { field: "qtde_contratos_fechados", headerName: "Contratos Fechados" },
    { field: "qtde_contratos_nao_fechados", headerName: "Contratos N/ Fechados" },
    { field: "qtde_frio", headerName: "Leads Frios" },
    { field: "qtde_medio", headerName: "Leads Medios" },
    { field: "qtde_quente", headerName: "Leads Quentes" },
    { field: "qtde_nao_trabalhados", headerName: "Leads N/ Trabalhados" },
    { field: "qtde_trabalhados", headerName: "Leads Trabalhados" },
    { field: "total_registros", headerName: "Total de Registros", },
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
