const Students = require('../students');

test('should correct add student', () => {

    var students = new Students();

    students.addStudent('ICS-53B', '18R210', [1, 2, 3, 4]);

    expect(students.getAll()).toEqual([
        {
            group: 'ICS-53B',
            studentTicketNumber: '18R210',
            grades: [1, 2, 3, 4]
        }
    ])

});


test('should correct get student by ticketNumber', () => {
    const students = new Students();

    students.addStudent('ICS-53B', '18R210', [1, 2, 3, 4]);
    students.addStudent('ICS-53B', '18R211', [1, 2, 3]);
    students.addStudent('ICS-53B', '18R212', [1, 2]);
    students.addStudent('ICS-53B', '18R213', [1, 2, 3, 4]);

    const student = students.getStudent('18R210');

    expect(student).toEqual({
        group: "ICS-53B",
        studentTicketNumber: '18R210',
        grades: [1, 2, 3, 4]
    })

})


test('should correct delete student', () => {

    const students = new Students();

    students.addStudent('ICS-53B', '18R210', [1, 2, 3, 4]);
    students.addStudent('ICS-53B', '18R211', [1, 2, 3]);
    students.addStudent('ICS-53B', '18R212', [1, 2]);
    students.addStudent('ICS-53B', '18R213', [1, 2, 3, 4]);

    students.deleteStudent('18R210');

    expect(students.getAll()).toEqual([
        {
            group: 'ICS-53B',
            studentTicketNumber: '18R211',
            grades: [1, 2, 3]
        },
        {
            group: 'ICS-53B',
            studentTicketNumber: '18R212',
            grades: [1, 2]
        },
        {
            group: 'ICS-53B',
            studentTicketNumber: '18R213',
            grades: [1, 2, 3, 4]
        },
        
    ])
})


test('should correct get average grades for student', () => {
    const students = new Students();

    students.addStudent('ICS-53B', '18R210', [1, 2, 3, 4]);
    students.addStudent('ICS-53B', '18R211', [1, 2, 3]);

    var average = students.getStudentAverageGrade('18R210');

    expect(average).toBe((1 + 2 + 3 + 4) / 4);

})


test('should get students by group', () => {
    const students = new Students();

    students.addStudent('ICS-53B', '18R210', [1, 2, 3, 4]);
    students.addStudent('ICS-52B', '18R211', [1, 2, 3]);
    students.addStudent('ICS-53B', '18R212', [1, 2]);
    students.addStudent('ICS-53B', '18R213', [1, 2, 3, 4]);

    const groupStudents = students.getStudentsByGroup('ICS-53B');

    expect(groupStudents).toEqual([
        {
            group: 'ICS-53B',
            studentTicketNumber: '18R210',
            grades: [1, 2, 3, 4]
        },
        {
            group: 'ICS-53B',
            studentTicketNumber: '18R212',
            grades: [1, 2]
        },
        {
            group: 'ICS-53B',
            studentTicketNumber: '18R213',
            grades: [1, 2, 3, 4]
        },
    ])

})


test('should get student by max count of grades', () => {
    const students = new Students();

    students.addStudent('ICS-53B', '18R210', [1, 2, 3, 4]);
    students.addStudent('ICS-52B', '18R211', [1, 2, 3]);
    students.addStudent('ICS-53B', '18R212', [1, 2]);
    students.addStudent('ICS-53B', '18R213', [1, 2, 3, 4]);

    const student = students.getStudentsByMaxGrades();

    expect(student).toEqual({
        group: "ICS-53B",
        studentTicketNumber: "18R213",
        grades: [1, 2, 3, 4]
    })

})


test('should get students without grades', () => {
    const students = new Students();

    students.addStudent('ICS-53B', '18R210', [1, 2, 3, 4]);
    students.addStudent('ICS-52B', '18R211', []);
    students.addStudent('ICS-53B', '18R212', []);
    students.addStudent('ICS-53B', '18R213', [1, 2, 3, 4]);

    const result = students.getStudentsWithoutGrades();

    expect(result).toEqual([
        {
            group: "ICS-52B",
            studentTicketNumber: "18R211",
            grades: []
        },
        {
            group: "ICS-53B",
            studentTicketNumber: "18R212",
            grades: []
        }
    ])

})