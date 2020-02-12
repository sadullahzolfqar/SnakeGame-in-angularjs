app.factory('$selfPlay',function($http){
    
    const service = {
        
    };
    const directions = {
        left:39,
        right:37,
        up:38,
        down:40
    };

    var prevDirection = directions.left;

    var trainingData = {
        data:[]
    };



    service.setSnake = function(snake,direction){
        service.snake = {
            X:snake.X,
            Y:snake.Y,
            Direction:direction
        };
    }

    service.setForage = function(forage){
        service.forage = forage;
    }

    service.generateDirection = function (){
         let direction = calculateDirection();
         return direction;
    }

    function calculateDirection(){
        let movementDirection = {
            X: service.forage.X - service.snake.X,
            Y: service.forage.Y - service.snake.Y,
        };

        let direction = getDirectionStatus(movementDirection);
        
        if(direction != prevDirection){
            console.log(movementDirection);
            console.log('Direction:'+direction);
            prevDirection = direction;
        }

        let trainObj = {
            input: {snakeX:service.snake.X, snakeY:service.snake.Y, forageX:service.forage.X, forageY:service.forage.Y, snakeDirection:service.snake.Direction},
            output: {}
        };

        let directionName='left';
        if(direction == 37){
            directionName = 'right';
        }
        else if(directions == 38){
            directionName = 'up';
        }
        else if(directions == 40){
            directionName = 'down';
        }

        trainObj.output[directionName] = direction;
        
        trainingData.data.push(trainObj);
        return direction;
    }

    function getDirectionStatus(movementDirection)
    {
        if(movementDirection.X < 0){
            return directions.right;
        }
        else if(movementDirection.X > 0){
            return directions.left;
        }
        else if(movementDirection.X == 0 && (service.snake.Direction == directions.up || service.snake.Direction == directions.down)){
            return prevDirection;
        }
        else if(movementDirection.Y < 0){
            return directions.up;
        }
        else if(movementDirection.Y > 0){
            return directions.down;
        }
        else if(movementDirection.Y == 0 && (service.snake.Direction == directions.right || service.snake.Direction == directions.left)){
            return prevDirection;
        }
    }

    service.SaveTrainData = function(){
        var json = JSON.stringify(trainingData);
        
        var xhr = new XMLHttpRequest();
        xhr.open('POST','trainingData.json',true);

        xhr.onreadystatechange = function() {
            if(xhr.readyState ===4 && xhr.status==200){
                
            }
        }

        console.log(json)
    };

    return service;
});