let table = document.getElementById('table-box');
let rows = 8;
let col = 8;
var arr = [[],[],[],[],[],[],[],[]];
let UsedWord = [];
let keyPressNumber = 2;

let p1score=0;
let p2score=0;


for (let i = 0; i < rows; i++) {

    let tr = document.createElement('tr');
    for (let j = 0; j < col; j++) {
            let td = document.createElement('td');
            td.innerHTML = `<input class="inputvalue" maxlength="1" id="${i}${j}"  type="text">`;
            tr.appendChild(td);
    }
    table.appendChild(tr);

}

let player1Array = [];
let player2Array = [];

table.onkeyup = (e)=>{
    let element  = document.getElementById(e.target.id)
    let charCode = e.keyCode;
    if (charCode > 31 && (charCode < 65 || charCode > 90)) 
    {
        console.log(charCode)
        alert("Enter letters only.");
        element.value = element.defaultValue;
        
    }else{
       if(keyPressNumber%2 == 0){
            element.style.color = "red";
            
            if(player1Array.includes(charCode)){
                alert("Can't enter same letter");
                element.value = element.defaultValue;
               
            }
            else{
                console.log(e.keyCode);
                keyPressNumber++;
                element.blur();
                element.disabled=true;
                console.log(element.value)
                player1Array.push(charCode);
            }
       }
       else{
            element.style.color = "black";
            if(player2Array.includes(charCode)){
                alert("Can't enter same letter");
                element.value = element.defaultValue;
            }
            
            else{
                console.log(e.keyCode);
                keyPressNumber++
                element.blur();
                element.disabled=true;
                console.log(element.value);
                player2Array.push(charCode);
            }
       }
       if(player1Array.length >= 27 || player2Array.length >= 27){
        alert("game Over");
        location.reload();
       }
        // console.log(player1Array);
        // console.log(player2Array);
        for(let i = 0 ;i < arr.length; i++){
            arr[i]=[];
            for (let j = 0; j < arr.length; j++) {
                
                arr[i].push(document.getElementById(`${i}${j}`).value);
               
            }
        }
        // console.log(arr);
        // console.log((e.target.id));
        valueOfRowCol(arr,e.target.id);
    }

   
}


 
function valueOfRowCol(customArr,id){

    let RowValues = [];
    let ColValues = [];
    
    RowValues.splice(8);
  
    ColValues.splice(8);
   

    let spletedID = id.split('');
    let row = spletedID[0];
    let col = spletedID[1];


    
        for (let i = 0; i < customArr.length; i++) {
            RowValues.push(customArr[row][i]);
        }
        console.log(RowValues);
        for (let i = 0; i < customArr.length; i++) {
            ColValues.push(customArr[i][col]);
        }
         console.log(ColValues);
     

        splitArray(RowValues);
        splitArray(ColValues);
   
}

//splite array with '' 
function splitArray(arr){
    let temp = [];
    let result = []
    for(var i = 0; i < arr.length; i++) {
        if (arr[i] === '') {
            if (temp.length == 0) continue;
            result.push(temp);
            temp = [];
        }
        else {
            temp.push(arr[i]);
        }
    }
    if (temp.length != 0) result.push(temp);
    
    
    console.log(result)

    for(let i = 0 ; i<result.length ;i++){
        subString(result[i],result[i].length)
    }
    // findWord(result[0]);
    // findWord([...result[0]].reverse());
     
}

function subString(str,n)
	{
	    var ouputSize = (n*(n-1))/2,c = -1;
        var outputArray = new Array(ouputSize);
		for(let i = 0;i < n;i++){
            for(let j = i+1;j <= n-1;j++){
                outputArray[++c] = new Array(j-i+1);
                var c2 = -1;
                for(let k = i;k <= j;k++){
                    outputArray[c][++c2] = str[k];
                }
            }
        }
        console.log(outputArray);
		// 
        for(let i = 0 ; i<outputArray.length ;i++){
            findWord(outputArray[i]);
        }
	}


// // Finding and extracting words
function findWord( letters ) {

    word =  '';
    let checkAllBlankorNot = letters.every((item)=>{
        return item == '';
    })
    if(checkAllBlankorNot){
        return;
    }
    for(let i=0;i<letters.length;i++){
        if(letters[i] != ''){
        word=word+letters[i];
        
        }
       
        else{
            word=word+" ";
        }
        
    }
    
    console.log(word.trim());
    console.log(`word length ${word.trim().length}`);  
    if(word.trim().length == 0){
        word = '';
    }
    
    let newWord = word.trim();
  
    
    var status = "";
    if(UsedWord.includes(newWord)){
        return
    }
    else{
        try 
    {
        var ftrie = new FrozenTrie( dic.trie,dic.directory, dic.nodeCount);

        if ( ftrie.lookup(newWord) ) {
            status = '"' + newWord + "' is in the dictionary.";
                UsedWord.push(newWord)
                if(keyPressNumber%2 == 1){
                    p2score=p2score+3;
                    document.getElementById("p1score").innerHTML = p2score;
                }else{
                    p1score=p1score+3;
                    document.getElementById("p2score").innerHTML = p1score;
                
            }

        } else {
            status = '"' + newWord + "' IS NOT in the dictionary.";
            console.log(`keyPressNumber ${keyPressNumber}`);
        }
    } catch ( e ) {
        status = "Error. Have you encoded the dictionary yet?";
    }

    }
  
    console.log(status);

    console.log(`used word ${UsedWord}`);
   

}











