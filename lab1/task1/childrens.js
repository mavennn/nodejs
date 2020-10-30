class Children {

    surname;
    age;

    constructor(surname, age) {
        if (!surname)
            throw new Error("Invalid surname");

        if (!age)
            throw new Error("Invalid age");

        this.surname = surname;
        this.age = age;
    }
}    

class Kindergarten {
    childrens = [];


    getAll() {
        return this.childrens;
    }

    addChildren(surname, age) {

        const children = new Children(surname, age);

        if (this.childrens.findIndex(x => x.surname.toLowerCase() == children.surname.toLowerCase()) === -1)
            this.childrens.push(children);
        else
            throw new Error("Children already exists");

    }

    getChildren(surname) {

        if (!surname)
            throw new Error("Invalid surname");

        if (this.childrens.findIndex(x => x.surname.toLowerCase() == surname.toLowerCase()) == -1) {
            throw new Error("Children with this surname doesn't exist in Kindergarten");
        }

        return this.childrens.filter(child => child.surname == surname)[0];
    }

    update(surname, params) {

        if (!surname)
            throw new Error("Invalid surname");

        var child = this.getChildren(surname);

        if (params.hasOwnProperty("age")) {
            if (params.age) {
                child.age = Number(params.age);
            }
        }

        if (params.hasOwnProperty("surname")) {
            if (params.surname) {
                child.surname = String(params.surname);
            }
        }

    }

    deleteChildren(surname) {
        if (!surname)
            throw new Error("Invalid surname");

        var index = this.childrens.findIndex(x => x.surname.toLowerCase() == surname.toLowerCase());

        if (index === -1) {
            throw new Error('Children doesn\'t exist');
        }

        this.childrens.splice(index, 1);
    }

    getOldestChilden() {

        if (this.childrens.length === 0)
            throw new Error();

        let maxAge = this.childrens[0].age;
        let maxIndex = null;

        for(var i = 0; i < this.childrens.length; i++) {
            if (this.childrens[i].age >= maxAge)
                maxIndex = i;
        }

        return this.childrens[maxIndex];
    }

    getAverageAge() {

        if (this.childrens.length === 0)
            throw new Error();

        var maxAge = this.childrens
                                .map(ch => ch.age)
                                .reduce((acc, value) => acc + value) / this.childrens.length;

        return maxAge;

    }


    getChildrensInAgeRange(min, max) {

        if (!min || typeof(min) != "number"){
            throw new Error();
        }

        if (!max || typeof(max) != "number"){
            throw new Error();
        }

        if (this.childrens.length === 0)
            throw new Error();

        return this.childrens.filter(x => x.age >= min && x.age <= max);
    }

    getChildsByFirstLetter(letter) {

        if (!letter || typeof(letter) != "string") {
            throw new Error();
        }

        if (this.childrens.length === 0)
            throw new Error();

        return this.childrens.filter(x => x.surname[0].toLowerCase() == letter.toLowerCase());
    }

    getChildensWhereSurnameLongerThen(length){
        if (!length || typeof(length) != "number") {
            throw new Error();
        }

        if (this.childrens.length === 0)
            throw new Error();

        return this.childrens.filter(x => x.surname.length > length);
    }

    getChildrensWhereSurnameStartsWithVowel() {
        
        if (this.childrens.length === 0)
            throw new Error();

        return this.childrens.filter(x => (/^[aeiou]$/i).test(x.surname[0]));
    }

}

module.exports = Kindergarten;
