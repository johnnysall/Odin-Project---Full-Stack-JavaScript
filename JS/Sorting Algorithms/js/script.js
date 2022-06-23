let arrayLength = 200;
let arrayToSort = [];
let running = false;

const visualArrayContainer = document.getElementById("visualArrayContainer");
visualArrayContainer.style.gridTemplateColumns = "auto";

const resetArrBtn = document.getElementById("resetArrBtn");
resetArrBtn.addEventListener("click", function() {
    if (running !== true) {
        setup.resetArray();
    }
});

const navBarList = [resetArrBtn];

const selectionSortBtn = document.getElementById("selectionSortBtn");
navBarList.push(selectionSortBtn);
if (selectionSortBtn) {
    selectionSortBtn.addEventListener("click", async function() {
        if (running !== true) {
            running = true;
            setup.disableNavBarElements("selectionSortBtn"); 
            await selectionSort.selectionSort(arrayToSort);
            setup.enableNavBarElements("selectionSortBtn"); 
            running = false;
        }
    });
}

const insertionSortBtn = document.getElementById("insertionSortBtn");
navBarList.push(insertionSortBtn);
if (insertionSortBtn) {
    insertionSortBtn.addEventListener("click", async function() {
        if (running !== true) {
            running = true;
            setup.disableNavBarElements("insertionSortBtn"); 
            await insertionSort.insertionSort(arrayToSort);
            setup.enableNavBarElements("insertionSortBtn"); 
            running = false;
        }
    });
}

const bubbleSortBtn = document.getElementById("bubbleSortBtn");
navBarList.push(bubbleSortBtn);
if (bubbleSortBtn) {
    bubbleSortBtn.addEventListener("click", async function() {
        if (running !== true) {
            running = true;
            setup.disableNavBarElements("bubbleSortBtn"); 
            await bubbleSort.bubbleSort(arrayToSort);
            setup.enableNavBarElements("bubbleSortBtn"); 
            running = false;
        }
    });
}

const mergeSortBtn = document.getElementById("mergeSortBtn");
navBarList.push(mergeSortBtn);
if (mergeSortBtn) {
    mergeSortBtn.addEventListener("click", async function() {
        if (running !== true) {
            running = true;
            setup.disableNavBarElements("mergeSortBtn"); 
            await mergeSort.mergeSort(arrayToSort, 0, arrayToSort.length - 1);
            setup.enableNavBarElements("mergeSortBtn"); 
            running = false;
        }
    });
}

const quickSortBtn = document.getElementById("quickSortBtn");
navBarList.push(quickSortBtn);
if (quickSortBtn) {
    quickSortBtn.addEventListener("click", async function() {
        if (running !== true) {
            running = true;
            setup.disableNavBarElements("quickSortBtn"); 
            await quickSort.quickSort(arrayToSort, 0, arrayToSort.length - 1);
            setup.enableNavBarElements("quickSortBtn"); 
            running = false;
        }
    });
}

let sleepTime = 20;
let comparisons = 0;
let completed = 0;
function sleep () {
    return new Promise((resolve) => setTimeout(resolve, sleepTime));
}

const speedMsContainer = document.getElementById("speedMsContainer");
speedMsContainer.innerText = "Array Speed (ms): " + sleepTime;

const arraySizeContainer = document.getElementById("arraySizeContainer");
arraySizeContainer.innerText = "Array Size: " + arrayLength;

const comparisonsContainer = document.getElementById("comparisonsContainer");
comparisonsContainer.innerText = "Comparisons: " + comparisons;

const completedContainer = document.getElementById("completedContainer");
completedContainer.innerText = "Completed: " + completed;

const speedRange = document.getElementById("speedRange");
const sizeRange = document.getElementById("sizeRange");

function speedSliderUpdate() {
    sleepTime = speedRange.value;
    speedMsContainer.innerText = "Array Speed (ms): " + sleepTime;
}

function arraySizeSliderUpdate() {
    if (running !== true) {
        arrayLength = sizeRange.value;
        arraySizeContainer.innerText = "Array Size: " + arrayLength;
        setup.resetArray(arrayToSort);
    }
}

const setup = (() => {
    const resetArray = () => {
        running = false;
        arrayToSort = [];
        comparisons = 0;
        completed = 0;
        comparisonsContainer.innerText = "Comparisons: " + comparisons;
        completedContainer.innerText = "Completed: " + completed;
        
        for (let i = 0; i < arrayLength; i++) {
            arrayToSort.push(Math.round((Math.random() * 99) + 1));
        }
        presentArray(arrayToSort);
    }

    const updateComparisons = () => {
        comparisons = comparisons + 1;
        comparisonsContainer.innerText = "Comparisons: " + comparisons;
    }

    const updateCompleted = () => {
        completed = completed + 1;
        completedContainer.innerText = "Completed: " + completed;
    }

    const disableNavBarElements = (id) => {
        sizeRange.disabled = true;
        for (let i = 0; i < navBarList.length; i++) {
            navBarList[i].classList.add("disabled");
            if (navBarList[i].id !== id) {
                navBarList[i].classList.add("notActive");
            } else {
                navBarList[i].classList.add("active");
            }
        }
    }

    const enableNavBarElements = (id) => {
        sizeRange.disabled = false;
        for (let i = 0; i < navBarList.length; i++) {
            navBarList[i].classList.remove("disabled");
            if (navBarList[i].id !== id) {
                navBarList[i].classList.remove("notActive");
            } else {
                navBarList[i].classList.remove("active");
            }
        }
    }

    const presentArray = (arr) => {
        // arrayContainer.innerHTML = "";
        visualArrayContainer.innerHTML = "";
        for (let i = 0; i < arr.length; i++) {
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
            visualArrayContainer.appendChild(visArrayItem);
        }
    }

    return { resetArray, updateComparisons, updateCompleted, disableNavBarElements, enableNavBarElements, presentArray };
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
                setup.updateComparisons();
                await sleep();
                currentSmallNum.style.backgroundColor = "yellow";
                numToCompare.style.backgroundColor = "yellow";
            }
            var tempItem = arr[smallestNumIndex];
            arr[smallestNumIndex] = arr[i];
            arr[i] = tempItem;

            currentSmallNum = document.getElementById("visIndex" + smallestNumIndex);
            currentSmallNum.style.height = arr[smallestNumIndex] + "%";

            numToCompare = document.getElementById("visIndex" + i);
            numToCompare.style.backgroundColor = "green";
            numToCompare.style.height = arr[i] + "%";
            setup.updateCompleted();

            for (let y=0; y < arr.length-i-1; y++) {
                let item = document.getElementById("visIndex" + (y+i+1));
                item.style.backgroundColor = "rgb(196, 196, 196)";
            }
        }
    };

    return { selectionSort };
})();

const insertionSort = (() => {
    async function update (arr, num1Index, num2Index) {
        let num1ToSwap = document.getElementById("visIndex" + num1Index);
        let num2ToSwap = document.getElementById("visIndex" + num2Index);

        num1ToSwap.style.height = arr[num1Index] + "%";
        num1ToSwap.style.backgroundColor = "red";
        num2ToSwap.style.height = arr[num2Index] + "%";
        setup.updateComparisons();
        await sleep();
    };

    async function insertionSort(arr) {
        let i, j, key;
    
        for (i = 1; i < arr.length; i++) {
            let startingPoint = document.getElementById("visIndex" + i);
            startingPoint.style.backgroundColor = "blue";

            key = arr[i];
            j = i - 1;
            while (j >= 0 && arr[j] > key) {
                let tempItem = arr[j + 1];
                arr[j+1] = arr[j]; 
                arr[j] = tempItem;
                j = j - 1; 
                await update(arr, j+1, j+2);

                let num1 = document.getElementById("visIndex" + (j+1));
                num1.style.backgroundColor = "yellow";
            } 
            arr[j + 1] = key; 
        }
        for (i = 0; i < arr.length; i++) {
            let completedItem = document.getElementById("visIndex" + i);
            completedItem.style.backgroundColor = "green";
            setup.updateCompleted();
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
        num2ToSwap.style.left = (index * (100/(arrayLength))) + "%";
        num2ToSwap.id = "visIndex" + index;
    }

    async function bubbleSort(arr) {
        let i, j;
        
        for (i=0; i < arr.length-1; i++) {
            for (j=0; j < arr.length-i-1; j++){
                if (arr[j] >= arr[j+1]) {
                    await swap(arr, arr[j], arr[j+1], j);
                }
                let numToSwap = document.getElementById("visIndex" + j);
                numToSwap.style.backgroundColor = "yellow";
                let numToSwap2 = document.getElementById("visIndex" + (j+1));
                numToSwap2.style.backgroundColor = "red";
                setup.updateComparisons();
                await sleep();
            }
            for (let y=0; y < arr.length-i-1; y++) {
                let item = document.getElementById("visIndex" + (y));
                item.style.backgroundColor = "rgb(196, 196, 196)";
            }

            const visSortedNum = document.getElementById("visIndex" + j);
            visSortedNum.style.backgroundColor = "green";
            setup.updateCompleted();
        }
        const visSortedNum = document.getElementById("visIndex0");
        visSortedNum.style.backgroundColor = "green";
        setup.updateCompleted();
    }

    return { swap, bubbleSort };
})();

const mergeSort = (() => {
    async function update(arr, k, lastMerge) {
        let indexToUpdate = document.getElementById("visIndex" + k);
        indexToUpdate.style.height = arr[k] + "%";
        setup.updateComparisons();

        if (lastMerge === true) {
            setup.updateCompleted();
            indexToUpdate.style.backgroundColor = "green";
        }
        await sleep();
    }

    // Split array - check 
    async function merge(arr, l, m, r) {
        let lastMerge;
        for (let i=0; i < r-l; i++) {
            let item = document.getElementById("visIndex" + (i+l));
            item.style.backgroundColor = "yellow";
        }
        let lSide = document.getElementById("visIndex" + l);
        lSide.style.backgroundColor = "red";
        let rSide = document.getElementById("visIndex" + r);
        rSide.style.backgroundColor = "red";

        if (l == 0) {
            if (r == arr.length-1) {
                lastMerge = true;
            }
        }
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
            await update(arr, k, lastMerge);
            k++
        }

        while (i < l1) {
            arr[k] = lArray[i];
            i++ 
            await update(arr, k, lastMerge);
            k++
        }
        while (j < l2) {
            arr[k] = rArray[j];
            j++ 
            await update(arr, k, lastMerge);
            k++
        }

        if (lastMerge !== true) {
            lSide.style.backgroundColor = "yellow";
            rSide.style.backgroundColor = "yellow";
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
        indexToUpdate1.style.backgroundColor = "red";
        indexToUpdate2.style.height = arr[j] + "%";
        indexToUpdate2.style.backgroundColor = "red";

        setup.updateComparisons();
        await sleep();

        indexToUpdate1.style.backgroundColor = "rgb(196, 196, 196)";
        indexToUpdate2.style.backgroundColor = "rgb(196, 196, 196)";
    }

    async function swap (arr, i, j) {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        await update(arr, i, j);
    }

    async function partition (arr, low, high) {
        let pivot = arr[high];
        let i = (low - 1);

        for (let j = low; j <= high-1; j++) {
            if (arr[j] < pivot) {
                i++
                await swap(arr, i, j);
            }
        }
        await swap(arr, i+1, high);
        return(i+1);
    }

    async function quickSort (arr, low, high) {
        if (low < high) {
            let piItem = document.getElementById("visIndex" + high);
            piItem.style.backgroundColor = "green";
            let pi = await partition(arr, low, high);
            await quickSort(arr, low, pi - 1);
            await quickSort(arr, pi + 1, high);
        }
    }

    return { swap, partition, quickSort }
})();

setup.resetArray(arrayToSort);
