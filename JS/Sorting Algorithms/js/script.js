let arrayLength = 15;
let arrayToSort = [];

for (let i = 0; i < arrayLength; i++) {
    arrayToSort.push(Math.round((Math.random() * 100) + 1));
}

const arrayContainer = document.getElementById("arrayContainer");

const setup = (() => {
    const clearArray = () => {
        arrayContainer.innerHTML = "";
    }

    const presentArray = () => {
        for (let i = 0; i < arrayLength; i++) {
            const arrayItem = document.createElement("div");
            arrayItem.classList.add("arrayItem");
            arrayItem.classList.add("number"+arrayToSort[i]);
            arrayItem.classList.add("index"+i);
            arrayItem.innerText = arrayToSort[i];
            arrayItem.style.width = 100/arrayLength + "%";

            arrayContainer.appendChild(arrayItem);
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

const selectionSort = () => {
    for (let i = 0; i < arrayLength; i++) {
        let currentNum = arrayToSort[i];
        let smallestNum = arrayToSort[i];
        let smallestNumIndex = i;
        setup.moveItem(i, "down");
        for (let x = 0+i; x < arrayLength; x++) {
            if (smallestNum > arrayToSort[x]) {
                smallestNum = arrayToSort[x];
                smallestNumIndex = x;
            }
            console.log(i);
            setup.moveItem(i, "right");
        }
        arrayToSort[smallestNumIndex] = currentNum;
        arrayToSort[i] = smallestNum;
        setup.moveItem(i, "up");

        // setup.clearArray();
        // setup.presentArray();
    }
}


const insertionSort = () => {
    
}

const bubbleSort = () => {
    
}

const mergeSort = () => {
    
}

const quickSort = () => {
    
}

setup.presentArray();
selectionSort();



