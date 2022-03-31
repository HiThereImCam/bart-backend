/**
 *
 * @param {*} graph
 * @param {*} departure
 * @param {*} destination
 *
 *
 */

const backtrace = (pathToParent, departure, destination) => {
  let path = [destination];
  let lastElement = path[path.length - 1];

  /* 
        while lastElement !== departure
    */

  while (lastElement !== departure) {
    let parentStation = pathToParent.get(lastElement);
    // add parentStation to queue
    path.push(parentStation);
    lastElement = path[path.length - 1];
  }
  path = path.reverse();

  return path;
};

const getPath = (graph, departure, destination) => {
  let pathToParent = new Map();

  //   let queue = [graph[departure]];

  let queue = [graph.nodes.get(departure)];
  let haveSeen = new Set();
  while (queue.length) {
    let currentNode = queue.shift();

    if (currentNode.value === destination) {
      return backtrace(pathToParent, departure, destination);
    }
    // add current value to haveSeen
    haveSeen.add(currentNode.value);

    /*
        if currentNode !== destination
            add it to haveSeen
            add currentNodes to queue

        iterate through adjacency list 
           if you have not seen the current neighbor 
            add it to haveSeen
            add it to pathToParent
                key = current neighbor
                value = currentNode value
            add neighbor to queue 

    */

    for (let neighbor of currentNode.adjacents) {
      let neighborValue = neighbor.node.value;

      if (!haveSeen.has(neighborValue)) {
        haveSeen.add(neighborValue);
        pathToParent.set(neighborValue, currentNode.value);
        queue.push(graph.nodes.get(neighborValue));
      }
    }
  }
};

export default getPath;

/*
  shape of the result should be
  result = {
    path: [],
    transferPoint: transferPoint,
    transferLine
  }


  option 1: the node should know it's a transfer point
  option 2: result array should check for transfer points along the line
    - if found
        check lines going through station via another api call (?)
        after api call
        

    given the transferPoint, the destination, and the endpoints running through the currentStation
    find the endpoint that holds both the transferPoint and the destination
      - the index of the transferPoint will always be less than the destination 

    how do I deal with 19th street and MacArthur 

    if there are two transfer points

    take daly city via the blue line 
    transfer at bay fair via the orange line
    arrive at hayw
    
    
*/
