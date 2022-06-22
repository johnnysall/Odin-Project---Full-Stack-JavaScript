let arrayLength = 100;

// First Nested is the sorted subarray, Second Nested is unsorted subarray
let arrayToSort = [[],[]];

for (let i = 0; i < arrayLength; i++) {
    arrayToSort[1].push(Math.round((Math.random() * 99) + 1));
}

const visualArrayContainer = document.getElementById("visualArrayContainer");
visualArrayContainer.style.gridTemplateColumns = "auto";
const arrayContainer = document.getElementById("arrayContainer");
arrayContainer.style.gridTemplateColumns = "repeat(" + arrayLength + ", 1fr)";

let sleepTime = 10;

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

async function selectionSortFunc() {
    for (let i = 0; i < arrayLength; i++) {
        let smallestNum = 3434;
        let smallestNumIndex = 0;

        for (let x = 0; x < arrayToSort[1].length; x++) {
            if (arrayToSort[1][x] !== Infinity){
                const arrayItem = document.getElementsByClassName("index" + x);
                arrayItem[0].style.backgroundColor = "yellow";
                arrayItem[1].style.backgroundColor = "yellow";
            }

            if (smallestNum > arrayToSort[1][x] && smallestNum !== Infinity) {
                if (arrayToSort[1][smallestNumIndex] !== Infinity) {
                    const oldSmallestNumber = document.getElementsByClassName("index" + smallestNumIndex);
                    oldSmallestNumber[0].style.backgroundColor = "yellow";
                    oldSmallestNumber[1].style.backgroundColor = "yellow";
                }
                smallestNum = arrayToSort[1][x];
                smallestNumIndex = x;
                const newSmallestNumber = document.getElementsByClassName("index" + x);
                newSmallestNumber[0].style.backgroundColor = "red";
                newSmallestNumber[1].style.backgroundColor = "red";
            }

            if (arrayToSort[1][x] !== Infinity){
                await sleep();
            }
        }
        arrayToSort[1][smallestNumIndex] = Infinity;
        arrayToSort[0].push(smallestNum);

        console.log(arrayToSort);

        const arrayOfItems = document.getElementsByClassName("arrayItem");
        for (let a = 0; a < arrayToSort[1].length; a++){
            if (arrayToSort[1][a] !== Infinity){
                arrayOfItems[a].style.backgroundColor = "rgb(196, 196, 196)";
                arrayOfItems[a+arrayToSort[1].length].style.backgroundColor = "rgb(196, 196, 196)";
            }
        }
        const arrayItem = document.getElementsByClassName("index" + smallestNumIndex);
        arrayItem[0].style.backgroundColor = "green";
        arrayItem[0].style.gridRow = "3";
        arrayItem[0].style.gridColumn = i+1;

        arrayItem[1].style.backgroundColor = "green";
        arrayItem[1].style.gridRow = "1";
        arrayItem[1].style.gridColumn = i+1;
    }
}

const insertionSort = (() => {
    async function update (arr, num1Index, num2Index, i) {
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

    async function insertionSort(arr, len) {
        let i, j, key;
    
        for (i = 1; i < len; i++) {
            let startingPoint = document.getElementById("visIndex" + i);
            startingPoint.style.backgroundColor = "rgb(80, 221, 61)";

            key = arr[i];
            j = i - 1;
            while (j >= 0 && arr[j] > key) {
                let tempItem = arr[j + 1];
                arr[j+1] = arr[j]; 
                arr[j] = tempItem;
                j = j - 1; 
                await update(arr, j+1, j+2, i);
            } 
            arr[j + 1] = key; 
            let sortedNum = document.getElementById("visIndex" + (j+1));
            sortedNum.style.backgroundColor = "blue";
        }
        for (i = 0; i < len; i++) {
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

    async function bubbleSort(arr, len) {
        let i, j;
        
        for (i=0; i < len-1; i++) {
            for (j=0; j < len-i-1; j++){
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

    // Split array - check 
    async function merge(arr, l, m, r) {
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
            k++
        }

        while (i < l1) {
            arr[k] = lArray[i];
            i++ 
            k++
        }
        while (j < l2) {
            arr[k] = rArray[j];
            j++ 
            k++
        }
    }

    async function mergeSort(arr, l, r) {
        if (l >= r) {
            return;
        }

        var m = l + parseInt((r-l)/2);
        mergeSort(arr,l,m);
        mergeSort(arr,m+1,r);
        merge(arr,l,m,r);
    }

    const begin = () => {

    }

    return { merge, mergeSort, begin };
})();

const quickSort = (() => {
    function swap (arr, i, j) {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
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
    }

    return { swap, partition, quickSort }
})();

setup.presentArray(arrayToSort[1]);
selectionSortFunc();
// insertionSort.insertionSort(arrayToSort[1], arrayLength);
// bubbleSort.bubbleSort(arrayToSort[1], arrayLength);
// mergeSort.mergeSort(arrayToSort[1], 0, arrayToSort[1].length - 1);
// quickSort.quickSort(arrayToSort[1], 0, arrayToSort[1].length - 1);
