var SIZE = 800;
var NODES_PER_LINE = 20;
var SIDE = SIZE / NODES_PER_LINE;
var startX = 0;
var startY = 0;
var endX = 19;
var endY = 19;
var openNodes = [];
var nodes = [];

function setup() {
    createCanvas(SIZE, SIZE);
    background(0);

    for(let i = 0; i < NODES_PER_LINE; i++) {
        nodes[i] = new Array(NODES_PER_LINE);
        for (let j = 0; j < NODES_PER_LINE; j++) {
            nodes[i][j] = 0;
        }
    }

    nodes[startX][startY] = -1;
    nodes[endX][endY] = 1;
}

function draw() {
    if (mouseIsPressed) {
        let x = Math.floor(mouseX / SIDE);
        let y = Math.floor(mouseY / SIDE);

        if (x >= 0 && x < NODES_PER_LINE && y >= 0 && y < NODES_PER_LINE) {
            nodes[x][y] = -3;
        }
    }

    board();

    if (openNodes.length > 0) {
        let node = openNodes[0];

        for (let i = 0; i < openNodes.length; i++) {
            if (openNodes[i].f < node.f || (openNodes[i].f == node.f && openNodes[i].g > node.g)) {
                node = openNodes[i];
            }
        }

        openNodes.splice(openNodes.indexOf(node), 1);

        if (node.x == endX && node.y == endY) {
            while (node != null) {
                nodes[node.x][node.y] = 2;
                node = node.parent;
            }
            noLoop();
            board();
            
        } else {
            let newNodes = node.expand(nodes, endX, endY);
            
            for (let i = 0; i < newNodes.length; i++) {
                nodes[newNodes[i].x][newNodes[i].y] = -2;
                openNodes.push(newNodes[i]);
            }
        }
    }
}


function board() {
    for (let x = 0; x < NODES_PER_LINE; x++) {
        for (let y = 0; y < NODES_PER_LINE; y++) {
            if (nodes[x][y] == -2) {
                fill(246, 255, 0);
            } else if (nodes[x][y] == 2) {
                fill(40, 252, 3);
            } else if (nodes[x][y] == -1) {
                fill(255, 0, 0);
            } else if (nodes[x][y] == 1) {
                fill(0, 0, 255);
            } else if (nodes[x][y] == -3) {
                fill(0);
            } else {
                fill(255);
            }

            square(x * SIDE, y * SIDE, SIDE);
        }
    }
}

function start() {
    let start = new Node(startX, startY, null);
    let h = start.calcHeuristic(endX, endY);
    start.updateF(h);

    openNodes.push(start);
}

function keyPressed() {
    start();
}