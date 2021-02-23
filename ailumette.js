const chalk = require("chalk");
const prompt = require('prompt-sync')()

function init() {
    console.log(chalk.blue("\n--------- WELCOME TO AILUMETTE GAME ---------\n"))
    console.log("Each player can take one or more matches on the same line.\n")
    console.log("The player who loses is the one who takes the last match.\n")
    console.log(chalk.blue("---------------------------------------------\n"))
  }
init();

// To start a game
let start = prompt('Do you want to start a game? (yes/no)')
if(start != 'yes') {
    console.log('Ciao, see you soon...')
    process.exit(0)
}

// Matches numbers per line
const game = [   
    1,
    3, 
    5, 
    7 
]

function board() {
    let line1 = "*********" 
    let line2 = "*   |   *"
    let line3 = "*  |||  *"
    let line4 = "* ||||| *"
    let line5 = "*|||||||*"
    let line6 = "*********"

    if(game[0]!= 1) {
        line2 = line2.replace("|", " ")
    } 
    if(game[1]!= 3) {
        for (let i = 0; i < (3 - game[1]); i++) {
            line3 = line3.replace("|", " ")
        }
    }
    if(game[2]!= 5) {
        for (let i = 0; i < (5 - game[2]); i++) {
            line4 = line4.replace("|", " ")
        }
    }
    if(game[3]!= 7) {
        for (let i = 0; i < (7 - game[3]); i++) {
            line5 = line5.replace("|", " ")
        }
    }

    const board = line1 + "\n" + line2 + "\n" + line3 + "\n" + line4 + "\n" + line5 + "\n" + line6 
    return board
}

function playGame(choice){

    if(choice == "yes") {

        console.log("Your turn:")

        let line = prompt('Line: ')
        let selectableLine = [1, 2, 3, 4]

        while(!selectableLine.includes(parseInt(line)) || (game[line - 1] < 1)){
            let line = prompt('Error: you have to choose 1, 2, 3 or 4 \nLine: ')
        }
        let matches = prompt('Matches: ')

        // -- ERROR(S) MANAGEMENT --

        // Error: invalid input (positive number expected)
        while((matches < 1)){
            let matches = prompt('Error: invalid input (positive number expected) \nMatches: ')
        }
        // Error: not enough matches on this line
        while((matches > game[line - 1])) {
            let matches = prompt('Error: not enough matches on this line \nMatches: ')
        }

        game[line - 1] = game[line - 1] - matches
        console.log("Player removed " + matches + " match(es) from line " + line)
    
    } else {
        console.log("AI’s turn...")

        let line = Math.floor(Math.random() * 4) + 1
        while(game[line - 1] < 1) {
            let line = Math.floor(Math.random() * 4) + 1
        }

        let matches = Math.floor(Math.random() * game[line - 1]) + 1

        game[line - 1] = game[line - 1] - matches

        console.log("AI removed " + matches + " match(es) from line " + line)
    }
}
console.log(board())

while((game[0]!= 0) || (game[1]!= 0) || (game[2]!= 0) || (game[3]!= 0)){
    playGame(start)
    console.log(board())
        if(start=="yes") {
            start="no"
        } else {
            start="yes"
        }
}

if(start == "yes") {
    console.log(chalk.green("Good game, you win!"))
    process.exit(0)
} else {
    console.log(chalk.red("Ouch, you loose...😭"))
    process.exit(0)
}

