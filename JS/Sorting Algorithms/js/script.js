let arrayLength = 50;

// First Nested is the sorted subarray, Second Nested is unsorted subarray
let arrayToSort = [[],[]];

for (let i = 0; i < arrayLength; i++) {
    arrayToSort[1].push(Math.round((Math.random() * 99) + 1));
}

const visualArrayContainer = document.getElementById("visualArrayContainer");
visualArrayContainer.style.gridTemplateColumns = "auto";
const arrayContainer = document.getElementById("arrayContainer");
arrayContainer.style.gridTemplateColumns = "repeat(" + arrayLength + ", 1fr)";

function sleep (ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const setup = (() => {
    const clearArray = () => {
        arrayContainer.innerHTML = "";
    }

    const presentArray = (arr) => {
        arrayContainer.innerHTML = "";
        visualArrayContainer.innerHTML = "";
        for (let i = 0; i < arr.length; i++) {
            // Show List of numbers in array
            const arrayItem = document.createElement("div");
            arrayItem.classList.add("arrayItem");
            arrayItem.classList.add("number"+arr[i]);
            arrayItem.classList.add("index"+i);
            arrayItem.innerText = arr[i];
            arrayItem.style.gridRow = "1";
            arrayItem.style.gridColumn = i+1;
            arrayContainer.appendChild(arrayItem);


            // Create visualisation for array
            const visArrayItem = document.createElement("div");
            visArrayItem.classList.add("visArrayItem");
            visArrayItem.classList.add("number"+arr[i]);
            visArrayItem.classList.add("index"+i);
            visArrayItem.style.height = arr[i] + "%";
            visArrayItem.style.width = (100/(arrayLength+1)) + "%";
            visArrayItem.style.left = (i * (100/(arrayLength+1))) + "%";
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
                await sleep(1);
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

async function insertionSort(arr, len) {
    let i, j, key;

    for (i = 1; i < len; i++) {
        key = arr[i];
        j = i - 1;

        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j]; 
            j = j - 1; 
        } 
        arr[j + 1] = key; 
    }
}

const bubbleSort = (() => {
    function swap (arr, num1, num2, index) {
        console.log("SWAP");
        arr[index] = num2;
        arr[index + 1] = num1;

        const num1ToSwap = document.getElementsByClassName("number" + num1);
        const num2ToSwap = document.getElementsByClassName("number" + num2);

        const transform1 = num1ToSwap[1].getPropertyValue("left");
        const transform2 = num2ToSwap[1].getPropertyValue("left");
    
        // num1ToSwap[0].style.gridColumn = j+1;
        num1ToSwap[1].style.left = transform2;
        // // num2ToSwap[0].style.gridColumn = j;
        num2ToSwap[1].style.left = transform1;

        // return new Promise(resolve => {
        //     const num1ToSwap = document.getElementsByClassName("number" + num1);
        //     const num2ToSwap = document.getElementsByClassName("number" + num2);
    
        //     const transform1 = await num1ToSwap.getPropertyValue("left");
        //     const transform2 = await num2ToSwap.getPropertyValue("left");
        
        //     // num1ToSwap[0].style.gridColumn = j+1;
        //     num1ToSwap[1].style.left = transform2;
        //     // // num2ToSwap[0].style.gridColumn = j;
        //     num2ToSwap[1].style.left = transform1;

        //     // Wait for the transition to end!
        //     window.requestAnimationFrame(function() {
        //         setTimeout(() => {
        //             container.insertBefore(el2, el1);
        //             resolve();
        //         }, 250);
        //     });
        // });

    }

    async function bubbleSort(arr, len) {
        let i, j, num1ToSwap, num2ToSwap;
        
        for (i=0; i < len-1; i++) {
            const numToBeSorted = document.getElementsByClassName("index" + i);
            numToBeSorted[0].style.backgroundColor = "yellow";
            numToBeSorted[1].style.backgroundColor = "yellow";

            for (j=0; j < len-i-1; j++){
                if (arr[j] > arr[j+1]) {
                    await swap(arr, arr[j], arr[j+1], j);
                }
                // setup.presentArray(arr);
                await sleep(1000);
            }
            const sortedNum = document.getElementsByClassName("index" + j);
            sortedNum[0].style.backgroundColor = "green";
            sortedNum[1].style.backgroundColor = "green";
        }
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
// selectionSortFunc();
// insertionSort(arrayToSort[1], arrayLength);
bubbleSort.bubbleSort(arrayToSort[1], arrayLength);
// mergeSort.mergeSort(arrayToSort[1], 0, arrayToSort[1].length - 1);
// quickSort.quickSort(arrayToSort[1], 0, arrayToSort[1].length - 1);
