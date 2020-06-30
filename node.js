class Node {


    constructor(x, y, parent) {
        this.x = x;
        this.y = y;
        this.parent = parent;
        this.g = parent ? parent.g + 1 : 0;
        this.f = this.g;
    }

    calcHeuristic(endX, endY) {
        let h = Math.sqrt(Math.abs(this.x - endX) ** 2 + Math.abs(this.y - endY) ** 2);
        return Math.floor(h);
    }

    updateF(h) {
        this.f = this.g + h;
    }

    expand(nodes, endX, endY) {
        let newNodes = [];
        for (let i = -1; i < 2; i += 2) {
            let newX = this.x + i;
            let newY = this.y + i;

            if (newX > 0 && newX < NUMBER_OF_NODES && nodes[newX][this.y] != 1) {
                let newNode = new Node(newX, this.y, this);
                let h = newNode.calcHeuristic(endX, endY);
                newNode.updateF(h);
                newNodes.push(newNode);
            }

            if (newY > 0 && newY < NUMBER_OF_NODES && nodes[this.x][newY] != 1) {
                let newNode = new Node(this.x, newY, this);
                let h = newNode.calcHeuristic(endX, endY);
                newNode.updateF(h);
                newNodes.push(newNode);
            }

        }
        return newNodes;
    }
}