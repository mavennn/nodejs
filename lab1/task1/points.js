class Point {
    x;
    y;

    constructor(name, x, y) {

        if (!name || typeof(name) !== "string")
        throw new TypeError();

        if (!x || typeof(x) !== "number")
            throw new TypeError();

        if (!y || typeof(y) !== "number")
            throw new TypeError();

        this.name = name;
        this.x = x;
        this.y = y;
    }

    distanceTo(point) {
        return Math.sqrt(Math.pow((point.x - this.x), 2) + Math.pow((point.y - this.y), 2));
    }
}



class Points {

    points = [];

    getAll() {
        return this.points;
    }

    addPoint(name, x, y) {

        const point = new Point(name, x, y);

        if (this.points.findIndex(x => x.name.toLowerCase() == point.name.toLowerCase()) === -1)
            this.points.push(point);
        else
            throw new Error();

    }

    getPoint(name) {

        if (!name)
            throw new Error("Invalid name");

        if (this.points.findIndex(x => x.name.toLowerCase() == name.toLowerCase()) == -1) {
            throw new Error();
        }

        return this.points.filter(p => p.name == name)[0];
    }

    updatePoint(name, x, y) {

        if (!name)
            throw new Error("Invalid name");

        var point = this.getChildren(name);

        if (params.hasOwnProperty("name")) {
            if (params.nmae) {
                point.name = Number(params.name);
            }
        }

        if (params.hasOwnProperty("x")) {
            if (params.x) {
                point.x = String(params.x);
            }
        }

        if (params.hasOwnProperty("y")) {
            if (params.y) {
                point.y = String(params.y);
            }
        }

    }

    deletePoint(name) {
        if (!name)
            throw new Error("Invalid name");

        var index = this.points.findIndex(x => x.name.toLowerCase() == name.toLowerCase());

        if (index === -1) {
            throw new Error('Point doesn\'t exist');
        }

        this.points.splice(index, 1);
    }

    getPointsWithMaxBetweenDistance() {

        var distances = [];

        for(var i = 0; i < this.points.length - 1; i++) {
            for (var j =  i + 1; j < this.points.length; j++) {
                distances.push({
                    first: this.points[i],
                    second: this.points[j],
                    distance: this.points[i].distanceTo(this.points[j])
                })
            }
        }

        var maxDistance = 0;
        let result = null;
        for(var p of distances) {
            if (p.distance > maxDistance) {
                maxDistance = p.distance;
                result = [p.first, p.second];
            }
        }

        return result;
    }


    getPointsInRangeFrom(point, constant) {

        if (!point)
            throw new TypeError();

        if (!constant || typeof(constant) !== "number")
            throw new TypeError();

        return this.points.filter(x => x.distanceTo(point) <= constant);
    }


    getPointsInZone(firstPoint, secondPoint) {

        if (firstPoint.x == secondPoint.x || firstPoint.y == secondPoint.y)
            return -1;

        let xMin = firstPoint.x, 
            xMax = secondPoint.x, 
            yMin = firstPoint.y,
            yMax = secondPoint.y;

        if (firstPoint.x > secondPoint.x) {
            xMin = secondPoint.x;
            xMax = firstPoint.x
        }

        if (firstPoint.y > secondPoint.y) {
            yMin = secondPoint.y;
            yMax = firstPoint.y;
        }

        return this.points.filter(point => point.x < xMax && point.x > xMin && point.y < yMax && point.y > yMin);

    }


    getPointsByAxis(axis, direction) {

        if (!axis || typeof(axis) !== "string")
            throw new TypeError();

        if (axis != "x" || axis != "y")
            throw new Error();

        if (axis == "x") {
            if (direction == "up") {
                return this.points.filter(p => p.x > 0);
            } else if (direction == "down") {
                return this.points.filter(p => p.x < 0);
            }
             
        } else {
            if (direction == "left") {
                return this.points.filter(p => p.y > 0);
            } else if (direction == "right") {
                return this.points.filter(p => p.y < 0);
            }
        }

    }

}

module.exports = Points;