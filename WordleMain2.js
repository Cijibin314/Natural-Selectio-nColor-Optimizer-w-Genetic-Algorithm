function wordleBackground(){
    
    const htmlWord=   'boots';
    //DefiningVars
    let htmlWordIteratorAnlize1 = 0;
    let htmlWordIteratorAnlize2 = 0;
    let htmlWordDouble = false;
    let frozenHtmlDoubleIterator1 = 0;
    let frozenHtmlDoubleIterator2 = 0;
    let multipleVars2 = [false, false]
    let multipleVars = []
    let correctWord = 'foams';
    let correctWordDouble = false;
    let correctWordDoubleIndex1 = false;
    let correctWordDoubleIndex2 = false;
    function smallLogic(q, w, htmlWordIteratorAnlize1, htmlWordIteratorAnlize2, multipleVars2, htmlWordDouble){
        if(q !== w){
            if(htmlWordIteratorAnlize1 === htmlWordIteratorAnlize2){
                htmlWordDouble = true
                multipleVars2[0] = q;
                multipleVars2[1] = w;
            }
        }
        return multipleVars2;
    }
    //ToGetHtmlWordInfo
    let htmlWordFindsInfo = [];
    function htmlWordFinds(){
        for(let q = 0; q < 5;q++){
            htmlWordIteratorAnlize1 = htmlWord[q]
            for(let w = 1;w < 5;w++){
                htmlWordIteratorAnlize2 = htmlWord[w];
                multipleVars2 = smallLogic(q, w, htmlWordIteratorAnlize1, htmlWordIteratorAnlize2, multipleVars2, htmlWordDouble);
                if(multipleVars2[0]){
                    frozenHtmlDoubleIterator1 = multipleVars2[0]
                    frozenHtmlDoubleIterator2 = multipleVars2[1]
                    htmlWordDouble = true;

                }


            }
        }
        htmlWordFindsInfo[0] = htmlWordDouble;
        htmlWordFindsInfo[1] = frozenHtmlDoubleIterator1;
        htmlWordFindsInfo[2] = frozenHtmlDoubleIterator2;
        return htmlWordFindsInfo;
    }














    //Checking if it is a valid word
    
    const module = require('./wordleSide.js')
  
//    function ifWordPossible(resolve, reject){
//      if(module.ifWord(htmlWord) === true && htmlWord.length === 5){
//        resolve('')
//      }
//      else if(module.ifWord(htmlWord) === false || htmlWord.length !== 5){
 //       reject('Invalid Word')      }
//    function handleSuccess(input) {
//      console.log(input)
//   }
//    function handleFailure(input) {
//      console.log(input)
//    }
//    new Promise(ifWordPossible).then(handleSuccess).catch(handleFailure);
htmlWordFindsInfo = htmlWordFinds()
htmlWordDouble = htmlWordFindsInfo[0]
frozenHtmlDoubleIterator1 = htmlWordFindsInfo[1]
frozenHtmlDoubleIterator2 = htmlWordFindsInfo[2]
let nothingCounter = 0;
let colorsStorage = [];
function basicLogic(htmlWordIterator, htmlWordLetter, correctWordIterator, correctWordLetter, colorsStorage, multipleVars3, nothingCounter){
    if(htmlWordLetter === correctWordLetter && correctWordIterator === htmlWordIterator){
        colorsStorage.push('green')
    }
    else if(htmlWordLetter === correctWordLetter && correctWordIterator!==htmlWordIterator){
        colorsStorage.push('yellow')
    }

    else if(htmlWordLetter !== correctWordLetter){
        nothingCounter++;
    }
    else{
        console.log('d')

    }
    multipleVars3[0] = nothingCounter;
    return multipleVars3;
}
let repeatedCounterh = 0;
let repeatedCounter2 = 0;
let repeatedCounter3Html = 0;
let repeatedCounter3Correct = 0;
let multipleVars3 = [];
//Logic
function logic(multipleVars3, htmlWordIterator, htmlWordLetter, repeatedCounterh, repeatedCounter2, repeatedCounter3Html, repeatedCounter3Correcct, correctWordDouble, correctWordIterator, correctWordLetter, colorsStorage, multipleVars, nothingCounter, htmlWordDouble, frozenHtmlDoubleIterator1, frozenHtmlDoubleIterator2){

if(!htmlWordDouble && !correctWordDouble){
    multipleVars3 = basicLogic(htmlWordIterator, htmlWordLetter, correctWordIterator, correctWordLetter, colorsStorage, multipleVars3, nothingCounter)
    nothingCounter = multipleVars3[0]
}
else if(!htmlWordDouble && correctWordDouble){
    
    if(correctWordIterator === correctWordDoubleIndex1 || correctWordIterator === correctWordDoubleIndex2){
        if(repeatedCounter2 === 1){
            multipleVars3 = basicLogic(htmlWordIterator, htmlWordLetter, correctWordIterator, correctWordLetter, colorsStorage, multipleVars3, nothingCounter);
            nothingCounter = multipleVars3[0]
        }

        else if(repeatedCounter2 === 2){
            multipleVars3 = basicLogic(htmlWordIterator, htmlWordLetter, correctWordIterator, correctWordLetter, colorsStorage, multipleVars3, nothingCounter);
            nothingCounter = multipleVars3[0]
            if(colorsStorage[htmlWordIterator] === 'green'){
                colorsStorage[htmlWordIterator - 1] = 'gray';
            }
        }
        else{
            console.log('Houston, We have a problem 2')
        }
    }
    else{
        multipleVars = basicLogic(htmlWordIterator, htmlWordLetter, correctWordIterator, correctWordLetter, colorsStorage, multipleVars3, nothingCounter)
        nothingCounter = multipleVars3[0]
    }
}
else if(htmlWordDouble && !correctWordDouble){
    if(htmlWordIterator === frozenHtmlDoubleIterator1 || htmlWordIterator === frozenHtmlDoubleIterator2){
        if(repeatedCounterh === 0){
            multipleVars3 = basicLogic(htmlWordIterator, htmlWordLetter, correctWordIterator, correctWordLetter, colorsStorage, multipleVars3, nothingCounter)
            nothingCounter = multipleVars3[0]
        }
        else if(repeatedCounterh === 1){
            repeatedCounterh = 0
            multipleVars3 = basicLogic(htmlWordIterator, htmlWordLetter, correctWordIterator, correctWordLetter, colorsStorage, multipleVars3, nothingCounter)
            nothingCounter = multipleVars3[0]
            if(colorsStorage[htmlWordIterator + 1] === 'green'){
                colorsStorage.pop()
                colorsStorage.pop()
                colorsStorage.push('green')
            }
            else{
                colorsStorage.pop()
            }
        }
        else{
            console.log('Houston, we have a problem.')
        }
        multipleVars[1] = repeatedCounterh
    }
    else{
        multipleVars = basicLogic(htmlWordIterator, htmlWordLetter, correctWordIterator, correctWordLetter, colorsStorage, multipleVars3, nothingCounter)
        nothingCounter = multipleVars3[0]
    }
}
else{
    if(correctWordIterator === correctWordDoubleIndex1 || correctWordIterator === correctWordDoubleIndex2 || htmlWordIterator === frozenHtmlDoubleIterator1 || htmlWordIterator === frozenHtmlDoubleIterator2){
        if(correctWordIterator === correctWordDoubleIndex1 || correctWordIterator === correctWordDoubleIndex2 && htmlWordIterator === frozenHtmlDoubleIterator1 || htmlWordIterator === frozenHtmlDoubleIterator2){

        }
        else if(correctWordIterator === correctWordDoubleIndex1 || correctWordIterator === correctWordDoubleIndex2){

        }
        else if(htmlWordIterator === frozenHtmlDoubleIterator1 || htmlWordIterator === frozenHtmlDoubleIterator2){

        }
    }
    else{
        multipleVars = basicLogic(htmlWordIterator, htmlWordLetter, correctWordIterator, correctWordLetter, colorsStorage, multipleVars3, nothingCounter)
        nothingCounter = multipleVars3[0]
    }
    multipleVars[0] = nothingCounter;
    multipleVars[1] = repeatedCounterh;
    multipleVars[2] = repeatedCounter2;
}
multipleVars[0] = nothingCounter;
multipleVars[1] = repeatedCounterh;
return multipleVars;
}
//LogicLoop
for (let htmlWordIterator = 0;htmlWordIterator < 5;htmlWordIterator++){
    htmlWordLetter = htmlWord[htmlWordIterator]
    if(!correctWordDouble && htmlWordDouble && htmlWordIterator === frozenHtmlDoubleIterator1 || htmlWordIterator === frozenHtmlDoubleIterator2){
        repeatedCounterh++;
    }
  for(let correctWordIterator = 0;correctWordIterator < 5;correctWordIterator++){
    correctWordLetter = correctWord[correctWordIterator]
    multipleVars = logic(multipleVars3, htmlWordIterator, htmlWordLetter, repeatedCounterh, repeatedCounter2, repeatedCounter3Html, repeatedCounter3Correct, correctWordDouble, correctWordIterator, correctWordLetter, colorsStorage, multipleVars, nothingCounter, htmlWordDouble, frozenHtmlDoubleIterator1, frozenHtmlDoubleIterator2)
    nothingCounter = multipleVars[0];
    repeatedCounterh = multipleVars[1];
    if(correctWordDouble && !htmlWordDouble){
        repeatedCounter2++;
    }
    if(nothingCounter >= 5){
      colorsStorage.push('gray');
      nothingCounter = 0;
    }}
}









class ColorsHtml{
    constructor(list){
      this._1 = list[0]
      this._2 = list[1]
      this._3 = list[2]
      this._4 = list[3]
      this._5 = list[4]
    }
    get _one(){
      return this._1
    }
    get _two(){
      return this._2
    }
    get _three(){
      return this._3
    }
    get _four(){
      return this._4
    }
    get _five(){
      return this._5
    }
    }
    let colorsNewClass = new ColorsHtml(colorsStorage)  
    return colorsNewClass;
}
colorsNewClass = wordleBackground()
    console.log(colorsNewClass._one)
    console.log(colorsNewClass._two)
    console.log(colorsNewClass._three)
    console.log(colorsNewClass._four)
    console.log(colorsNewClass._five)