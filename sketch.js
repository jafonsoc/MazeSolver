var SIZE = 600;
var NUMBER_OF_NODES = 30;
var SIDE = SIZE / NUMBER_OF_NODES;
var startX = 0;
var startY = 0;
var endX = 29;
var endY = 29;
var openNodes = [];
var nodes = [];

function setup() {
    createCanvas(SIZE, SIZE);
    background(0);

    for(var i = 0; i < NUMBER_OF_NODES; i++) {
        nodes[i] = new Array(NUMBER_OF_NODES);
    }

    let start = new Node(startX, startY, null);
    nodes[startX][startY] = 1;
    let h = start.calcHeuristic(endX, endY);
    start.updateF(h);

    openNodes.push(start);
}

function draw() {
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
                console.log(node);
                nodes[node.x][node.y] = 2;
                node = node.parent;
            }
            noLoop();
            board();
            
        } else {
            let newNodes = node.expand(nodes, endX, endY);
            
            for (let i = 0; i < newNodes.length; i++) {
                nodes[newNodes[i].x][newNodes[i].y] = 1;
                openNodes.push(newNodes[i]);
            }
        }
    }
}


function board() {
    for (let x = 0; x < NUMBER_OF_NODES; x++) {
        for (let y = 0; y < NUMBER_OF_NODES; y++) {
            if (nodes[x][y] == 1) {
                fill(246, 255, 0);
            } else if (nodes[x][y] == 2) {
                fill(40, 252, 3);
            } else {
                fill(255);
            }

            square(x * SIDE, y * SIDE, SIDE);
        }
    }
}