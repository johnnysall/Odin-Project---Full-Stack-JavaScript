let arrayLength = 300;

// First Nested is the sorted subarray, Second Nested is unsorted subarray
let arrayToSort = [[],[]];

for (let i = 0; i < arrayLength; i++) {
    arrayToSort[1].push(Math.round((Math.random() * 99) + 1));
}

const visualArrayContainer = document.getElementById("visualArrayContainer");
visualArrayContainer.style.gridTemplateColumns = "auto";
const arrayContainer = document.getElementById("arrayContainer");
arrayContainer.style.gridTemplateColumns = "repeat(" + arrayLength + ", 1fr)";

let sleepTime = 3;

function sleep () {
    return new Promise((resolve) => setTimeout(resolve, sleepTime));
}

const setup = (() => {
    const clearArray = () => {
        arrayContainer.innerHTML = "";
    }

    const presentArray = (arr) => {
        arrayContainer.innerHTML = "";
        visualArrayContainer.innerHTML = "";
        for (let i = 0; i < arr.length; i++) {
            // // Show List of numbers in array
            // const arrayItem = document.createElement("div");
            // arrayItem.classList.add("arrayItem");
            // arrayItem.classList.add("number"+arr[i]);
            // arrayItem.classList.add("index"+i);
            // arrayItem.innerText = arr[i];
            // arrayItem.style.gridRow = "1";
            // arrayItem.style.gridColumn = i+1;
            // arrayContainer.appendChild(arrayItem);


            // Create visualisation for array
            const visArrayItem = document.createElement("div");
            visArrayItem.classList.add("visArrayItem");
            visArrayItem.classList.add("visNumber"+arr[i]);
            visArrayItem.classList.add("visIndex"+i);
            visArrayItem.id = "visIndex" + i;
            // visArrayItem.innerText = arr[i];
            visArrayItem.style.height = arr[i] + "%";
            visArrayItem.style.width = (100/(arrayLength)) + "%";
            visArrayItem.style.left = (i * (100/(arrayLength))) + "%";
            // visArrayItem.style.gridRow = "1";
            // visArrayItem.style.gridColumn = i+1;
            // visArrayItem.style.marginBottom = (100 - arrayToSort[i]) + "%";
            visualArrayContainer.appendChild(visArrayItem);
        }
    }

    const moveItem = (index, direction) => {
        const arrayItem = document.getElementsByClassName("index" + index);
        // arrayItem[0].classList.add(direction);
        if (direction === "up"){
            arrayItem[0].classList.remove("down");
            arrayItem[0].classList.add("up");
        }if (direction === "right"){
            arrayItem[0].classList.remove("left");
            arrayItem[0].classList.add("right");
        }if (direction === "down"){
            // arrayItem[0].style.marginTop = "70px";
            arrayItem[0].classList.remove("up");
            arrayItem[0].classList.add("down");
        }if (direction === "left") {
            arrayItem[0].classList.remove("right");
            arrayItem[0].classList.add("left");
        }

        arrayItem[0].addEventListener("animationend", () => {
            return;
        })
    }

    return { clearArray, presentArray, moveItem };
})();

const selectionSort = (() => {
    async function selectionSort(arr) {
        for (let i = 0; i < arr.length; i++) {
            let smallestNum = 3434;
            let smallestNumIndex = i;
            let currentSmallNum, numToCompare;
    
            for (let x = 0+i; x < arr.length; x++) {   
                currentSmallNum = document.getElementById("visIndex" + smallestNumIndex);
                numToCompare = document.getElementById("visIndex" + x);
                currentSmallNum.style.backgroundColor = "red";
                numToCompare.style.backgroundColor = "red";
                if (smallestNum > arr[x]) {
                    smallestNum = arr[x];
                    smallestNumIndex = x;
                }
                await sleep();
                currentSmallNum.style.backgroundColor = "rgb(196, 196, 196)";
                numToCompare.style.backgroundColor = "rgb(196, 196, 196)";
            }
            var tempItem = arr[smallestNumIndex];
            arr[smallestNumIndex] = arr[i];
            arr[i] = tempItem;

            currentSmallNum = document.getElementById("visIndex" + smallestNumIndex);
            currentSmallNum.style.height = arr[smallestNumIndex] + "%";

            numToCompare = document.getElementById("visIndex" + i);
            numToCompare.style.backgroundColor = "green";
            numToCompare.style.height = arr[i] + "%";
        }
    };

    return { selectionSort };
})();

const insertionSort = (() => {
    async function update (arr, num1Index, num2Index) {
        let colour = "blue";
        let num1ToSwap = document.getElementById("visIndex" + num1Index);
        let num2ToSwap = document.getElementById("visIndex" + num2Index);

        if (num1ToSwap.style.backgroundColor !== "blue") {
            colour = "rgb(196, 196, 196)"
        }

        num1ToSwap.style.height = arr[num1Index] + "%";
        num1ToSwap.style.backgroundColor = "red";
        num2ToSwap.style.height = arr[num2Index] + "%";
        await sleep();
        num1ToSwap.style.backgroundColor = colour;
    };

    async function insertionSort(arr) {
        let i, j, key;
    
        for (i = 1; i < arr.length; i++) {
            let startingPoint = document.getElementById("visIndex" + i);
            startingPoint.style.backgroundColor = "rgb(80, 221, 61)";

            key = arr[i];
            j = i - 1;
            while (j >= 0 && arr[j] > key) {
                let tempItem = arr[j + 1];
                arr[j+1] = arr[j]; 
                arr[j] = tempItem;
                j = j - 1; 
                await update(arr, j+1, j+2);
            } 
            arr[j + 1] = key; 
            let sortedNum = document.getElementById("visIndex" + (j+1));
            sortedNum.style.backgroundColor = "blue";
        }
        for (i = 0; i < arr.length; i++) {
            let completedItem = document.getElementById("visIndex" + i);
            completedItem.style.backgroundColor = "green";
            await sleep();
        }
    };

    return { update, insertionSort };
})();


const bubbleSort = (() => {
    function swap (arr, num1, num2, index) {
        arr[index] = num2;
        arr[index + 1] = num1;

        const num1ToSwap = document.getElementById("visIndex" + (index));
        const num2ToSwap = document.getElementById("visIndex" + (index+1));

        num1ToSwap.style.left = ((index+1) * (100/(arrayLength))) + "%";
        num1ToSwap.id = "visIndex" + (index + 1);
        num1ToSwap.style.backgroundColor = "red";
        num2ToSwap.style.left = (index * (100/(arrayLength))) + "%";
        num2ToSwap.id = "visIndex" + index;
        num2ToSwap.style.backgroundColor = "yellow";

    }

    async function bubbleSort(arr) {
        let i, j;
        
        for (i=0; i < arr.length-1; i++) {
            for (j=0; j < arr.length-i-1; j++){
                if (arr[j] > arr[j+1]) {
                    await swap(arr, arr[j], arr[j+1], j);
                }
                await sleep();
            }
            const visSortedNum = document.getElementById("visIndex" + j);
            visSortedNum.style.backgroundColor = "green";
        }
        const visSortedNum = document.getElementById("visIndex0");
        visSortedNum.style.backgroundColor = "green";
    }

    return { swap, bubbleSort };
})();

const mergeSort = (() => {
    async function update(arr, k) {
        let indexToUpdate = document.getElementById("visIndex" + k);
        indexToUpdate.style.height = arr[k] + "%";
        await sleep();
    }

    // Split array - check 
    async function merge(arr, l, m, r) {
        let oldArr = new Array(arr.length);
        for (let i=0; i < arr.length; i++) {
            oldArr[i] = arr[i];
        }

        // Variables to determine length of left and right array
        var l1 = m - l + 1;
        var l2 = r - m;

        // Creating new arrays of the correct length using the variables previously declared
        var lArray = new Array(l1);
        var rArray = new Array(l2);

        for (i = 0; i < l1; i++) {
            lArray[i] = arr[l+i];
        }
        for (j = 0; j < l2; j++) {
            rArray[j] = arr[m+1+j];
        }

        // Starting Index for first sub array
        var i = 0;
        // Starting Index for second sub array
        var j = 0;
        // Starting Index for merged sub array
        var k = l;

        while (i < l1 && j < l2) {
            if (lArray[i] <= rArray[j]) {
                arr[k] = lArray[i];
                i++
            } else {
                arr[k] = rArray[j];
                j++
            }
            await update(arr, k);
            k++
        }

        while (i < l1) {
            arr[k] = lArray[i];
            i++ 
            await update(arr, k);
            k++
        }
        while (j < l2) {
            arr[k] = rArray[j];
            j++ 
            await update(arr, k);
            k++
        }
    }

    async function mergeSort(arr, l, r) {
        if (l >= r) {
            return;
        }

        var m = l + parseInt((r-l)/2);
        await mergeSort(arr,l,m);
        await mergeSort(arr,m+1,r);
        await merge(arr,l,m,r);
    }

    const begin = () => {

    }

    return { update, merge, mergeSort, begin };
})();

const quickSort = (() => {
    async function update (arr, i, j) {
        let indexToUpdate1 = document.getElementById("visIndex" + i);
        let indexToUpdate2 = document.getElementById("visIndex" + j);

        indexToUpdate1.style.height = arr[i] + "%";
        indexToUpdate2.style.height = arr[j] + "%";

        await sleep();
    }

    async function swap (arr, i, j) {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        await update(arr, i, j);
    }

    function partition (arr, low, high) {
        let pivot = arr[high];
        let i = (low - 1);

        for (let j = low; j <= high-1; j++) {
            if (arr[j] < pivot) {
                i++
                swap(arr, i, j);
            }
        }
        swap(arr, i+1, high);
        return(i+1);
    }

    function quickSort (arr, low, high) {
        if (low < high) {
            let pi = partition(arr, low, high);
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
        console.log(arr);
    }

    return { swap, partition, quickSort }
})();

setup.presentArray(arrayToSort[1]);
// selectionSort.selectionSort(arrayToSort[1]);
// insertionSort.insertionSort(arrayToSort[1]);
// bubbleSort.bubbleSort(arrayToSort[1]);
// mergeSort.mergeSort(arrayToSort[1], 0, arrayToSort[1].length - 1);
quickSort.quickSort(arrayToSort[1], 0, arrayToSort[1].length - 1);
