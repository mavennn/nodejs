class Student {
    group;
    studentTicketNumber;
    grades;

    constructor(group, studentTicketNumber, grades) {
    
        if (!group || typeof(group) !== "string")
            throw new TypeError();

        if (!studentTicketNumber || typeof(studentTicketNumber) !== "string") {
            throw new TypeError();
        }

        if (!grades || !Array.isArray(grades)) {
            throw new TypeError();
        }
        
        this.group = group;
        this.studentTicketNumber = studentTicketNumber;
        this.grades = grades;
    }
}


class Students {

    students = [];

    getAll() {
        return this.students;
    }

    addStudent(group, studentTicketNumber, grades) {

        const student = new Student(group, studentTicketNumber, grades);

        if (this.students.findIndex(x => x.studentTicketNumber.toLowerCase() == studentTicketNumber.toLowerCase()) === -1)
            this.students.push(student);
        else
            throw new Error("Children already exists");

    }

    getStudent(studentTicketNumber) {

        if (!studentTicketNumber)
            throw new Error("Invalid surname");

        if (this.students.findIndex(x => x.studentTicketNumber.toLowerCase() == studentTicketNumber.toLowerCase()) == -1) {
            throw new Error("Children with this surname doesn't exist in Kindergarten");
        }

        return this.students.filter(s => s.studentTicketNumber === studentTicketNumber)[0];
    }

    updateStudent(selectedTicketNumber, params) {

        if (!selectedTicketNumber || typeof(selectedTicketNumber) !== "string")
            throw new TypeError("Invalid surname");

        var student = this.getSudent(selectedTicketNumber);

        if (params.hasOwnProperty("group")) {
            if (params.group) {
                student.group = Number(params.group);
            }
        }

        if (params.hasOwnProperty("studentTicketNumber")) {
            if (params.studentTicketNumber) {
                child.studentTicketNumber = String(params.studentTicketNumber);
            }
        }

        if (params.hasOwnProperty("grades")) {
            if (params.grades && Array.isArray(grades)) {
                child.grades = params.grades;
            }
        }

    }

    deleteStudent(selectedTicketNumber) {
        if (!selectedTicketNumber || typeof(selectedTicketNumber) !== "string")
            throw new TypeError("Invalid surname");

        var index = this.students.findIndex(x => x.studentTicketNumber.toLowerCase() == selectedTicketNumber.toLowerCase());

        if (index === -1) {
            throw new Error('Children doesn\'t exist');
        }

        this.students.splice(index, 1);
    }

    getStudentAverageGrade(selectedTicketNumber) {

        var student = this.getStudent(selectedTicketNumber);

        return student.grades.reduce((acc, value) => acc + value) / student.grades.length;

    }

    getStudentsByGroup(group) {

        if (!group || typeof(group) !== "string")
            throw new Error();

        return this.students.filter(x => x.group.toLowerCase() == group.toLowerCase());
    }


    getStudentsByMaxGrades() {
        var maxIndex = null;
        var maxGradesCount = 0;

        try {
            for(var i = 0; i < this.students.length; i++) {
                if (this.students[i].grades.length >= maxGradesCount) {
                    maxIndex = i;
                    maxGradesCount = this.students[i].grades.length;
                }
            }

            return this.students[maxIndex];
        } catch (e) {

        }

    }


    getStudentsWithoutGrades() {
        return this.students.filter(x => x.grades == null || x.grades.length === 0);
    }

}

module.exports = Students;