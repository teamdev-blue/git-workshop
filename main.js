/*
* 関数名 　　　　   ： winnerTicTacToe
* 内容   　　　　   : Tic Tac Toeの勝敗を決める
* 引数(1次元配列)   : table
* 戻り値(str型)    : "X's Wins!!!" or "O's Wins!!!" or "Draw!" or "game continue"
*/

function winnerTicTacToe(table){
    let indexArr_O = [];
    let indexArr_X = [];
    let count = 0;

    

    // for each文
    for(let i = 0;i < table.length;i++){
        if(table[i] === "O"){
            indexArr_O.push(i);
            count++;
        }
        else if(table[i] === "X"){
            indexArr_X.push(i);
            count++;
        }
    }

    if(isWin(indexArr_O)) return "O's Wins!!!";
    else if(isWin(indexArr_X)) return "X's Wins!!!";
    else if(count === 9) return "Draw!";
    else return "game continue";
}

/*
* 関数名 　　　　       ： isWin
* 内容   　　　　       : 勝者かどうか判定する
* 引数(1次元配列)       : playerTable
* 戻り値(boolean型)    : True or False
*/
function isWin(playerTable){
    const winnerTable = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    for(element of winnerTable){
      if(playerTable.filter(value => element.includes(value)).length >= 3){
        return true;
      }
    }
    return false;
}


/*
* 関数名 　　　　       ： init
* 内容   　　　　       : gameの初期設定
* 引数(void)           : 
* 戻り値(undefined)     :
*/

function initGameBoard(){
    document.querySelector(".popup").classList.add("hide");
    game.init();
    const gameboard = document.querySelectorAll(".button-option");
    gameboard.forEach((cell) => {
        cell.classList.add("unset");
        cell.innerHTML = game.currentPlayer;
    });

}

/*
* 関数名 　　　　       ： handleClickStart
* 内容   　　　　       : イベントハンドラ
* 引数                 : e,index
* 戻り値(void)     :
*/
function handleClickStart(e){
    /* X or O を入れる */
    game.setGameBoard(this.index,game.currentPlayer);//押したときのplayer
    console.log(game.gameBoard);
    if(e.target.classList.contains("unset"))game.togglePlayer();
    /* clickしたbutton_classのunsetを削除する */
    e.target.classList.remove("unset");

    /* 勝敗がついたかを確認する */
    const clickedState = winnerTicTacToe(game.gameBoard);
    console.log(clickedState);
    if(clickedState === "game continue"){
        /* プレイヤーの変更 */

        const gameboard = document.querySelectorAll(".button-option");
        /* classがunsetのものをtogglePlayerの値に変える */
        gameboard.forEach((cell) => {
            if(cell.classList.contains("unset")){
            cell.innerHTML = game.currentPlayer;
            }
        })
    }
    else{
        /* ゲーム終了画面の表示する関数に移動する */
        let gameSetElement = document.querySelector(".popup.hide");
        gameSetElement.classList.remove("hide");
    }
}

class Game{
    #currentPlayer;
    #gameBoard;
    constructor(){
        this.init();
    }
    togglePlayer(){
        this.#currentPlayer = this.#currentPlayer === "O" ? "X" : "O";
    }

    get currentPlayer() {
        return this.#currentPlayer;
    }

    get gameBoard(){
        return this.#gameBoard;
    }

    setGameBoard(index,sign){
        if(index > 8 || index < 0) throw new Error("index out of range");
        if(sign !== "O" && sign !== "X") throw new Error("bad value");
        this.#gameBoard[index] = sign
    }
    init(){
        this.#currentPlayer = "X";
        this.#gameBoard = [null,null,null,null,null,null,null,null,null];
    }
}

function init(){
    const gameboard = document.querySelectorAll(".button-option");
    gameboard.forEach((cell,index) => {
        cell.addEventListener("click",{index : index, handleEvent: handleClickStart});
    });
    document.getElementById("restart").addEventListener("click",initGameBoard);
    document.getElementById("new-game").addEventListener("click",initGameBoard);
    initGameBoard();
}

const game = new Game();
init();