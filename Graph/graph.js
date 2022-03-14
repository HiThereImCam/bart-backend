/**
 * Undirected Graph
 */

import Node from "./node.js";

class Graph {
  constructor() {
    this.nodes = new Map();
  }

  addVertex(value) {
    // console.log("current value: ", value);
    if (!this.nodes.has(value)) {
      const vertex = new Node(value);
      this.nodes.set(value, vertex);
      return vertex;
    } else {
      const vertex = this.nodes.get(value);
      return vertex;
    }
  }

  addEdge(station, nextStation, weight) {
    const stationNode = this.addVertex(station);
    const nextStationNode = this.addVertex(nextStation);

    stationNode.addAdjacent(nextStationNode, weight);
    nextStationNode.addAdjacent(stationNode, weight);

    return [station, nextStation];
  }
}

export default Graph;
