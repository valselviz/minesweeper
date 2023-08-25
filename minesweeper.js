// Instead of images we will use the emogies 🚩 and 💣

const boardSide = 8

const minesCount = 10

const board = []

for (let row = 0; row < boardSide; row ++){
    const rowArray = []
    for (let cell = 0; cell < boardSide; cell ++){
        rowArray.push(0)
    }
    board.push(rowArray)
}

let placedMines = 0

while (placedMines < minesCount) {
    const x = Math.floor(Math.random() * 8)
    const y = Math.floor(Math.random() * 8)
    if (board[x][y] != "💣") {
        board[x][y] = "💣"
        checkAdjacent(x-1, y-1)
        checkAdjacent(x-1, y)
        checkAdjacent(x-1, y+1)
        checkAdjacent(x, y-1)
        checkAdjacent(x, y+1)
        checkAdjacent(x+1, y-1)
        checkAdjacent(x+1, y)
        checkAdjacent(x+1, y+1)
        placedMines ++
    }
}

function checkAdjacent(xAdjacent, yAdjacent) {
    if (xAdjacent >= 0 && xAdjacent < boardSide && yAdjacent >= 0 && yAdjacent < boardSide && board[xAdjacent][yAdjacent] != "💣") {
        board[xAdjacent][yAdjacent] ++
    }
}

function createCell(content) {
    console.log(content)
    const tile = document.createElement("div")
    tile.addEventListener("click", () => clickTile(tile, content))
    document.getElementById("board").append(tile)

    //tile.innerText = content
}

function startGame() {
    document.getElementById("mines-count").innerText = minesCount
    document.getElementById("flag-button").addEventListener("click", setFlag)

    for (let row of board) {
        for (let cell of row) {
            createCell(cell)
        }
    }

    /*
    const tile = document.createElement("div")
    tile.addEventListener("click", clickTile)
    document.getElementById("board").append(tile)

    tile.innerText = 4
    tile.classList.add("x" + 4)*/


}

function setFlag() {
    const flagButton = this
    console.log('flag button has been clicked:')
    console.log(flagButton)
}

function clickTile(tile, content) {
    tile.innerText = content
    console.log('this tile has been clicked:')
    console.log(tile)
}

startGame()