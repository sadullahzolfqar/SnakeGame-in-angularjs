app.factory('$selfPlay',function(){
    
    var service = {
        
    };
    var directions = {
        left:39,
        right:37,
        up:38,
        down:40
    };

    var prevDirection = directions.left;

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
        
        if(direction!=prevDirection){
            prevDirection = direction;
        }
        
        return direction;
    }

    function getDirectionStatus(movementDirection){
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

    return service;
});