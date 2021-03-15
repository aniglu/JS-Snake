//przypisanie elementu zawierającego canvas do zmiennej o nazwie snake
let snake = document.getElementById("snakeCanvas");
// przypisanie kontekstu do stałej ctx, funkcja getContext zwraca kontekst lub null jeśli  //identyfikator kontekstu nie jest wspierany
// “2d” tworzy obiekt CanvasRenderingContext2D reprezentujący dwuwymiarowy kontekst //renderowania.
const ctx = snake.getContext("2d");

//tworzenie obiektów obrazów o zadanym rozmiarze (width, height)
let peach = new Image(30, 30);
let rasp = new Image(30, 30);
let pizza = new Image(30, 30);
let burger = new Image(30, 30);
let bomb = new Image(10, 10);
let heart = new Image(10, 10);

//ustawienie ścieżek do obrazów
peach.src = "./picture/peach.png";
rasp.src = "./picture/rasp.png";
pizza.src = "./picture/pizza.png";
burger.src = "./picture/bur.png";
bomb.src = "./picture/bomb.png";
heart.src = "./picture/heart.png";
const arrayOfImage = [peach, burger, pizza, rasp];
const arrayOfItems = [bomb, heart];

//początkowa pozycja węża na planszy 
let x = 270;
let y = 270;

//ustawienie ostatniej pozycji węża, na początku jest ona równa początkowej pozycji
let lastX = 270;
let lastY = 270;

//ustawienie początkowego kierunku węża
let position = "ArrowRight";
let interval;
let score = 0;
let lives = 0;
let peachX;
let peachY;

// przypisanie do zmiennej snakeArray typu tablicowego, obiektu zawierającego pozycje x i y // węża, tablica będzie zwiększała swój rozmiar wraz ze wzrostem węża 
// jest to miejsce przechowywania wszystkich współrzędnych węża 
let snakeArray = [{x,y}];


//sprawdzanie warunku zakończenia gry, jeżeli ilość życia jest mniejsza od 0 wyłączany jest 
//interval
function end() {
  if (
    lives < 0 
  ) {
    window.clearInterval(interval);
    ctx.fillStyle = "red";
    ctx.fillRect(270, 270, 30, 30);
    document.getElementById("gameStatus").style.display = "inline";
  }
}

//funkcja czyszcząca całego węża, iteruje po współrzędnych i czyści 
function clearSnake(){
  snakeArray.forEach(element =>{
    ctx.clearRect(element.x, element.y, 30, 30);
  })
}

//usuwanie życia jeżeli współrzędne węża zgadzają się z współrzędnymi ścian oraz //rysowanie go na środku
  function delLives() {
    const canvasHeight = 600;
    const canvasWidth = 600;
    console.log(snakeArray[0].x , snakeArray[0].y)
    if (snakeArray[0].x >= canvasHeight ||
      snakeArray[0].x < 0 ||
      snakeArray[0].y >= canvasWidth ||
      snakeArray[0].y < 0) {
      lives -= 1;
      document.getElementById("lives").innerHTML = lives;
      clearSnake();
      initSnakeState();
      moveSnake();
    }
  }

//funkcja dodająca bombe  jeżeli została zjedzona bomba zmniejszenie ilości żyć
  function bombTheLives() {
    if (
      x >= bombX - 10 &&
      x <= bombX + 10 &&
      y <= bombY + 10 &&
      y >= bombY - 10
    ) {
      lives -= 1;
      document.getElementById("lives").innerHTML = lives;
      clearSnake();
        initSnakeState();
        moveSnake();
      addBomb();
    }
  }
//to inicjalizacja stanu węża
  function initSnakeState(){
    x= 270;
    y= 270;
    position = "ArrowRight";
    snakeArray = [{x,y}]
  }  

//funkcja dodająca “życie”  jeżeli zostało zjedzone serduszko oraz wywołuje funkcję rysującą 
//nowe serduszko
  function addLives() {
    if (
      x >= heartX - 10 &&
      x <= heartX + 10 &&
      y <= heartY + 10 &&
      y >= heartY - 10
    ) {
      lives += 1;
      document.getElementById("lives").innerHTML = lives;
      addHeart();
    }
  }

//funkcja dodająca punkty jeżeli owoc został zjedzony oraz wywołuje funkcję rysującą nowy owoc
  function addScore() {
    if (
      x >= peachX - 10 &&
      x <= peachX + 10 &&
      y <= peachY + 10 &&
      y >= peachY - 10
    ) {
      score += 10;
      document.getElementById("user-score").innerHTML = score;
      addPeach();
    }
  }


//funkcja dodająca nową pozycję węża do listy zawierającej wszystkie współrzędne węża
  function drawTail(newPosition){
//tworzenie nowej tablicy wraz z nową pozycją dodaną na jej początek
    snakeArray = [newPosition].concat(snakeArray);
// usunięcie ostatniego elementu z tablicy oraz zapisanie współrzędnych do elementToClear
     let elementToClear =snakeArray.pop();
//przerysowanie węża w nowej pozycji 
    snakeArray.forEach(element =>{
      ctx.fillRect(element.x, element.y, 30, 30);
      ctx.strokeRect(element.x, element.y, 30, 30);
    })
//wyczyszczenie ostatniego elementu
    ctx.clearRect(elementToClear.x, elementToClear.y, 30, 30);
  }
  

  let ateFood = 0;
//funkcja sprawdzająca czy został zjedzony owoc oraz dodaje do snakeArray jeden 
//dodatkowy element jeżeli warunek jest spełniony 
  function addTail() {
    if ( x >= peachX - 10 &&    
      x <= peachX + 10 &&    
      y <= peachY + 10 &&    
      y >= peachY - 10){
      ateFood += 1;      
      let newTail = {
        x,
        y
    }
      snakeArray = [newTail].concat(snakeArray);
    }  
  }


//losowanie pozycji jedzenia oraz obrazka
  function addPeach() {
    max = 20;
    min = 0;
    let indexOfImg = Math.floor(Math.random() * 4);
    peachX = (Math.floor(Math.random() * (max - min)) + min) * 30; //Math.floor(Math.random() * (max - min + 1) + min);
    peachY = (Math.floor(Math.random() * (max - min)) + min) * 30; // Math.floor(Math.random() * (max - min + 1) + min);
  
    if (peachX % 30 == 0 && peachY % 30 == 0) {
      peach.onload = function () {
        if (indexOfImg === 0) ctx.drawImage(peach, peachX, peachY, 30, 30);
      };
      burger.onload = function () {
        if (indexOfImg === 1) ctx.drawImage(burger, peachX, peachY, 30, 30);
      };
      pizza.onload = function () {
        if (indexOfImg === 2) ctx.drawImage(pizza, peachX, peachY, 30, 30);
      };
      rasp.onload = function () {
        if (indexOfImg === 3) ctx.drawImage(rasp, peachX, peachY, 30, 30);
      };
      ctx.drawImage(arrayOfImage[indexOfImg], peachX, peachY, 30, 30);
    }
  }
  addPeach();
  
//losowanie pozycji bomby i rysowanie jej na planszy
  function addBomb() {
    max = 20;
    min = 0;
    bombX = (Math.floor(Math.random() * (max - min)) + min) * 30; //Math.floor(Math.random() * (max - min + 1) + min);
    bombY = (Math.floor(Math.random() * (max - min)) + min) * 30; // Math.floor(Math.random() * (max - min + 1) + min);
   
      bomb.onload = function () {
        ctx.drawImage(bomb, bombX, bombY, 30, 30);
      };
    ctx.drawImage(bomb, bombX, bombY, 30, 30);
  }
  addBomb();
  
//losowanie pozycji “życia” i dodawanie na plansze
  function addHeart() {
    max = 20;
    min = 0;
    heartX = (Math.floor(Math.random() * (max - min)) + min) * 30; //Math.floor(Math.random() * (max - min + 1) + min);
    heartY = (Math.floor(Math.random() * (max - min)) + min) * 30; // Math.floor(Math.random() * (max - min + 1) + min);
  
  
      heart.onload = function () {
        ctx.drawImage(heart, heartX, heartY, 30, 30);
      };
      ctx.drawImage(heart, heartX, heartY, 30, 30);
    }
    addHeart();

  
function moveSnake() {
  lastX = x;
  lastY = y;
  switch (position) {
    case "ArrowUp":
      y = y - 30;
      break;
    case "ArrowLeft":
      x = x - 30;
      break;
    case "ArrowDown":
      y = y + 30;
      break;
    case "ArrowRight":
      x = x + 30;
      break;
  }
  drawTail({x, y})
  addTail();
  addScore(); 
  addLives();
  bombTheLives(); 
  delLives();
  end();
}  

  function setIntTime() {
    if(!interval)
        interval = setInterval(moveSnake, 200);
    }
    
//dodanie nasłuchowania na klawiaturę i ustawienie zmiennej globalnej position, która mówi o kierunku przesunięcia węża
  function turn() {
    window.addEventListener("keydown", (e) => {
      position = e.key;
     });
    }
    
//funkcja odpowiadająca za wygląd węża
  function drawSnake() {
    ctx.fillStyle = "indigo";
    ctx.strokeStyle = "Iris";
  }
  
// ustawianie planszy do stanu początkowego  
  function reInitBoard(){    
    ctx.clearRect(270, 270, 30, 30);
    window.clearInterval(interval);
    interval = undefined;
    document.getElementById("lives").innerHTML = lives;
    document.getElementById("gameStatus").style.display = "none";
    initBoard();
  }

// funkcja ustawiająca początkowy stan planszy i wężą
    function initBoard(){
    clearSnake();
    x = 270;
    y = 270;
    position = "ArrowRight";
    score = 0;
    lives = 0;
    snakeArray = [{x,y}]
    drawSnake();
    setIntTime();
    turn();
  }

