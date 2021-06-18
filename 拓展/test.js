
// arr: 升序
function binarySearch(arr, target) {
    let start = 0;
    let end = arr.length - 1
    let middle = Math.floor((start + end) / 2)

    if (arr.length === 1) {
        return arr[0] === target ? 0 : -1
    }

    while(start <= end) {
        if(arr[middle] === target) {
            return middle
        } else if(arr[middle] > target) {
            end = middle
            middle = Math.floor((start + end) / 2)
        } else {
            start = middle
            middle = Math.floor((start + end) / 2)
        }
    }
    return -1
  
}

// flattern
// 扁平化数组
function flattern(arr) {
    const res = []
    arr.forEach(item => {
        if(Array.isArray(item)) {
           return res.concat(flattern(item))
        } else {
            res.push(item)
        }
    })
    return res
}

