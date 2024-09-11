import { useState } from 'react';
import MatrizSize from './MatrizSize';
import './App.css';

function App() {
  // Definición de los estados para las matrices A y B, el resultado, la operación seleccionada, y las profundidades de las matrices
  const [matrixA, setMatrixA] = useState<number[][][]>([[[0]]]);
  const [matrixB, setMatrixB] = useState<number[][][]>([[[0]]]);
  const [result, setResult] = useState<number[][][] | null>(null);
  const [operation, setOperation] = useState<string | null>(null);

  const [depthA, setDepthA] = useState<number>(1);
  const [depthB, setDepthB] = useState<number>(1);

  // Función para manejar cambios en los valores de las matrices
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

  // Función para cambiar el tamaño de la matriz A
  const handleMatrixASizeChange = (rows: number, cols: number) => {
    const newMatrixA = Array.from({ length: depthA }, () =>
      Array.from({ length: rows }, () => Array(cols).fill(0))
    );
    setMatrixA(newMatrixA);
  };

  // Función para cambiar el tamaño de la matriz B
  const handleMatrixBSizeChange = (rows: number, cols: number) => {
    const newMatrixB = Array.from({ length: depthB }, () =>
      Array.from({ length: rows }, () => Array(cols).fill(0))
    );
    setMatrixB(newMatrixB);
  };

  // Función para manejar el cambio de la profundidad de las matrices
  const handleDepthChange = (matrix: 'A' | 'B', depth: number) => {
    if (matrix === 'A') {
      setDepthA(depth);
      setMatrixA(Array.from({ length: depth }, () => Array.from({ length: matrixA[0]?.length || 1 }, () => Array(matrixA[0]?.[0]?.length || 1).fill(0))));
    } else {
      setDepthB(depth);
      setMatrixB(Array.from({ length: depth }, () => Array.from({ length: matrixB[0]?.length || 1 }, () => Array(matrixB[0]?.[0]?.length || 1).fill(0))));
    }
  };

  // Función para manejar la selección de la operación
  const handleOperationClick = (op: string) => {
    setOperation(op);
    performOperation(op);
  };

  // Función que realiza la operación seleccionada
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

  // Función para sumar matrices
  const addMatrices = (a: number[][][], b: number[][][]): number[][][] => {
    // Asegurarse de que las matrices tengan las mismas dimensiones para la suma
    if (!areDimensionsEqual(a, b)) {
      alert('Las matrices deben tener las mismas dimensiones para sumar.');
      return [];
    }
    return a.map((layer, i) =>
      layer.map((row, j) =>
        row.map((_, k) => a[i][j][k] + b[i][j][k])
      )
    );
  };

  // Función para restar matrices
  const subtractMatrices = (a: number[][][], b: number[][][]): number[][][] => {
    // Asegurarse de que las matrices tengan las mismas dimensiones para la resta
    if (!areDimensionsEqual(a, b)) {
      alert('Las matrices deben tener las mismas dimensiones para restar.');
      return [];
    }
    return a.map((layer, i) =>
      layer.map((row, j) =>
        row.map((_, k) => a[i][j][k] - b[i][j][k])
      )
    );
  };

  // Función (placeholder) para multiplicar matrices
  const multiplyMatrices = (a: number[][][], b: number[][][]): number[][][] => {
    // Implementar la lógica de multiplicación de matrices
    return a; // Reemplazar con la lógica real
  };

  // Función para comprobar si las dimensiones de las matrices son iguales
  const areDimensionsEqual = (a: number[][][], b: number[][][]): boolean => {
    return a.length === b.length &&
           a[0].length === b[0].length &&
           a[0][0].length === b[0][0].length;
  };

  // Función para manejar el clic en el botón de matriz 3D
  const handle3DMatrixClick = () => {
    handleDepthChange('A', 3);
    handleDepthChange('B', 3);
  };

  // Funciones (placeholder) para calcular determinante e inversa
  const calculateDeterminant = () => {
    // Implementar el cálculo del determinante
  };

  const calculateInverse = () => {
    // Implementar el cálculo de la inversa
  };

  // Función para limpiar los datos de las matrices y reiniciar el estado
  const handleClearClick = () => {
    setMatrixA([[[0]]]);
    setMatrixB([[[0]]]);
    setResult(null);
    setOperation(null);
  };

  return (
    <div className="app">
      <h1>Calculadora de Matrices</h1>

      {/* Componente para cambiar el tamaño de la matriz A */}
      <MatrizSize label="Tamaño Matriz A" onSizeChange={handleMatrixASizeChange} />
      {/* Componente para cambiar el tamaño de la matriz B */}
      <MatrizSize label="Tamaño Matriz B" onSizeChange={handleMatrixBSizeChange} />

      <div className="depth-container">
        <div>
          <h3>Profundidad de Matriz A</h3>
          <input
            type="number"
            min="1"
            value={depthA}
            onChange={(e) => handleDepthChange('A', parseInt(e.target.value))}
          />
        </div>
        <div>
          <h3>Profundidad de Matriz B</h3>
          <input
            type="number"
            min="1"
            value={depthB}
            onChange={(e) => handleDepthChange('B', parseInt(e.target.value))}
          />
        </div>
      </div>

      {/* Renderizar la matriz A */}
      <div className="matrix-container">
        <h3>Matriz A</h3>
        {matrixA.map((layer, layerIndex) => (
          <div key={layerIndex} className="matrix-layer">
            <h4>Capa {layerIndex + 1}</h4>
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

      {/* Renderizar la matriz B */}
      <div className="matrix-container">
        <h3>Matriz B</h3>
        {matrixB.map((layer, layerIndex) => (
          <div key={layerIndex} className="matrix-layer">
            <h4>Capa {layerIndex + 1}</h4>
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

      {/* Botones para seleccionar operaciones */}
      <div className="operations">
        <button onClick={() => handleOperationClick('+')}>+</button>
        <button onClick={() => handleOperationClick('-')}>-</button>
        <button onClick={() => handleOperationClick('*')}>*</button>
        <button onClick={handleClearClick}>Limpiar</button>
      </div>

      {/* Operaciones adicionales */}
      <div className="extra-operations">
        <button onClick={calculateDeterminant}>Determinante</button>
        <button onClick={calculateInverse}>Inversa</button>
        <button onClick={handle3DMatrixClick}>Matriz 3D</button>
      </div>

      {/* Mostrar el resultado */}
      {result && (
        <div className="matrix-container">
          <h3>Resultado</h3>
          {result.map((layer, layerIndex) => (
            <div key={layerIndex} className="matrix-layer">
              <h4>Capa {layerIndex + 1}</h4>
              {layer.map((row, rowIndex) => (
                <div key={rowIndex}>
                  {row.map((value, colIndex) => (
                    <input key={colIndex} type="number" value={value} readOnly />
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
