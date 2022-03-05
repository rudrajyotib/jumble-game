export function sliceArray(inputArray, chunkSize) {
    return inputArray.reduce((result, item, index) => {
        const chunkIndex = Math.floor(index / chunkSize);
        result[chunkIndex] = [].concat((result[chunkIndex] || []), item);
        return result
    }, [])
}