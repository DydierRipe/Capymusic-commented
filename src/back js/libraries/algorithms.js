"use strict"

const searching = (arr, value, elementName) => {
    let inf = 0, sup = arr.length - 1; // defines inferior and superior elements

    while (inf <= sup) {
        let mid = Math.floor((inf + sup) / 2); // promedium of inferior and superior is the middle of the array

        if (arr[mid][elementName] == value) {
            return [arr[mid], mid]; // if is equal return data and index of the array objectnode
        } else if (arr[mid][elementName] < value) {
            inf = mid + 1; // if isn't equal and the value is bigger than the mid, inferior becomes the middle
        } else { 
            sup = mid - 1; // if isn't equal and the value is lower than the mid, superior becomes the middle
        }
    }

    return false; // only returns it if the item hasn't found
}

const swap = (items, leftIndex, rightIndex) => {
    // internet code again XDD
    var temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
}

const partition = (items, left, right, objectSelect) => {
    // internet code lol
    var pivot   = items[Math.floor((right + left) / 2)][objectSelect], //middle element
        i       = left, //left pointer
        j       = right; //right pointer
    while (i <= j) {
        while (items[i][objectSelect] < pivot) {
            i++;
        }
        while (items[j][objectSelect] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(items, i, j); //swap two elements
            i++;
            j--;
        }
    }
    return i;
}

const quickSort = (items, left, right, objectSelect) => {
    // last internet code XDD
    var index;
    if (items.length > 1) {
        index = partition(items, left, right, objectSelect); //index returned from partition
        if (left < index - 1) { //more elements on the left side of the pivot
            quickSort(items, left, index - 1, objectSelect);
        }
        if (index < right) { //more elements on the right side of the pivot
            quickSort(items, index, right, objectSelect);
        }
    }
    return items;
}

const algorithms = {};

algorithms.searching = searching;
algorithms.quickSort = quickSort;

module.exports =  algorithms;
