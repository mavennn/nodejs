const Kindergarten = require('../childrens'); 


/* Tests for Add */

test('should successfully create kindergarten', () => {
    var kindergarten = new Kindergarten();

    expect(kindergarten.getAll().length).toBe(0);
});


test('should add new children', () => {
    var kindergarten = new Kindergarten();

    kindergarten.addChildren("gadoev", 21);

    expect(kindergarten.getAll().length).toBe(1);
});

test('should throw new error when double surnames', () => {
    var kindergarten = new Kindergarten();

    kindergarten.addChildren("gadoev", 21);

    expect(() => {
        kindergarten.addChildren("gadoev", 11);
    }).toThrow()
})

test('should throw error when double surname with different register', () => {
    var kindergarten = new Kindergarten();

    kindergarten.addChildren("gadoev", 21);

    expect(() => {
        kindergarten.addChildren("Gadoev", 11);
    }).toThrow()
})

test('should add three childs', () => {
    var kindergarten = new Kindergarten();

    kindergarten.addChildren("gadoev", 21);
    kindergarten.addChildren("sdfdfj", 21);
    kindergarten.addChildren("sdfasdfsaf", 21);

    expect(kindergarten.getAll().length).toBe(3);
});

/* Tests for Get */

test('should get children with surname gadoev if exists', () => {
    var kindergarten = new Kindergarten();

    kindergarten.addChildren("gadoev", 21);
    kindergarten.addChildren("sdfasdfsaf", 21);

    var child = kindergarten.getChildren("gadoev");

    expect(child).toEqual({ surname: "gadoev", age: 21 });
})


test('should throw error when children doesn\'t exist', () => {
    var kindergarten = new Kindergarten();

    kindergarten.addChildren("gadoev", 21);
    kindergarten.addChildren("Ivanov", 21);

    expect(() => {
        kindergarten.getChildren("karpov");
    }).toThrow();
})


/* Tests for Update */

test('should update age', () => {

    const kindergarten = new Kindergarten();

    kindergarten.addChildren("gadoev", 21);

    kindergarten.update("gadoev", { age: 14 });

    const child = kindergarten.getChildren("gadoev");

    expect(child).toEqual({ surname: "gadoev", age: 14 });
})

test('should update surname', () => {
    const kindergarten = new Kindergarten();

    kindergarten.addChildren("gadoev", 21);

    kindergarten.update("gadoev", { surname: "karpov" });

    var child = kindergarten.getChildren("karpov");

    expect(child).toEqual({ surname: "karpov", age: 21 });

})

test('should update surname and name', () => {
    const kindergarten = new Kindergarten();

    kindergarten.addChildren("gadoev", 21);

    kindergarten.update("gadoev", { surname: "karpov", age: 14 });

    var child = kindergarten.getChildren("karpov");

    expect(child).toEqual({ surname: "karpov", age: 14 });
})

test('should throw error when child doesn\'t exist when update', () => {
    const kindergarten = new Kindergarten();

    kindergarten.addChildren("gadoev", 21);

    expect(() => {
        kindergarten.update("karpov", { age: 14 });
    }).toThrow();
})

test('should update only surname if age is undefined', () => {
    const kindergarten = new Kindergarten();

    kindergarten.addChildren("gadoev", 21);

    kindergarten.update("gadoev", { surname: "karpov", age: undefined });

    var child = kindergarten.getChildren("karpov");

    expect(child).toEqual({ surname: "karpov", age: 21 });
})

test('should update only age if surname is undefined', () => {
    const kindergarten = new Kindergarten();

    kindergarten.addChildren("gadoev", 21);

    kindergarten.update("gadoev", { surname: undefined, age: 14});

    var child = kindergarten.getChildren("gadoev");

    expect(child).toEqual({ surname: "gadoev", age: 14 });
})

test('should throw error when surname is undefined', () => {
    const kindergarten = new Kindergarten();

    kindergarten.addChildren("gadoev", 21);

    expect(() => {
        kindergarten.update(undefined, { age: 15 });
    }).toThrow();

})


/* Tests for Delete */

test('should delete child when exist', () => {
    const kindergarten = new Kindergarten();

    kindergarten.addChildren("gadoev", 21);
    kindergarten.addChildren("karpov", 15);

    expect(kindergarten.getAll().length).toBe(2);

    kindergarten.deleteChildren("gadoev");

    expect(kindergarten.getAll().length).toBe(1);
})


test('should throw error when child doesn\'t exist when deleting', () => {
    const kindergarten = new Kindergarten();

    kindergarten.addChildren("gadoev", 21);
    kindergarten.addChildren("karpov", 15);

    expect(() => {
        kindergarten.deleteChildren("ivanov");
    }).toThrow();
})


test('should throw new error when surname is undefined or null', () => {
    const kindergarten = new Kindergarten();

    kindergarten.addChildren("gadoev", 21);
    kindergarten.addChildren("karpov", 15);

    expect(() => {
        kindergarten.deleteChildren(undefined);
    }).toThrow();

    expect(() => {
        kindergarten.deleteChildren(null);
    }).toThrow();
})

/* Tests for GetOldestChildren */

test('should get children when three childrens in kindergarten', () => {
    const kindergarten = new Kindergarten();

    kindergarten.addChildren("gadoev", 21);
    kindergarten.addChildren("karpov", 15);
    kindergarten.addChildren("ivanov", 13);

    const child = kindergarten.getOldestChilden();

    expect(child).toEqual({ surname: "gadoev", age: 21 });
})

test('should get childen when one child in kindergarten', () => {
    const kindergarten = new Kindergarten();

    kindergarten.addChildren("gadoev", 21);

    const child = kindergarten.getOldestChilden();

    expect(child).toEqual({ surname: "gadoev", age: 21 });
})

test('should throw error if nobody in kindergarten', () => {

    const kindergarten = new Kindergarten();
    
    expect(() => {
        const child = kindergarten.getOldestChilden();
    }).toThrow();

});

/* Tests for AverageAge */

test('should correctly get average age', () => {
    const kindergarten = new Kindergarten();

    kindergarten.addChildren("gadoev", 21);
    kindergarten.addChildren("karpov", 15);
    kindergarten.addChildren("ivanov", 13);

    expect(kindergarten.getAverageAge()).toBe((21 + 15 + 13) / 3);
})


/* Test for GetChildrenInAgeRange */

test('should correctly get children in age diapason', () => {

    const kindergarten = new Kindergarten();

    kindergarten.addChildren("gadoev", 18);
    kindergarten.addChildren("karpov", 16);
    kindergarten.addChildren("ivanov", 17);
    kindergarten.addChildren("asdfsdf", 15);
    kindergarten.addChildren("lkdjghj", 14);
    kindergarten.addChildren("ivanoa", 12);

    var childrens = kindergarten.getChildrensInAgeRange(15, 18);

    expect(childrens).toEqual([
        {
            surname: "gadoev",
            age: 18,
        },
        {
            surname: "karpov",
            age: 16,
        },
        {
            surname: "ivanov",
            age: 17
        },
        {
            surname: "asdfsdf",
            age: 15
        }
    ])
})


/* Тest for GetByFirstLetter */

test('should correctly get by first letter in name', () => {
    const kindergarten = new Kindergarten();

    kindergarten.addChildren("gadoev", 18);
    kindergarten.addChildren("karpov", 16);
    kindergarten.addChildren("ivanov", 17);
    kindergarten.addChildren("gasanov", 15);
    kindergarten.addChildren("tassov", 14);

    const childs = kindergarten.getChildsByFirstLetter("g");

    expect(childs).toEqual([
        {
            surname: "gadoev",
            age: 18
        },
        {
            surname: "gasanov",
            age: 15
        }
    ])
})


/* Tests for getChildensWhereSurnameLongerThen */

test('should correctly get childrens where surname longer then length', () => {

    const kindergarten = new Kindergarten();

    kindergarten.addChildren("gadoev", 18);
    kindergarten.addChildren("asya", 16);
    kindergarten.addChildren("ira", 17);
    kindergarten.addChildren("gasanov", 15);
    kindergarten.addChildren("tassov", 14);

    const childs = kindergarten.getChildensWhereSurnameLongerThen(4);

    expect(childs).toEqual([
        {
            surname: "gadoev",
            age: 18
        },
        {
            surname: "gasanov",
            age: 15
        },
        {
            surname: "tassov",
            age: 14
        }
    ])
})

/* Tests for getChildrensWhereSurnameStartsWithVowel */

test('should correct get childrens where surname starts with vowel', () => {

    const kindergarten = new Kindergarten();

    kindergarten.addChildren("gadoev", 18);
    kindergarten.addChildren("asya", 16);
    kindergarten.addChildren("ira", 17);
    kindergarten.addChildren("gasanov", 15);
    kindergarten.addChildren("tassov", 14);

    const childs = kindergarten.getChildrensWhereSurnameStartsWithVowel();

    expect(childs).toEqual([
        {
            surname: "asya",
            age: 16
        },
        {
            surname: "ira",
            age: 17
        }
    ])

})