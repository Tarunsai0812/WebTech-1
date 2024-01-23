document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector(".grid")
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const scoreDisplay = document.getElementById('score')
    const startbtn = document.querySelector('#start-button')
    const width = 10;
    let nextRandom = 0;
    let timerId;
    let time = 1000;
    let score = 0;
    const gameOverOverlay = document.getElementById('game-over-overlay');
    gameOverOverlay.style.display = 'none';
    const restartButton = document.getElementById('restart-button');
    restartButton.addEventListener('click', () => {
        window.location.reload(); 
    });
    const lTetromino = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
      ]
    
    const zTetromino = [
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1],
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1]
    ]
    
    const tTetromino = [
        [1,width,width+1,width+2],
        [1,width+1,width+2,width*2+1],
        [width,width+1,width+2,width*2+1],
        [1,width,width+1,width*2+1]
    ]
    
    const oTetromino = [
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1]
    ]
    
    const iTetromino = [
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3],
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3]
    ]

    const theTetrominos = [lTetromino,zTetromino,tTetromino,oTetromino,iTetromino]

    let currPos = 4
    let currRotation = 0
    let random = Math.floor(Math.random()*theTetrominos.length)
    let curr = theTetrominos[random][currRotation]

    function draw()
    {
        curr.forEach(index => {
            squares[currPos + index].classList.add('tetromino')
        })
    }

    function undraw()
    {
        curr.forEach(index => {
            squares[currPos + index].classList.remove('tetromino')
        })
    }

    function control(e)
    {
        if(e.keyCode === 37)
        {
            moveLeft()
        }
        else if(e.keyCode === 38)
        {
            rotate()
        }
        else if(e.keyCode === 39)
        {
            moveRight()
        }
        else if(e.keyCode === 40)
        {
            moveDown()
        }
    }
    document.addEventListener('keyup',control)

    function freeze() {
        if(curr.some(index => squares[currPos + index + width].classList.contains('taken'))) {
            curr.forEach(index => {
                squares[currPos + index].classList.add('taken');
            });
            random = nextRandom
            nextRandom = Math.floor(Math.random() * theTetrominos.length);
            curr = theTetrominos[random][currRotation];
            currPos = 4;
            draw(); 
            displayShape();
            addScore();
            gameOver();
        }
    }

    function moveDown()
    {
        undraw()
        currPos += width
        draw()
        freeze()
    }
    
    function moveLeft()
    {
        undraw()
        const isLeftEdge = curr.some(index => (currPos + index) % width === 0)
        if(!isLeftEdge) currPos -= 1
        if(curr.forEach(index => squares[currPos + index].classList.contains('taken'))){
            currPos += 1
        }
        draw()
    }

    function moveRight()
    {
        undraw()
        const isLeftEdge = curr.some(index => (currPos + index) % width === width-1)
        if(!isLeftEdge) currPos += 1
        if(curr.forEach(index => squares[currPos + index].classList.contains('taken'))){
            currPos -= 1
        }
        draw()
    }

    function rotate()
    {
        undraw()
        currRotation = (currRotation + 1)%4
        curr = theTetrominos[random][currRotation]
        draw()
    }
    draw()


    const displaySquares = document.querySelectorAll('.mini-grid div')
    const displaywidth = 4
    let displayIndex = 0

    const upNextTetrominos = [
        [1, displaywidth+1, displaywidth*2+1,2],
        [0,displaywidth,displaywidth+1,displaywidth*2+1],
        [1,displaywidth,displaywidth+1,displaywidth+2],
        [0,1,displaywidth,displaywidth+1],
        [1,displaywidth+1,displaywidth*2+1,displaywidth*3+1]
    ]

    function displayShape()
    {
        displaySquares.forEach(square => {
            square.classList.remove('tetromino')
        })
        upNextTetrominos[nextRandom].forEach(index => {
            displaySquares[displayIndex + index].classList.add('tetromino')
        })
    }


    startbtn.addEventListener('click', () => {
        if(timerId)
        {
            clearInterval(timerId)
            timerId = null
        }
        else
        {
            draw()
            timerId = setInterval(moveDown, time)
            nextRandom = Math.floor(Math.random()*theTetrominos.length)
            displayShape()
        }
    })

    function addScore()
    {
        for(let i=0;i<199;i+=width)
        {
            const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

            if(row.every(index => squares[index].classList.contains('taken')))
            {
                score += 10
                if(score%30==0){
                    time -= 100;
                    timerId = setInterval(moveDown,time);
                    const lev = document.getElementById("Level");
                    lev.innerText = parseFloat(lev.innerText,10) + 1;
                }
                console.log(score,time);
                scoreDisplay.innerHTML = score
                row.forEach(index => {
                    squares[index].classList.remove('taken')
                    squares[index].classList.remove('tetromino')
                })
                const squaresRemoved = squares.splice(i,width)
                squares = squaresRemoved.concat(squares)
                squares.forEach(cell => grid.appendChild(cell))
            }
        }
    }

    function gameOver()
    {
        if(curr.some(index => squares[currPos + index].classList.contains('taken')))
        {
            scoreDisplay.innerHTML = "end"
            document.getElementById('final-score').innerText = score;
            gameOverOverlay.style.display = 'block';
            clearInterval(timerId)
        }
    }


})
