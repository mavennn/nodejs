"use strict";

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Section {
    init(x1, y1, x2, y2) {
        this.firstPoint = new Point(x1, y1);
        this.secondPoint = new Point(x2, y2);
    }

    print() {
        console.log(`{${this.firstPoint.x}; ${this.firstPoint.y}} - {${this.secondPoint.x};${this.secondPoint.y}}`)
    }

    getLength() {
        return Math.sqrt(Math.pow((this.secondPoint.x - this.firstPoint.x), 2) + Math.pow((this.secondPoint.y - this.firstPoint.y), 2))
    }
}

class Triangle {
    init(dot1, dot2, dot3) {
        this.firstSection = new Section();
        this.secondSection = new Section();
        this.thirdSection = new Section();

        this.firstSection.init(dot1.x, dot1.y, dot2.x, dot2.y);
        this.secondSection.init(dot2.x, dot2.y, dot3.x, dot3.y);
        this.thirdSection.init(dot3.x, dot3.y, dot1.x, dot1.y);
    }

    canExist() {
        let a = this.firstSection.getLength();
        let b = this.secondSection.getLength();
        let c = this.thirdSection.getLength();

        return a + b > c && a + c > b && b + c > a;
    }

    getPerimeter() {
        return this.firstSection.getLength() + this.secondSection.getLength() + this.thirdSection.getLength()
    }

    getSquare() {
        let a = this.firstSection.getLength()
        let b = this.secondSection.getLength()
        let c = this.thirdSection.getLength()
        let p = this.getPerimeter() / 2

        return Math.sqrt(p * (p - a) * (p - b) * (p - c))
    }


    isRectangular() {
        let a = this.firstSection.getLength()
        let b = this.secondSection.getLength()
        let c = this.thirdSection.getLength()
        let s = this.getSquare()

        let firstCase = Math.pow(c, 2) === Math.pow(a, 2) + Math.pow(b, 2);
        let secondCase = Math.pow(a, 2) === Math.pow(b, 2) + Math.pow(c, 2);
        let thirdCase = Math.pow(b, 2) === Math.pow(a, 2) + Math.pow(c, 2);

        return firstCase || secondCase || thirdCase
    }
}

module.exports = {
    Point,
    Triangle,
    Section
}

