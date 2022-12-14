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

    // for each文
    for(let i = 0;i < table.length;i++){
        if(table[i] === "O"){
            indexArr_O.append(i);
            count++;
        }
        else if(table[i] === "X"){
            indexArr_X.append(i);
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
    for(element of winnerTable){
      if(playerTable.filter(value => element.includes(value)).length >= 3){
        return true;
      }
    }
    return false;
}