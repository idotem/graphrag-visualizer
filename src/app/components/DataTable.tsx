import React, { useEffect, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_ColumnDef,
} from "material-react-table";
import { Box } from "@mui/material";

interface DataTableProps<T extends object> {
  data: T[];
  columns: MRT_ColumnDef<T>[];
}

const DataTable = <T extends object>({
  data,
  columns,
}: DataTableProps<T>): React.ReactElement => {
  const [columnFilters, setColumnFilters] = useState<any>([]);

  useEffect(() => {
    console.log("useEffect entered");
    const storedId = localStorage.getItem("filterId");
    console.log("filterId from storage: ", storedId);
    if (storedId && data.length > 0) {
      console.log("setting column filters");
      setColumnFilters([
        {
          id: "human_readable_id",
          value: Number(storedId),
        },
      ]);
    }
  }, [data]);

  const table = useMaterialReactTable<T>({
    data,
    columns,
    initialState: {
      columnVisibility: {
        graph_embedding: false,
        description_embedding: false,
        // text_unit_ids: false,
        // relationship_ids: false,
      },
      showColumnFilters: true,
      density: "compact",
    },
    state: {
      columnFilters,
    },
  });

  return (
    <Box sx={{ zIndex: 1500 }}>
      <MaterialReactTable table={table} />
    </Box>
  );
};

export default DataTable;
