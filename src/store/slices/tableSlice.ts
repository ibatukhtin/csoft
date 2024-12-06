import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type DataType = 'string' | 'percent';

interface Column {
  id: string;
  name: string;
  type: DataType;
}

interface TableState {
  columns: Column[];
  rows: { [rowId: string]: { [columnId: string]: string } };
}

const initialState: TableState = {
  columns: [{ id: 'col1', name: 'Column 1', type: 'string' }],
  rows: { row1: { col1: '' } },
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    addColumn: (state) => {
      const newColumnId = `col${state.columns.length + 1}`;
      state.columns.push({ id: newColumnId, name: `Column ${state.columns.length + 1}`, type: 'string' });
      Object.values(state.rows).forEach((row) => {
        row[newColumnId] = '';
      });
    },
    addRow: (state) => {
      const newRowId = `row${Object.keys(state.rows).length + 1}`;
      state.rows[newRowId] = state.columns.reduce((acc, column) => {
        acc[column.id] = '';
        return acc;
      }, {} as { [columnId: string]: string });
    },
    updateCell: (
      state,
      action: PayloadAction<{ rowId: string; columnId: string; value: string }>
    ) => {
      const { rowId, columnId, value } = action.payload;
      if (state.rows[rowId]) {
        state.rows[rowId][columnId] = value;
      }
    },
    updateColumnType: (state, action: PayloadAction<{ columnId: string; type: DataType }>) => {
      const { columnId, type } = action.payload;
      const column = state.columns.find((col) => col.id === columnId);
      if (column) {
        column.type = type;
      }
    },
  },
});

export const { addColumn, addRow, updateCell, updateColumnType } = tableSlice.actions;
export default tableSlice.reducer;
