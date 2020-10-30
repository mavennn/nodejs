
const { Point, Section, Triangle } = require('../dot');

test('section should return correct length', () => {
    const section = new Section();
    section.init(2, 2, 4, 4);
    const len = section.getLength();
    expect(parseFloat(len.toFixed(2))).toEqual(2.83);
});

test('triangle should exist', () => {
    const first = new Point(1, 1);
    const second = new Point (10, 10);
    const third = new Point(2, 7);
    const triangle = new Triangle();
    triangle.init(first, second, third);

    expect(triangle.canExist()).toBe(true);
});


test('triangle cannot exist', () => {
    const first = new Point(1, 1);
    const second = new Point (1, 10);
    const third = new Point(1, 7);
    const triangle = new Triangle();
    triangle.init(first, second, third);

    expect(triangle.canExist()).toBe(false);
});

test('should correct calculate perimeter', () => {
    const first = new Point(-1, 4);
    const second = new Point (-1, 2);
    const third = new Point(-7, 3);
    const triangle = new Triangle();
    triangle.init(first, second, third);

    expect(parseFloat(triangle.getPerimeter().toFixed(2))).toBe(14.17);
});

test('should correct calculate square', () => {
    const first = new Point(-1, 4);
    const second = new Point (-1, 2);
    const third = new Point(-7, 3);
    const triangle = new Triangle();
    triangle.init(first, second, third);

    expect(parseFloat(triangle.getSquare().toFixed(2))).toBe(6);
});


test('should correct calculate rectangular triangle', () => {
    const first = new Point(1, 1);
    const second = new Point (1, 2);
    const third = new Point(5, 1);
    const triangle = new Triangle();
    triangle.init(first, second, third);

    expect(triangle.isRectangular()).toBe(true);
});