let arrayLength = 6;

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

    const presentArray = () => {
        for (let i = 0; i < arrayLength; i++) {
            // Show List of numbers in array
            const arrayItem = document.createElement("div");
            arrayItem.classList.add("arrayItem");
            arrayItem.classList.add("number"+arrayToSort[1][i]);
            arrayItem.classList.add("index"+i);
            arrayItem.innerText = arrayToSort[1][i];
            arrayContainer.appendChild(arrayItem);


            // Create visualisation for array
            const visArrayItem = document.createElement("div");
            visArrayItem.classList.add("arrayItem");
            visArrayItem.classList.add("number"+arrayToSort[1][i]);
            visArrayItem.classList.add("index"+i);
            visArrayItem.style.height = arrayToSort[1][i] + "%";
            visArrayItem.style.gridRow = "1";
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

function shiftList() {

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
    return arr;
}

const bubbleSort = (() => {
    const swap = (arr, num1, num2, index) => {
        arr[index] = num2;
        arr[index + 1] = num1;
    }

    async function bubbleSort(arr, len) {
        let i, j;
        
        for (i=0; i < len-1; i++) {
            for (j=0; j < len-i-1; j++){
                if (arr[j] > arr[j+1]) {
                    swap(arr, arr[j], arr[j+1], j);
                }
            }
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

        console.log("Arr: " + arr)
        for (i = 0; i < l1; i++) {
            console.log("arr[l+i] " + arr[l+i])
            lArray[i] = arr[l+i];
        }
        for (j = 0; j < l2; j++) {
            console.log("arr[m+1+j] " + arr[m+1+j])
            rArray[i] = arr[m+1+j];
        }

        console.log("rArray: " + rArray);        console.log("rArray: " + rArray);
        console.log("lArray: " + lArray);

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
        console.log("arr " + arr + " l: " + l + " m: " + m + " r: " + r)

        merge(arr,l,m,r);
    }

    const begin = () => {

    }

    return { merge, mergeSort, begin };
})();

const quickSort = () => {
    
}

setup.presentArray();
// selectionSortFunc();
// insertionSort(arrayToSort[1], arrayLength);
// bubbleSort.bubbleSort(arrayToSort[1], arrayLength);
mergeSort.mergeSort(arrayToSort[1], 0, arrayToSort[1].length - 1)


