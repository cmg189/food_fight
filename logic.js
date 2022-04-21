document.addEventListener('DOMContentLoaded', () => {
  const userGrid = document.querySelector('.grid-user')
  var computerGrid
  const userSquares = []
  const computerSquares = []
  const width = 10
  const readyButton = document.querySelector('#ready')
  const reposition = document.querySelector('#reposition')
  const rightCon = document.querySelector('.right-container')
  const centerCon = document.querySelector('.vertical-center')


	const hide = document.querySelector('#hide')
  var turn
	var instruction = document.querySelector('h3')

	//var body = document.querySelector('.container')
	var bot = document.querySelector('#bot')
	var you = document.querySelector('#you')


	var userScore = 0
  var botScore = 0
  var shotFired


  const foodArray = [
    {
      name: 'bread',
      dimension: 1,
      myLength: 3,
      directions: [
        [0, 1, 2], // horizontal
        [0, width, width*2] // vertical
      ]
    },
    {
      name: 'pocky',
      dimension: 1,
      myLength: 3,
      directions: [
        [0, 1, 2], // horizontal
        [0, width, width*2] // vertical
      ]
    },
    {
      name: 'bento',
      dimension: 2,
      myLength: 3,
      directions: [
        [0, 1, 2, width, width+1, width+2], // horizontal
        [0, 1, width, width+1, width*2, width*2+1] // vertical
      ]
    },
    {
      name: 'donut',
      dimension: 2,
      myLength: 2,
      directions: [
        [0, 1, width, width+1], // horizontal
        [0, 1, width, width+1] // vertical
      ]
    },
    {
      name: 'pizza',
      dimension: 3,
      myLength: 3,
      directions: [
        [0, 1, 2, width, width+1, width+2, width*2, width*2 + 1, width*2 + 2], // horizontal
        [0, 1, 2, width, width+1, width+2, width*2, width*2 + 1, width*2 + 2] // vertical
      ]
    }
  ]

  function createBoard(grid, squares) { // grid: userGrid or computerGrid; squares is an empty array
    for (let i = 0; i < width*width; i++) {
      const square = document.createElement('div')
      square.classList.add('square')
      square.dataset.id = i
      grid.appendChild(square)
      squares.push(square)
    }
  }

  createBoard(userGrid, userSquares)

  function generate(food) { // User's food
    let randomDirection = Math.floor(Math.random() * food.directions.length) // 0 or 1
    let randomStart
    // console.log(randomDirection)
    let current = food.directions[randomDirection] // array containing directions
    if (randomDirection === 0) direction = 1 // horizontal
    if (randomDirection === 1) direction = 10 // vertical
    if (food.dimension === 2)
    {
      if (direction === 1)
      {
        randomStart = Math.abs(Math.floor(Math.random() * userSquares.length - (food.myLength * direction + width)))
      }
      else
      {
        randomStart = Math.abs(Math.floor(Math.random() * userSquares.length - (food.myLength * direction + 1)))
      }
    }
    else if (food.dimension === 3)
    {
      if (direction === 1)
      {
        randomStart = Math.abs(Math.floor(Math.random() * userSquares.length - (food.myLength * direction + 2*width)))
      }
      else
      {
        randomStart = Math.abs(Math.floor(Math.random() * userSquares.length - (food.myLength * direction + 2)))
      }
    }
    else {
      randomStart = Math.abs(Math.floor(Math.random() * userSquares.length - (food.myLength * direction)))
    }

    const isTaken = current.some(index => userSquares[randomStart + index].classList.contains('taken'))
    const isAtRightEdge = current.some(index => (randomStart + index) % width === width - 1)
    const isAtLeftEdge = current.some(index => (randomStart + index) % width === 0)

    if (!isTaken && !isAtRightEdge && !isAtLeftEdge)
    {
      current.forEach(index => userSquares[randomStart + index].classList.add('taken', food.name))
      current.forEach(index => userSquares[randomStart + index].classList.remove('square'))

      if (food.name === "bread" && direction === 10)
      {
        userSquares[randomStart].classList.add('bread-vertical', 'square')
      }
      if (food.name === "bread" && direction === 1)
      {
        userSquares[randomStart].classList.add('bread-horizontal', 'square')
      }

      if (food.name === "pocky" && direction === 10)
      {
        userSquares[randomStart].classList.add('pocky-vertical', 'square')
      }
      if (food.name === "pocky" && direction === 1)
      {
        userSquares[randomStart].classList.add('pocky-horizontal', 'square')
      }

      if (food.name === "bento" && direction === 10)
      {
        userSquares[randomStart].classList.add('bento-vertical', 'square')
      }
      if (food.name === "bento" && direction === 1)
      {
        userSquares[randomStart].classList.add('bento-horizontal', 'square')
      }

      if (food.name === "donut" && direction === 10)
      {
        userSquares[randomStart].classList.add('donut-vertical', 'square')
      }
      if (food.name === "donut" && direction === 1)
      {
        userSquares[randomStart].classList.add('donut-horizontal', 'square')
      }

      if (food.name === "pizza" && direction === 10)
      {
        userSquares[randomStart].classList.add('pizza-vertical', 'square')
      }
      if (food.name === "pizza" && direction === 1)
      {
        userSquares[randomStart].classList.add('pizza-horizontal', 'square')
      }
    }

    else
    {
      generate(food)
    }
  }

  //const bread = document.createElement('div')
  //bread.setAttribute("class", "bread")
  //bread.setAttribute("draggable", "true")

  generate(foodArray[0]) // generate bread on the board
  generate(foodArray[1])
  generate(foodArray[2])
  generate(foodArray[3])
  generate(foodArray[4])

  readyButton.addEventListener('click', () => {
    userGrid.remove()
    rightCon.append(userGrid)
    userGrid.style.transform = 'scale(0.7)'
    readyButton.style.display = 'none'
    reposition.style.display = 'none'
    computerGrid = document.createElement("div")
    computerGrid.classList.add('battleship-grid', 'grid-computer')
    centerCon.insertBefore(computerGrid, readyButton)
    createBoard(computerGrid, computerSquares)
    generateEnemy(foodArray[0]) // generate bread on the board
    generateEnemy(foodArray[1])
    generateEnemy(foodArray[2])
    generateEnemy(foodArray[3])
    generateEnemy(foodArray[4])


    hide.remove() // remove the "HIDE YOUR FOOD" text
    //turn = document.createElement("b")
    //turn.innerText = "YOUR TURN"
    //instruction.append(turn)

		// display images for turn status
		bot.style.opacity = "1"
		you.style.opacity = "1"

		// Here are the methods to change the images according to whose turn it is
		//
		// place these lines when its your turn
		//document.getElementById('bot_img').src="images/bot.png"
		//document.getElementById('you_img').src="images/your_turn.png"
		//
		// place theses lines when its computers turn
		//document.getElementById('bot_img').src="images/bot_turn.png"
		//document.getElementById('you_img').src="images/you.png"




    gameLogic()
  })

  function generateEnemy(food) { // Computer's food
    let randomDirection = Math.floor(Math.random() * food.directions.length) // 0 or 1
    let randomStart
    // console.log(randomDirection)
    let current = food.directions[randomDirection] // array containing directions
    if (randomDirection === 0) direction = 1 // horizontal
    if (randomDirection === 1) direction = 10 // vertical
    if (food.dimension === 2)
    {
      if (direction === 1)
      {
        randomStart = Math.abs(Math.floor(Math.random() * computerSquares.length - (food.myLength * direction + width)))
      }
      else
      {
        randomStart = Math.abs(Math.floor(Math.random() * computerSquares.length - (food.myLength * direction + 1)))
      }
    }
    else if (food.dimension === 3)
    {
      if (direction === 1)
      {
        randomStart = Math.abs(Math.floor(Math.random() * computerSquares.length - (food.myLength * direction + 2*width)))
      }
      else
      {
        randomStart = Math.abs(Math.floor(Math.random() * computerSquares.length - (food.myLength * direction + 2)))
      }
    }
    else {
      randomStart = Math.abs(Math.floor(Math.random() * computerSquares.length - (food.myLength * direction)))
    }

    const isTaken = current.some(index => computerSquares[randomStart + index].classList.contains('taken'))
    const isAtRightEdge = current.some(index => (randomStart + index) % width === width - 1)
    const isAtLeftEdge = current.some(index => (randomStart + index) % width === 0)

    if (!isTaken && !isAtRightEdge && !isAtLeftEdge)
    {
      current.forEach(index => computerSquares[randomStart + index].classList.add('taken', food.name))
    }
    else
    {
      generateEnemy(food)
    }
  }

  function gameLogic()
  {
    // Loop for the game until someone score 25
    computerSquares.forEach(cell => cell.addEventListener('click', () => {
          shotFired = cell.dataset.id
          if (cell.classList.contains('taken'))
          {
            cell.classList.add('hit')
          }
          else {
            cell.classList.add('miss')
          }
      }))
  }

  // Get the modal
  var modal = document.getElementById("myModal");

  // Get the button that opens the modal
  var winBtn = document.getElementById("winBtn");
  var loseBtn = document.getElementById("loseBtn");

  var message = document.getElementById("message");
  var box = document.getElementById("modal-box");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks the button, open the modal
  winBtn.onclick = function() {
    modal.style.display = "block";
    message.innerText = "YOU WON";
    box.classList.add('winning');
  }

  loseBtn.onclick = function() {
    modal.style.display = "block";
    message.innerText = "YOU LOST";
    box.classList.add('losing');
  }

})
