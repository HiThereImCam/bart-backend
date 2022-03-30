class Node {
  constructor(value) {
    this.value = value;
    this.adjacents = [];
  }

  addAdjacent(adjacentNode) {
    let keys = this.adjacents.map((nodeObj) => nodeObj.node.value);
    if (!keys.includes(adjacentNode.value)) {
      this.adjacents.push({ node: adjacentNode });
    }
  }
}

export default Node;
