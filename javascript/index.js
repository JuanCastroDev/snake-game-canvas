/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const snake = new Snake(20, 20, 20);

let apple = new Apple(snake);

window.onload = () => {
  gameLoop();
};

const gameLoop = () => {
  setInterval(show, 1000 / 10);
};

const show = () => {
  update();
  draw();
};

const update = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  snake.move();

  eatApple();
  checkHitWall();
};

const checkHitWall = () => {
  let headTail = snake.tail[snake.tail.length - 1];

  if (headTail.x == -snake.size) {
    headTail.x = canvas.width - snake.size;
  } else if (headTail.x == canvas.width) {
    headTail.x = 0;
  } else if (headTail.y == -snake.size) {
    headTail.y = canvas.height - snake.size;
  } else if (headTail.y == canvas.height) {
    headTail.y = 0;
  }
};

const eatApple = () => {
  if (
    snake.tail[snake.tail.length - 1].x == apple.x &&
    snake.tail[snake.tail.length - 1].y == apple.y
  ) {
    snake.tail[snake.tail.length] = { x: apple.x, y: apple.y };
    apple = new Apple(snake);
  }
};

const draw = () => {
  createRect(0, 0, canvas.width, canvas.height, "#53776D");
  createRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < snake.tail.length; i++) {
    createRect(
      snake.tail[i].x + 2.5,
      snake.tail[i].y + 2.5,
      snake.size - 5,
      snake.size - 5,
      "#000000"
    );
  }

  createRect(apple.x, apple.y, 20, 20, apple.color);

  context.font = "25px Common Pixel";
  context.fillStyle = "#000000";
  context.fillText("SCORE: " + snake.tail.length, canvas.width - 390, 25);
};

const createRect = (x, y, width, height, color) => {
  context.fillStyle = color;
  context.fillRect(x, y, width, height);
};

window.addEventListener("keydown", (event) => {
  setTimeout(() => {
    if (event.keyCode == 37 && snake.rotateX != 1) {
      snake.rotateX = -1;
      snake.rotateY = 0;
    } else if (event.keyCode == 38 && snake.rotateY != 1) {
      snake.rotateX = 0;
      snake.rotateY = -1;
    } else if (event.keyCode == 39 && snake.rotateX != -1) {
      snake.rotateX = 1;
      snake.rotateY = 0;
    } else if (event.keyCode == 40 && snake.rotateY != -1) {
      snake.rotateX = 0;
      snake.rotateY = 1;
    }
  }, 25);
});