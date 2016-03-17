function create2DArray(rows,columns) {
   var grid = new Array(rows);
   for (var i = 0; i < rows; i++) {
       grid[i] = new Array(columns);
   }
   initializeGrid(grid, "");
   return grid;
}

function initializeGrid(grid, value) {
  for(var i = 0; i < grid.length; i++) {
    for(var j = 0; j < grid[i].length; j++) {
      grid[i][j] = value;
    }
  }
}

function insertObstacleInGrid(position1, position2) {
  if(grid[position1] !== undefined && grid[position1][position2] !== undefined) {
    if(grid[position1][position2] === "") {
      grid[position1][position2] = "o";
    } else {
      console.log("This box([" + position1 + ", " + position2 + "]) is occupied.");
    }
  } else {
    console.log("You can not place an obstacle outside the grid.");
  }
}

function insertRoverInGrid(rover) {
  if(grid[rover.position[0]] !== undefined && grid[rover.position[0]][rover.position[1]] !== undefined) {
    if(grid[rover.position[0]][rover.position[1]] === "") {
      grid[rover.position[0]][rover.position[1]] = "r";
    } else {
      console.log("This box([" + rover.position[0] + ", " + rover.position[1] + "]) is occupied.");
    }
  } else {
    console.log("You can not place a rover outside the grid.");
  }
}

function checkPosition(position1, position2) {
  var response = {};
  if(grid[position1] !== undefined && grid[position1][position2] === "") {
    response.success = true;
  }
  if(grid[position1] === undefined || grid[position1][position2] === undefined) {
    response.success = false;
    response.description = "edge";
  }
  if(grid[position1] !== undefined && grid[position1][position2] === "r") {
    response.success = false;
    response.description = "This box([" + position1 + ", " + position2 + "]) is occupied by another rover.";
  }
  if(grid[position1] !== undefined && grid[position1][position2] === "o") {
    response.success = false;
    response.description = "This box([" + position1 + ", " + position2 + "]) is an obstacle.";
  }
  return response;
}

function moveRoverInGrid(oldPosition1, oldPosition2, newPosition1, newPosition2) {
  if(grid[oldPosition1][oldPosition2] === "r") {
    grid[oldPosition1][oldPosition2] = "";
    grid[newPosition1][newPosition2] = "r";
    return true;
  }
  return false;
}

function moveRover(rover, newPosition1, newPosition2) {
  var response = checkPosition(newPosition1, newPosition2);
  if(response.success === true) {
    if(moveRoverInGrid(rover.position[0], rover.position[1], newPosition1, newPosition2)) {
      rover.position[0] = newPosition1;
      rover.position[1] = newPosition2;
      console.log("New Rover Position: [" + rover.position[0] + ", " + rover.position[1] + "]");
      return true;
    } else {
      return false;
    }
  } else {
    if(response.description === "edge") {
      if(newPosition1 === 10) newPosition1 = 0;
      if(newPosition1 === -1) newPosition1 = 9;
      if(newPosition2 === 10) newPosition2 = 0;
      if(newPosition2 === -1) newPosition2 = 9;
      moveRover(rover, newPosition1, newPosition2)
    } else {
      console.log(response.description);
      return false;
    }
  }
}

function goForward(rover) {
  var response;
  switch(rover.direction) {
    case 'N':
      response = moveRover(rover, rover.position[0] + 1, rover.position[1]);
      break;
    case 'E':
      response = moveRover(rover, rover.position[0], rover.position[1] + 1);
      break;
    case 'S':
      response = moveRover(rover, rover.position[0] - 1, rover.position[1]);
      break;
    case 'W':
      response = moveRover(rover, rover.position[0], rover.position[1] - 1);
      break;
  };
  return response;
}

function goBack(rover) {
  var response;
  switch(rover.direction) {
    case 'N':
      response = moveRover(rover, rover.position[0] - 1, rover.position[1]);
      break;
    case 'E':
      response = moveRover(rover, rover.position[0], rover.position[1] - 1);
      break;
    case 'S':
      response = moveRover(rover, rover.position[0] + 1, rover.position[1]);
      break;
    case 'W':
      response = moveRover(rover, rover.position[0], rover.position[1] + 1);
      break;
  };
  return response;
}

function turnRight(rover) {
  switch(rover.direction) {
    case 'N':
      rover.direction = "E";
      break;
    case 'E':
      rover.direction = "S";
      break;
    case 'S':
      rover.direction = "W";
      break;
    case 'W':
      rover.direction = "N";
      break;
  };

  console.log("New Rover Direction: " + rover.direction);
}

function turnLeft(rover) {
  switch(rover.direction) {
    case 'N':
      rover.direction = "W";
      break;
    case 'E':
      rover.direction = "N";
      break;
    case 'S':
      rover.direction = "E";
      break;
    case 'W':
      rover.direction = "S";
      break;
  };

  console.log("New Rover Direction: " + rover.direction);
}

function seriesCommands(rover, commands) {
  var ok = true;
  for (var i = 0; i < commands.length && ok; i++) {
    if(commands[i] === "f") ok = goForward(rover);
    if(commands[i] === "b") ok = goBack(rover);
    if(commands[i] === "r") turnRight(rover);
    if(commands[i] === "l") turnLeft(rover);
  }
}



var grid = create2DArray(10,10);

var myRover = {
  position: [0,0], 
  direction: 'N'
};

insertRoverInGrid(myRover);

var myRover2 = {
  position: [1,0], 
  direction: 'N'
};

insertRoverInGrid(myRover2);

insertObstacleInGrid(1,1);

seriesCommands(myRover2, 'rfffff');