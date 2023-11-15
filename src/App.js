import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [array, setArray] = useState([]);
  const [sortingAlgorithm, setSortingAlgorithm] = useState('insertion');
  const [speed, setSpeed] = useState(50);
  const [arraySize, setArraySize] = useState(20);
  const [sorting, setSorting] = useState(false);

  useEffect(() => {
    resetArray();
  }, [arraySize]);

  const resetArray = () => {
    const newArray = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 100) + 10);
    setArray(newArray);
  };

  const visualizeSort = async () => {
    if (sorting) return;

    setSorting(true);

    switch (sortingAlgorithm) {
      case 'insertion':
        await insertionSort();
        break;
      case 'selection':
        await selectionSort();
        break;
      case 'bubble':
        await bubbleSort();
        break;
        case 'quick':
          await quickSort(0, array.length - 1);
          break;
        case 'merge':
          await mergeSort(0, array.length - 1);
          break;
      // Add more cases for other sorting algorithms (quick, merge, etc.)
      default:
        break;
    }

    setSorting(false);
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));



  const insertionSort = async () => {
    const n = array.length;
    let sortedArray = array.slice();

    for (let i = 1; i < n; i++) {
      const key = sortedArray[i];
      let j = i - 1;

      // Highlight the bars being compared
      setArray(prevArray => {
        const newArray = prevArray.slice();
        newArray[i] = newArray[j] = 150;
        return newArray;
      });
      await sleep(speed);

      while (j >= 0 && sortedArray[j] > key) {
        sortedArray[j + 1] = sortedArray[j];
        j--;

        // Update the array for animation
        setArray([...sortedArray]);
        await sleep(speed);
      }

      sortedArray[j + 1] = key;

      // Reset the color or height
      setArray(prevArray => {
        const newArray = prevArray.slice();
        newArray[i] = newArray[j + 1] = sortedArray[j + 1];
        return newArray;
      });
    }

    // Reset the array to its original color or height
    setArray(sortedArray);
  };

  const selectionSort = async () => {
    const n = array.length;
    let sortedArray = array.slice();

    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;

      for (let j = i + 1; j < n; j++) {
        // Highlight the bars being compared
        setArray(prevArray => {
          const newArray = prevArray.slice();
          newArray[j] = newArray[minIndex] = 150;
          return newArray;
        });
        await sleep(speed);

        if (sortedArray[j] < sortedArray[minIndex]) {
          minIndex = j;
        }

        // Reset the color or height
        setArray(prevArray => {
          const newArray = prevArray.slice();
          newArray[j] = newArray[minIndex] = sortedArray[j];
          return newArray;
        });
      }

      // Swap elements
      [sortedArray[i], sortedArray[minIndex]] = [sortedArray[minIndex], sortedArray[i]];

      // Update the array for animation
      setArray([...sortedArray]);
      await sleep(speed);

      // Reset the color or height
      setArray(prevArray => {
        const newArray = prevArray.slice();
        newArray[i] = newArray[minIndex] = sortedArray[i];
        return newArray;
      });
    }

    // Reset the array to its original color or height
    setArray(sortedArray);
  };


  const bubbleSort = async () => {
    const n = array.length;
    let sortedArray = array.slice();

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - 1 - i; j++) {
        // Highlight the bars being compared
        setArray(prevArray => {
          const newArray = prevArray.slice();
          newArray[j] = newArray[j + 1] = 150; // Change color or height to highlight
          return newArray;
        });
        await sleep(speed);

        if (sortedArray[j] > sortedArray[j + 1]) {
          // Swap elements
          [sortedArray[j], sortedArray[j + 1]] = [sortedArray[j + 1], sortedArray[j]];
          // Update the array for animation
          setArray([...sortedArray]);
          await sleep(speed); // Add a small delay to visualize the swap
        }

        // Reset the color or height
        setArray(prevArray => {
          const newArray = prevArray.slice();
          newArray[j] = newArray[j + 1] = sortedArray[j]; // Reset color or height
          return newArray;
        });
      }
    }

    // Reset the array to its original color or height
    setArray(sortedArray);
  };




  const quickSort = async (low, high) => {
    let arr = [...array];
    if (low < high) {
      const partitionIndex = await partition(arr, low, high);
      await quickSort(low, partitionIndex - 1);
      await quickSort(partitionIndex + 1, high);
    }
  };
  
  const partition = async (arr, low, high) => {
    const pivot = arr[high];
    let i = low - 1;
  
    for (let j = low; j < high; j++) {
      // Highlight the bars being compared
      setArray(prevArray => {
        const newArray = prevArray.slice();
        newArray[j] = newArray[i + 1] = 150;
        return newArray;
      });
      await sleep(speed);
  
      if (arr[j] <= pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        // Update the array for animation
        setArray([...arr]);
        await sleep(speed);
      }
  
      // Reset the color or height
      setArray(prevArray => {
        const newArray = prevArray.slice();
        newArray[j] = newArray[i + 1] = arr[j];
        return newArray;
      });
    }
  
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  
    // Update the array for animation
    setArray([...arr]);
    await sleep(speed);
  
    // Reset the color or height
    setArray(prevArray => {
      const newArray = prevArray.slice();
      newArray[i + 1] = newArray[high] = arr[i + 1];
      return newArray;
    });
  
    return i + 1;
  };
  
  const mergeSort = async (l, r) => {
    let arr = [...array];
    const merge = async (l, m, r) => {
      const n1 = m - l + 1;
      const n2 = r - m;
  
      const L = new Array(n1);
      const R = new Array(n2);
  
      for (let i = 0; i < n1; i++) {
        L[i] = arr[l + i];
      }
  
      for (let j = 0; j < n2; j++) {
        R[j] = arr[m + 1 + j];
      }
  
      let i = 0;
      let j = 0;
      let k = l;
  
      while (i < n1 && j < n2) {
        // Highlight the bars being compared
        setArray(prevArray => {
          const newArray = prevArray.slice();
          newArray[l + i] = newArray[m + 1 + j] = 150;
          return newArray;
        });
        await sleep(speed);
  
        if (L[i] <= R[j]) {
          arr[k] = L[i];
          i++;
        } else {
          arr[k] = R[j];
          j++;
        }
  
        // Update the array for animation
        setArray([...arr]);
        await sleep(speed);
  
        // Reset the color or height
        setArray(prevArray => {
          const newArray = prevArray.slice();
          newArray[l + i - 1] = newArray[m + 1 + j - 1] = arr[k];
          return newArray;
        });
  
        k++;
      }
  
      while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
      }
  
      while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
      }
    };
  
    const mergeSortUtil = async (l, r) => {
      if (l < r) {
        const m = Math.floor((l + r) / 2);
  
        await mergeSortUtil(l, m);
        await mergeSortUtil(m + 1, r);
        await merge(l, m, r);
      }
    };
  
    await mergeSortUtil(l, r);
  };



  return (
    <div className="App" style={{ height: "100hv" }}>
      <h1>Random Sorting System</h1>
      <div className="controls">
        <label htmlFor="algorithm">Select Sorting Algorithm:</label>
        <select id="algorithm" value={sortingAlgorithm} onChange={(e) => setSortingAlgorithm(e.target.value)}>
          <option value="insertion">Insertion Sort</option>
          <option value="selection">Selection Sort</option>
          <option value="bubble">Bubble Sort</option>
          {/* <option value="merge">Merge Sort</option>
          <option value="quick">Quick Sort</option> */}
          {/* Add more options for other sorting algorithms */}
        </select>
        <label htmlFor="speed">Select Speed:</label>
        <input
          id="speed"
          type="range"
          min="1"
          max="100"
          step="1"
          value={speed}
          onChange={(e) => setSpeed(e.target.value)}
        />
        <label htmlFor="size">Select Array Size:</label>
        <input
          id="size"
          type="range"
          min="5"
          max="100"
          step="1"
          value={arraySize}
          onChange={(e) => setArraySize(e.target.value)}
        />
        <button onClick={resetArray}>Randomize Array</button>
        <button onClick={visualizeSort}>Generate All Sorting</button>
      </div>
      <div className="array-container">
        {array.map((value, index) => (
          <div key={index} className="array-bar" style={{ height: `${value * 3}px`, width: "25px" }}>
            <div className='h1text'>
              <h4>{`${value}`}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
