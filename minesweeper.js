// Instead of images we will use the emogies 🚩 and 💣

const boardSide = 8

const minesCount = 20

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

function createCell(x, y) {
    const tile = document.createElement("div")
    tile.setAttribute("id",x + ", " + y)
    tile.addEventListener("click", () => clickTile(tile, x, y))
    document.getElementById("board").append(tile)
}

function startGame() {
    document.getElementById("mines-count").innerText = minesCount
    document.getElementById("flag-button").addEventListener("click", setFlag)

    for (let x = 0; x < boardSide; x ++) {
        for (let y = 0; y < boardSide; y ++) {
            createCell(x, y)
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

function clickTile(tile, x, y) {
    const cell = board[x][y]
    if (cell.content == "💣") {
        tile.innerText = cell.content
        setTimeout(() => alert("PERDISTE!"), 100)
    } else if (cell.value == 0) {
        tile.innerText = cell.content
    } else{
        tile.innerText = cell.value
        tile.classList.add("x" + cell.value);
    }
    tile.classList.add("tile-clicked");
    cell.clicked = true
    if (cell.content == "" && cell.value == 0) {
        clickAdjacent(x-1, y-1)
        clickAdjacent(x-1, y)
        clickAdjacent(x-1, y+1)
        clickAdjacent(x, y-1)
        clickAdjacent(x, y+1)
        clickAdjacent(x+1, y-1)
        clickAdjacent(x+1, y)
        clickAdjacent(x+1, y+1)
    }
}

function clickAdjacent(xAdjacent, yAdjacent) {
    if (xAdjacent >= 0 && xAdjacent < boardSide && yAdjacent >= 0 && yAdjacent < boardSide && board[xAdjacent][yAdjacent].clicked == false) {
        const adjacentTile = document.getElementById(xAdjacent + ", " + yAdjacent)
        adjacentTile.classList.add("tile-clicked");
        const cell = board[xAdjacent][yAdjacent]
        cell.clicked = true
        if (cell.value == 0) {
            adjacentTile.innerText = cell.content
        } else {
            adjacentTile.innerText = cell.value
            adjacentTile.classList.add("x" + cell.value);
        }
        if (cell.content == "" && cell.value == 0) {
            clickAdjacent(xAdjacent-1, yAdjacent-1)
            clickAdjacent(xAdjacent-1, yAdjacent)
            clickAdjacent(xAdjacent-1, yAdjacent+1)
            clickAdjacent(xAdjacent, yAdjacent-1)
            clickAdjacent(xAdjacent, yAdjacent+1)
            clickAdjacent(xAdjacent+1, yAdjacent-1)
            clickAdjacent(xAdjacent+1, yAdjacent)
            clickAdjacent(xAdjacent+1, yAdjacent+1)
        }
    }
}

startGame()