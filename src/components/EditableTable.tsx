import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { addColumn, addRow, updateCell, updateColumnType } from '../store/slices/tableSlice';

const EditableTable: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { columns, rows } = useSelector((state: RootState) => state.table);

  const handleCellChange = (rowId: string, columnId: string, value: string, type: string) => {
    if (type === 'percent') {
      if (value.includes(".")) {
        const [integerPart, decimalPart] = value.split(".");
        if (decimalPart.length > 2) {
          value = `${ integerPart }.${ decimalPart.slice(0, 2) }`;
        }
      }

      if (value.length > 1 && value.startsWith("0")) {
        value = value.slice(1);
      }

      const numericValue = Number(value);

      if (numericValue > 100) {
        value = "100";
      } else if (numericValue < 0) {
        value = "0";
      }
    }
    dispatch(updateCell({ rowId, columnId, value }));
  };

  const handleTypeChange = (columnId: string, type: 'string' | 'percent') => {
    dispatch(updateColumnType({ columnId, type }));
  };

  const handleExport = () => {
    const data = { columns, rows };
    const json = JSON.stringify(data, null, 2);

    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'table-data.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="editable-table">
      <button className="btn btn-primary" onClick={ handleExport }>Экспортировать в JSON</button>
      <div className="table-wrapper">
        <table className="mt-1">
          <thead>
          <tr>
            { columns.map((column) => (
              <th key={ column.id }>
                <select
                  value={ column.type }
                  onChange={ (e) => handleTypeChange(column.id, e.target.value as 'string' | 'percent') }
                >
                  <option value="string">Строка</option>
                  <option value="percent">Процент</option>
                </select>
              </th>
            )) }
            <th className="expand">
              <button
                className="btn btn-primary"
                onClick={ () => dispatch(addColumn()) }
              >
                + столбец
              </button>
            </th>
          </tr>
          </thead>
          <tbody>
          { Object.entries(rows).map(([rowId, row]) => (
            <tr key={ rowId }>
              { columns.map((column) => (
                <td key={ column.id }>
                  <div className="input-wrapper">
                    <input
                      type={ column.type === 'percent' ? 'number' : 'text' }
                      min="0"
                      max="100"
                      step="1"
                      value={ row[column.id] }
                      onChange={ (e) => handleCellChange(rowId, column.id, e.target.value, column.type) }
                    />
                    { column.type === 'percent' && <span className="percent">%</span> }
                  </div>
                </td>
              )) }
              <td></td>
            </tr>
          )) }
          </tbody>
        </table>
      </div>
      <button
        className="btn btn-primary mt-1"
        onClick={ () => dispatch(addRow()) }
      >
        + строку
      </button>
    </div>
  );
};

export default EditableTable;
