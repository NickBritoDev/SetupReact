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
    { field: "usuario", headerName: "Operador" },
    { field: "produto", headerName: "Produto" },
    { field: "contrato_fechado", headerName: "Contratos Fechados" },
    { field: "parou_de_interagir", headerName: "Parou de Interagir" },
    { field: "sem_interesse", headerName: "Sem Interesse" },
    { field: "ja_possui_emprestimo", headerName: "Possui Emprestimo" },
    { field: "sem_regra_negocio", headerName: "Regra de Negocios" },
    { field: "reprovado_politica_interna", headerName: "Politicas Internas" },
    { field: "qtde", headerName: "Quantidade" },
    {
      field: "percentual_contrato_fechado",
      headerName: "Percentual Contratos Fechados",
    },
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
