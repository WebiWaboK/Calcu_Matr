import React, { useState } from 'react';

interface MatrizSizeProps {
  label: string;
  onSizeChange: (rows: number, cols: number) => void;
}

const MatrizSize: React.FC<MatrizSizeProps> = ({ label, onSizeChange }) => {
  const [rows, setRows] = useState<number>(2);
  const [cols, setCols] = useState<number>(2);

  const handleRowChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRows = parseInt(e.target.value, 10);
    setRows(newRows);
    onSizeChange(newRows, cols);
  };

  const handleColChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCols = parseInt(e.target.value, 10);
    setCols(newCols);
    onSizeChange(rows, newCols);
  };

  return (
    <div className="matriz-size">
      <h3>{label}</h3>
      <label>
            Filas:
        <input type="number" value={rows} onChange={handleRowChange} min="1" />
      </label>
      <label>
        Columnas:
        <input type="number" value={cols} onChange={handleColChange} min="1" />
      </label>
    </div>
  );
};

export default MatrizSize;
