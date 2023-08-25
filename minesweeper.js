// Instead of images we will use the emogies 🚩 and 💣

const boardSide = 8

const minesCount = 10

const board = []

for (let row = 0; row < boardSide; row ++){
    const rowArray = []
    for (let cell = 0; cell < boardSide; cell ++){
        rowArray.push({value: 0, content: "", clicked: false})
    }
    board.push(rowArray)
}

let placedMines = 0

while (placedMines < minesCount) {
    const x = Math.floor(Math.random() * 8)
    const y = Math.floor(Math.random() * 8)
    if (board[x][y].content != "💣") {
        board[x][y].content = "💣"
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
        board[xAdjacent][yAdjacent].value ++
    }
}

function createCell(cell) {
    const tile = document.createElement("div")
    tile.addEventListener("click", () => clickTile(tile, cell))
    document.getElementById("board").append(tile)
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

function clickTile(tile, cell) {
    if (cell.content == "💣" || cell.value == 0) {
        tile.innerText = cell.content
    } else {
        tile.innerText = cell.value
        tile.classList.add("x" + cell.value);
    }
    tile.classList.add("tile-clicked");
}

startGame()