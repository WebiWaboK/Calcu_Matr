import { useState } from 'react';
import MatrizSize from './MatrizSize';
import './App.css';

function App() {
  const [matrixA, setMatrixA] = useState<number[][][]>([[[0]]]);
  const [matrixB, setMatrixB] = useState<number[][][]>([[[0]]]);
  const [result, setResult] = useState<number[][][] | null>(null);
  const [operation, setOperation] = useState<string | null>(null);

  const [depthA, setDepthA] = useState<number>(1);
  const [depthB, setDepthB] = useState<number>(1);

  const handleMatrixChange = (
    matrix: number[][][],
    setMatrix: React.Dispatch<React.SetStateAction<number[][][]>>,
    depth: number,
    row: number,
    col: number,
    value: string
  ) => {
    const updatedMatrix = [...matrix];
    updatedMatrix[depth][row][col] = parseFloat(value) || 0;
    setMatrix(updatedMatrix);
  };

  const handleMatrixASizeChange = (rows: number, cols: number) => {
    const newMatrixA = Array.from({ length: depthA }, () =>
      Array.from({ length: rows }, () => Array(cols).fill(0))
    );
    setMatrixA(newMatrixA);
  };

  const handleMatrixBSizeChange = (rows: number, cols: number) => {
    const newMatrixB = Array.from({ length: depthB }, () =>
      Array.from({ length: rows }, () => Array(cols).fill(0))
    );
    setMatrixB(newMatrixB);
  };

  const handleDepthChange = (matrix: 'A' | 'B', depth: number) => {
    if (matrix === 'A') {
      setDepthA(depth);
      setMatrixA(Array.from({ length: depth }, () => Array.from({ length: matrixA[0]?.length || 1 }, () => Array(matrixA[0]?.[0]?.length || 1).fill(0))));
    } else {
      setDepthB(depth);
      setMatrixB(Array.from({ length: depth }, () => Array.from({ length: matrixB[0]?.length || 1 }, () => Array(matrixB[0]?.[0]?.length || 1).fill(0))));
    }
  };

  const handleOperationClick = (op: string) => {
    setOperation(op);
    performOperation(op);
  };

  const performOperation = (op: string) => {
    if (!matrixA.length || !matrixB.length) return;
    if (op === '+') {
      setResult(addMatrices(matrixA, matrixB));
    } else if (op === '-') {
      setResult(subtractMatrices(matrixA, matrixB));
    } else if (op === '*') {
      setResult(multiplyMatrices(matrixA, matrixB));
    }
  };

  const addMatrices = (a: number[][][], b: number[][][]): number[][][] => {
    // Ensure matrices have the same dimensions for addition
    if (!areDimensionsEqual(a, b)) {
      alert('Matrices must have the same dimensions for addition.');
      return [];
    }
    return a.map((layer, i) =>
      layer.map((row, j) =>
        row.map((_, k) => a[i][j][k] + b[i][j][k])
      )
    );
  };

  const subtractMatrices = (a: number[][][], b: number[][][]): number[][][] => {
    // Ensure matrices have the same dimensions for subtraction
    if (!areDimensionsEqual(a, b)) {
      alert('Matrices must have the same dimensions for subtraction.');
      return [];
    }
    return a.map((layer, i) =>
      layer.map((row, j) =>
        row.map((_, k) => a[i][j][k] - b[i][j][k])
      )
    );
  };

  const multiplyMatrices = (a: number[][][], b: number[][][]): number[][][] => {
    // Implement matrix multiplication logic
    // Here, a basic example assuming the matrices are of compatible sizes
    return a; // Replace with actual multiplication logic
  };

  const areDimensionsEqual = (a: number[][][], b: number[][][]): boolean => {
    return a.length === b.length &&
           a[0].length === b[0].length &&
           a[0][0].length === b[0][0].length;
  };

  const handle3DMatrixClick = () => {
    handleDepthChange('A', 3);
    handleDepthChange('B', 3);
  };

  const calculateDeterminant = () => {
    // Implement determinant calculation
  };

  const calculateInverse = () => {
    // Implement inverse calculation
  };

  const handleClearClick = () => {
    setMatrixA([[[0]]]);
    setMatrixB([[[0]]]);
    setResult(null);
    setOperation(null);
  };

  return (
    <div className="app">
      <h1>Matrix Calculator</h1>

      <MatrizSize label="Matrix A Size" onSizeChange={handleMatrixASizeChange} />
      <MatrizSize label="Matrix B Size" onSizeChange={handleMatrixBSizeChange} />

      <div className="depth-container">
        <div>
          <h3>Matrix A Depth</h3>
          <input
            type="number"
            min="1"
            value={depthA}
            onChange={(e) => handleDepthChange('A', parseInt(e.target.value))}
          />
        </div>
        <div>
          <h3>Matrix B Depth</h3>
          <input
            type="number"
            min="1"
            value={depthB}
            onChange={(e) => handleDepthChange('B', parseInt(e.target.value))}
          />
        </div>
      </div>

      <div className="matrix-container">
        <h3>Matrix A</h3>
        {matrixA.map((layer, layerIndex) => (
          <div key={layerIndex} className="matrix-layer">
            <h4>Layer {layerIndex + 1}</h4>
            {layer.map((row, rowIndex) => (
              <div key={rowIndex}>
                {row.map((value, colIndex) => (
                  <input
                    key={colIndex}
                    type="number"
                    value={value}
                    onChange={(e) =>
                      handleMatrixChange(matrixA, setMatrixA, layerIndex, rowIndex, colIndex, e.target.value)
                    }
                  />
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="matrix-container">
        <h3>Matrix B</h3>
        {matrixB.map((layer, layerIndex) => (
          <div key={layerIndex} className="matrix-layer">
            <h4>Layer {layerIndex + 1}</h4>
            {layer.map((row, rowIndex) => (
              <div key={rowIndex}>
                {row.map((value, colIndex) => (
                  <input
                    key={colIndex}
                    type="number"
                    value={value}
                    onChange={(e) =>
                      handleMatrixChange(matrixB, setMatrixB, layerIndex, rowIndex, colIndex, e.target.value)
                    }
                  />
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="operations">
        <button onClick={() => handleOperationClick('+')}>+</button>
        <button onClick={() => handleOperationClick('-')}>-</button>
        <button onClick={() => handleOperationClick('*')}>*</button>
        <button onClick={handleClearClick}>Clear</button>
      </div>

      <div className="extra-operations">
        <button onClick={calculateDeterminant}>Determinant</button>
        <button onClick={calculateInverse}>Inverse</button>
        <button onClick={handle3DMatrixClick}>3D Matrix</button>
      </div>

      {result && (
        <div className="result">
          <h3>Result</h3>
          {result.map((layer, layerIndex) => (
            <div key={layerIndex} className="matrix-layer">
              <h4>Layer {layerIndex + 1}</h4>
              {layer.map((row, rowIndex) => (
                <div key={rowIndex}>
                  {row.map((value, colIndex) => (
                    <input key={colIndex} type="text" value={value} readOnly />
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
