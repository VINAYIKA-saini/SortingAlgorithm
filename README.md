Short Description Of Assignment:-
This React project serves as a sorting algorithm visualizer, allowing users to interactively observe the step-by-step process of various sorting algorithms. Let's break down the key components and functionalities of the project:

1. State Management:
The project uses the useState hook to manage different pieces of state:
•	array: Represents the array of elements to be sorted.
•	sortingAlgorithm: Tracks the currently selected sorting algorithm (options include Insertion Sort, Selection Sort, Bubble Sort, Quick Sort, and Merge Sort).
•	speed: Represents the animation speed of the sorting process.
•	arraySize: Denotes the size of the array.
•	sorting: Indicates whether the sorting process is currently active.
2. Initialization and Reset:	
•	The useEffect hook is employed to initialize the array when the arraySize changes.
•	The resetArray function generates a new array with random values when called.
3. Sorting Algorithm Visualizations:
•	The main sorting function, visualizeSort, is triggered by a button click.
•	It sets the sorting state to true to prevent further sorting until the current process completes.
•	Depending on the selected sorting algorithm, the corresponding sorting function (insertionSort, selectionSort, bubbleSort, quickSort, mergeSort) is called asynchronously.
•	The sorting functions include visualizations to highlight the elements being compared, swapped, or moved during the sorting process.
•	A sleep function is used to introduce delays and visualize the sorting steps at a pace controlled by the speed state.

4. Sorting Algorithm Implementations:
•	The project includes implementations for Insertion Sort, Selection Sort, and Bubble Sort with clear visual feedback for each step.
•	Placeholder functions for Quick Sort and Merge Sort are included, though they are currently commented out.
5. Quick Sort and Merge Sort Implementations:
•	quickSort and mergeSort functions are asynchronous and provide step-by-step visualizations of their respective sorting processes.
•	The partition function is used in Quick Sort, and the merge function is used in Merge Sort.
6. User Interface:
•	The UI includes controls for selecting the sorting algorithm, adjusting sorting speed and array size, randomizing the array, and triggering the sorting visualization.
•	The array elements are visually represented as bars, and their heights correspond to their values.

7. Conclusion:
•	The project effectively combines React, asynchronous operations, and visualization techniques to create an interactive sorting algorithm visualizer, providing users with a hands-on understanding of how different sorting algorithms operate on arrays of varying sizes.
