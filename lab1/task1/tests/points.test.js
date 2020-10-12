const Points = require('../points');


test('should correct add point', () => {

    const points = new Points();

    points.addPoint("firstPoint", 10, 10);

    expect(points.getAll()).toEqual([
        {
            name: "firstPoint",
            x: 10,
            y: 10
        }
    ])
})

test('should correct get point by name', () => {

    const points = new Points();

    points.addPoint("firstPoint", 10, 10);
    points.addPoint("secondPoint", 20, 20);
    points.addPoint("thirdPoint", 30, 30);

    const point = points.getPoint("thirdPoint");

    expect(point).toEqual({
        name: "thirdPoint",
        x: 30,
        y: 30
    })

})


test('should correct delete points by name', () => {
    const points = new Points();

    points.addPoint("firstPoint", 10, 10);
    points.addPoint("secondPoint", 20, 20);
    points.addPoint("thirdPoint", 30, 30);

    points.deletePoint("secondPoint");

    expect(points.getAll()).toEqual([
        {
            name: "firstPoint",
            x: 10,
            y: 10,
        },
        {
            name: "thirdPoint",
            x: 30,
            y: 30,
        }
    ])
})

test('should get two point with maximum between distance', () => {

    const points = new Points();

    points.addPoint("firstPoint", 10, 10);
    points.addPoint("secondPoint", 20, 20);
    points.addPoint("thirdPoint", 30, 30);

    const result = points.getPointsWithMaxBetweenDistance();

    expect(result).toEqual([
        {
            name: "firstPoint",
            x: 10,
            y: 10
        },
        {
            name: "thirdPoint",
            x: 30,
            y: 30
        }
    ])
})


test('should get points where distance to other point lower then constant', () => {
    const points = new Points();

    points.addPoint("firstPoint", 10, 10);
    points.addPoint("secondPoint", 20, 20);
    points.addPoint("thirdPoint", 30, 30);
    points.addPoint("fourthPoint", 35, 36);
    points.addPoint("fivePoint", 38, 38);

    const otherPoint = {
        name: "otherPoint",
        x: 40,
        y: 40
    }

    const result = points.getPointsInRangeFrom(otherPoint, 10);

    expect(result).toEqual([
        {
            name: "fourthPoint",
            x: 35,
            y: 36
        },
        {
            name: "fivePoint",
            x: 38,
            y: 38
        }
    ])
})


test('should correctly get points in square area', () => {
    const points = new Points();

    points.addPoint("firstPoint", 10, 10);
    points.addPoint("secondPoint", 20, 20);
    points.addPoint("thirdPoint", 30, 30);
    points.addPoint("fourthPoint", 35, 36);
    points.addPoint("fivePoint", 38, 38);

    var result = points.getPointsInZone({ x: 5, y: 8 }, { x: 22, y: 25 });

    expect(result).toEqual([
        {
            name: "firstPoint",
            x: 10,
            y: 10,
        },
        {
            name: "secondPoint",
            x: 20,
            y: 20,
        }
    ])
})