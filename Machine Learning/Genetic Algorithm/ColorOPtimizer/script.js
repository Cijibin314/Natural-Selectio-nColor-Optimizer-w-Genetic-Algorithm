let chanceOfMutation =  1.0 // percent of 100
let degreeOfMutation = 18 // ammount of darkness that it changes
const percentOfPopulationThatDies = 50 // percent of 100
const numberToDivideBy = Math.round(100/percentOfPopulationThatDies)
let generationNumber = 0
function getFirstRGBNumber(rgbCode) {
    // Find the index of the first comma after "rgb("
    const startIndex = rgbCode.indexOf("(") + 1;
    const commaIndex = rgbCode.indexOf(",", startIndex);

    // Extract the substring containing the first RGB number
    const firstRGBNumber = rgbCode.substring(startIndex, commaIndex);

    // Convert the substring to a number and return it
    return parseInt(firstRGBNumber);
}
function initialize(){
    const chanceOfMutationSlider = document.getElementById("mutationChance");
    chanceOfMutationSlider.addEventListener("input", function() {
        chanceOfMutation = JSON.parse(chanceOfMutationSlider.value)
        document.getElementById("mutationChanceLabel").textContent = `Mutation Chance: ${chanceOfMutation}%`
    });
    const degreeOfMutationSlider = document.getElementById("mutationDegree");
    degreeOfMutationSlider.addEventListener("input", function() {
        degreeOfMutation = JSON.parse(degreeOfMutationSlider.value)
        document.getElementById("mutationDegreeLabel").textContent = `Mutation Degree: ${degreeOfMutation}`
    });
    const nextGenerationButton = document.getElementById("nextGenerationButton")
    nextGenerationButton.addEventListener("click", function() {
        nextGeneration()
    });
    const colorPicker = document.getElementById("colorPicker")
    colorPicker.addEventListener("input", function() {
        const darkness = colorPicker.value;
        canvas.darkness = darkness
        canvas.style.backgroundColor = `rgb(${darkness}, ${darkness}, ${darkness})`;
        document.body.style.backgroundColor = `rgb(${darkness}, ${darkness}, ${darkness})`;
        document.getElementById("colorPickerLabel").textContent = `Background Darkness: ${darkness}`
    });
    const canvas = document.getElementById('canvas')
    canvas.darkness = getFirstRGBNumber(getComputedStyle(canvas).backgroundColor)
    const styles = getComputedStyle(canvas)
    const canvasBorderWidth = JSON.parse(styles.borderWidth.slice(0, -2))
    const canvasWidth = Math.round(JSON.parse(styles.width.slice(0, -2)) - canvasBorderWidth)
    const canvasHeight = Math.round(JSON.parse(styles.height.slice(0, -2)) - canvasBorderWidth)
    const squareWidth = 10
    const squareHeight = 10
    // Creating squares
    for(let topOffset = 0; topOffset < canvasHeight + squareHeight; topOffset+= squareHeight){
        for(let leftOffset = 0; leftOffset < canvasWidth + squareWidth; leftOffset+= squareWidth){
            const square = document.createElement('div')
            square.classList.add('square')
            square.style.width = `${squareWidth}px`
            square.style.height = `${squareHeight}px`
            square.style.position = "absolute"
            square.style.left = `${leftOffset}px`
            square.style.top = `${topOffset}px`
            square.id = `${leftOffset}x${topOffset}`
            const darkness = Math.floor(Math.random() * 255)
            square.darkness = darkness
            square.style.backgroundColor = `rgb(${darkness}, ${darkness}, ${darkness})`
            canvas.appendChild(square)
        }
    }
}
document.addEventListener("DOMContentLoaded", initialize)
// The higher the number, the more fit
function fitnessFunc(squareDarkness){
    const canvasDarkness = canvas.darkness
    let maxDiff;
    if(250 - canvasDarkness > canvasDarkness){
        maxDiff = 250 - canvasDarkness
    }else{
        maxDiff = canvasDarkness
    }
    return maxDiff - Math.abs(squareDarkness - canvasDarkness)
}

function getTopHalf(){
    function getDarkness(square){
        return square.darkness
    }
    function getEle(id){
        return document.getElementById(id)
    }
    const elements = document.getElementsByClassName("square");

    let squares = [];

    for (var i = 0; i < elements.length; i++) {

        squares.push(elements[i].id);
    }
    const squareDarknesses = squares.map(getEle).map(getDarkness)
    const squareFitnesses = squareDarknesses.map(fitnessFunc)
    let comboArr = [];
    for(let i = 0; i < squareFitnesses.length; i++){
        comboArr.push([squareDarknesses[i],squareFitnesses[i]])
    }
    const sortedCombo = comboArr.sort(function(a, b) {
        return a[1] - b[1]; // Sort in ascending order based on the second integer
    });
    const topHalfOfCombo = sortedCombo.slice(Math.ceil(sortedCombo.length/numberToDivideBy), sortedCombo.length)
    const topHalfDarknesses = topHalfOfCombo.map(function(combo){
        return combo[0]
    })
    return topHalfDarknesses/*topHalfDarknesses.sort(function(a, b){
        return a - b
    })*/
}

function parentDarknessesToChild(parentOneDarkness, parentTwoDarkness) {
    const childDarkness = Math.round((parentOneDarkness + parentTwoDarkness) / 2)
    let childDarknesses = []
    for(let i = 0; i < 4; i++){
        const randomNum = Math.floor(Math.random() * 100)
        if(randomNum <= chanceOfMutation/*could be any # 1-100*/ ){
            if(Math.floor(Math.random() * 2) === 1){
                childDarknesses.push(childDarkness + degreeOfMutation)
            } else{
                childDarknesses.push(childDarkness - degreeOfMutation)
            }
        }else{
            childDarknesses.push(childDarkness)
        }
    }
    return childDarknesses
}

function generateNextGeneration(){
    const topHalfDarknesses = getTopHalf()
    let nextGeneration = []
    for(let i = 0; i < topHalfDarknesses.length; i += 2){
        const nextFour = parentDarknessesToChild(topHalfDarknesses[i], topHalfDarknesses[i + 1])
        for(darknessLevel in nextFour){
            nextGeneration.push(nextFour[darknessLevel])
        }
    }
    return nextGeneration
}

function fillWithDarknessLevels(darknessLevels){
    const canvas = document.getElementById('canvas')
    const styles = getComputedStyle(canvas)
    const canvasBorderWidth = JSON.parse(styles.borderWidth.slice(0, -2))
    const canvasWidth = Math.round(JSON.parse(styles.width.slice(0, -2)) - canvasBorderWidth)
    const canvasHeight = Math.round(JSON.parse(styles.height.slice(0, -2)) - canvasBorderWidth)
    const squareWidth = 10
    const squareHeight = 10
    let i = 0;
    for(let topOffset = 0; topOffset < canvasHeight + squareHeight; topOffset+= squareHeight){
        for(let leftOffset = 0; leftOffset < canvasWidth + squareWidth; leftOffset+= squareWidth){
            const square = document.getElementById(`${leftOffset}x${topOffset}`)
            const darkness = darknessLevels[i]
            square.darkness = darkness
            square.style.backgroundColor = `rgb(${darkness}, ${darkness}, ${darkness})`
            i++;
        }
    }
}
function nextGeneration(){
    generationNumber++
    fillWithDarknessLevels(generateNextGeneration())
    console.log(`Currently Showing F${generationNumber} Generation`)
}
