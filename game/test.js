
// music

var longPop = new Audio("./longpop.wav");
var onLoad = new Audio("./onload.wav");
var reward = new Audio("./reward.wav");
var wrong = new Audio("./wrong.wav");




let table = document.getElementById('table-box');
let POUWord = document.getElementById('POusedWord')
let PTUWord = document.getElementById('PTusedWord')
let rows = 8;
let col = 8;
var arr = [[], [], [], [], [], [], [], []];
let UsedWord = [];
let powords = [];
let ptwords = []
let keyPressNumber = 2;

let p1score = 0;
let p2score = 0;

let timeLimit
let playerInterval

// window.onload = () => {
//     onLoad.play();
//     onLoad.volume = 0.5;
// }
    





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

table.onkeydown = (e) => {
    clearInterval(playerInterval);
    longPop.play();
    longPop.volume = 0.5;
}


table.onkeyup = (e) => {
    console.log('keyup')
   

    let element = document.getElementById(e.target.id)
    let letter = e.target.value;
    let charCode = letter.charCodeAt(letter[letter.length - 1]);


    if (charCode > 31 && (charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)) {
        wrong.play();
        wrong.volume = 0.5;
        alert("Enter letters only.");
        element.value = element.defaultValue;

    } else {
        // clearTimeout(timeLimit)
        clearInterval(playerInterval);


        if (player1Array.length == 26 || player2Array.length == 26) {
            if (p1score > p2score) {
                
                alert(`🎉🏆🎉Second Player Won 🎉🏆🎉 \n Player 1 : ${p2score}, Player 2 : ${p1score}`)
            }
            else if (p1score == p2score) {
                alert(`🎉🏆🎉Draw 🎉🏆🎉 \n Player 1 : ${p2score}, Player 2 : ${p1score}`)
            }
            else {
                alert(`🎉🏆🎉First Player Won 🎉🏆🎉 \n Player 1 : ${p2score}, Player 2 : ${p1score}`)
            }
            location.reload();
        }

        if (keyPressNumber % 2 == 0) {
            element.style.color = "black";

            if (player1Array.includes(charCode)) {
                wrong.play();
                wrong.volume = 0.5;
                alert("Can't enter same letter");
                element.value = element.defaultValue;

            }
            else {
                player1Array.push(charCode);
                keyPressNumber++;
                element.blur();
                element.disabled = true;
            }
        }
        else {
            element.style.color = "red";
            if (player2Array.includes(charCode)) {
                wrong.play();
                wrong.volume = 0.5;
                alert("Can't enter same letter");
                element.value = element.defaultValue;
            }

            else {
                player2Array.push(charCode);
                keyPressNumber++

                element.blur();
                element.disabled = true;

            }
        }


        // timeLimit = setTimeout(() =>{


        //     if(keyPressNumber%2 == 1){

        //         if (confirm("Second Player's Time Out, Want To Continue?") == true) {
        //             alert("Second player miss the chance \n First Player's Turn")
        //             keyPressNumber++
        //            return;

        //         } 
        //         else{
        //             alert(`Second Player Quit \n🎉🏆🎉First Player Won 🎉🏆🎉 \n Score : ${p2score} `)  
        //             location.reload();

        //         }
        //     }
        //     else{
        //         if (confirm("First Player's Time Out, Want To Continue?") == true) {
        //             alert("First player miss the chance \n Second Player's Turn")
        //             keyPressNumber++
        //             return;

        //         } 
        //         else{
        //             alert(`First Player Quit \n🎉🏆🎉Second Player Won 🎉🏆🎉 \n Score : ${p1score} `)  
        //             location.reload();

        //         }

        //     }

        // }, 5000);

        let playerTime = 31000

        playerInterval = setInterval(playerTimelimit, 1000);


        function playerTimelimit() {
            playerTime -= 1000;
            document.getElementById("rTime").innerHTML = playerTime / 1000;
            
            if (playerTime <= -1) {
                if (keyPressNumber % 2 == 1) {

                    if (confirm("Second Player's Time Out, Want To Continue?") == true) {
                        alert("Second player miss the chance \n First Player's Turn")
                        custom()

                    }
                    else {
                        alert(`Second Player Quit \n🎉🏆🎉First Player Won 🎉🏆🎉 \n Score : ${p2score} `)
                        clearInterval(playerInterval);
                        location.reload();

                    }
                }
                else {
                    if (confirm("First Player's Time Out, Want To Continue?") == true) {
                        alert("First player miss the chance \n Second Player's Turn")
                        custom()

                    }
                    else {
                        alert(`First Player Quit \n🎉🏆🎉Second Player Won 🎉🏆🎉 \n Score : ${p1score} `)
                        clearInterval(playerInterval);
                        location.reload();

                    }

                }
            }
        }
        timeLimit = playerTimelimit
        function custom() {
            keyPressNumber++
            clearInterval(playerInterval);
            console.log(playerTime / 1000)
            playerTime = 10000
            console.log(playerTime / 1000)
            playerInterval = setInterval(playerTimelimit, 1000);

        }




        for (let i = 0; i < arr.length; i++) {
            arr[i] = [];
            for (let j = 0; j < arr.length; j++) {
                arr[i].push(document.getElementById(`${i}${j}`).value.toLowerCase());
            }
        }

        valueOfRowCol(arr, e.target.id);
    }

}




function valueOfRowCol(customArr, id) {

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
    // console.log(RowValues);
    for (let i = 0; i < customArr.length; i++) {
        ColValues.push(customArr[i][col]);
    }
    //  console.log(ColValues);
    splitArray(RowValues);
    splitArray(ColValues);

}

//splite array with '' 
function splitArray(arr) {
    let temp = [];
    let result = []
    for (var i = 0; i < arr.length; i++) {
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

    for (let i = 0; i < result.length; i++) {
        subString(result[i], result[i].length)
        subString([...result[i]].reverse(), [...result[i]].reverse().length)
    }

}

function subString(str, n) {
    var ouputSize = (n * (n - 1)) / 2, c = -1;
    var outputArray = new Array(ouputSize);
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j <= n - 1; j++) {
            outputArray[++c] = new Array(j - i + 1);
            var c2 = -1;
            for (let k = i; k <= j; k++) {
                outputArray[c][++c2] = str[k];
            }
        }
    }
    // console.log(outputArray);
    // 
    for (let i = 0; i < outputArray.length; i++) {
        findWord(outputArray[i]);
    }
}


// // Finding and extracting words
function findWord(letters) {

    word = '';
    let checkAllBlankorNot = letters.every((item) => {
        return item == '';
    })
    if (checkAllBlankorNot) {
        return;
    }
    for (let i = 0; i < letters.length; i++) {
        if (letters[i] != '') {
            word = word + letters[i];

        }

        else {
            word = word + " ";
        }

    }

    if (word.trim().length == 0) {
        word = '';
    }

    let newWord = word.trim();


    var status = "";
    if (UsedWord.includes(newWord)) {
        return
    }
    else {
        try {
            var ftrie = new FrozenTrie(dic.trie, dic.directory, dic.nodeCount);

            if (ftrie.lookup(newWord)) {
                status = '"' + newWord + "' is in the dictionary.";
                UsedWord.push(newWord)
                if (keyPressNumber % 2 == 1) {
                    p2score = p2score + 3;
                    reward.play()
                    reward.volume = 0.5
                    powords.push(newWord);
                    document.getElementById("p1score").innerHTML = p2score;
                } else {
                    ptwords.push(newWord);
                    p1score = p1score + 3;
                    reward.play()
                    reward.volume = 0.5
                    document.getElementById("p2score").innerHTML = p1score;

                }

            } else {
                status = '"' + newWord + "' IS NOT in the dictionary.";
                // console.log(`keyPressNumber ${keyPressNumber}`);
            }
        } catch (e) {
            status = "Error. Have you encoded the dictionary yet?";
        }

    }

    // console.log(status);

    // console.log(`used word ${UsedWord}`);

    POUWord.innerHTML = powords;
    PTUWord.innerHTML = ptwords;


}



function quitFunc() {
    clearInterval(playerInterval)
    if (keyPressNumber % 2 == 1) {
        reward.play();
        reward.volume = 0.5;
        alert(`Second Player Quit \n🎉🏆🎉First Player Won 🎉🏆🎉 \n Score : ${p2score}`)
        location.reload();
    }
    else {
        reward.play();
        reward.volume = 0.5;
        alert(`First Player Quit \n🎉🏆🎉Second Player Won 🎉🏆🎉 \n Score : ${p1score} `)
        location.reload();
    }
}

function exitFunc() {
    clearInterval(playerInterval)
    if (confirm("Both Player Want to Exit?") == true) {
        if (keyPressNumber % 2 == 1 && p2score > p1score) {
           
            alert(`🎉🏆🎉First Player Won 🎉🏆🎉 \n Score : ${p2score}`)
            location.reload();
        }
        else {
            if (p1score == p2score) {

                alert(`🎉🏆🎉Draw 🎉🏆🎉 \n Score : p1 =  ${p2score} p2 = ${p1score}`)
                location.reload();
            }
            else {
               
                alert(`🎉🏆🎉Second Player Won 🎉🏆🎉 \n Score : ${p1score} `)
                location.reload();
            }
        }
        window.location = "../index.html"
    } else {
    
        playerInterval = setInterval(timeLimit, 1000)
    }
      
    

}

































