// =====================================================
// VIVEKANANDA MISSION INSTITUTE
// EXCEL READER
// =====================================================

class ExcelReader {

    constructor() {

        this.workbook = null;
        this.students = [];
        this.classes = [];

    }

    /* ==========================================
       LOAD EXCEL FILE
    ========================================== */

    async load(file) {

        this.students = [];
        this.classes = [];

        const buffer = await file.arrayBuffer();

        this.workbook = XLSX.read(buffer, {

            type: "array"

        });

        this.readWorkbook();

        return this.students;

    }

    /* ==========================================
       READ ALL SHEETS
    ========================================== */

    readWorkbook() {

        this.workbook.SheetNames.forEach(sheetName => {

            const sheet = this.workbook.Sheets[sheetName];

            if (!sheet) return;

            this.classes.push(sheetName);

            this.readSheet(sheetName, sheet);

        });

    }

    /* ==========================================
       READ ONE SHEET
    ========================================== */

    readSheet(className, sheet) {

        const rows = XLSX.utils.sheet_to_json(sheet, {

            defval: ""

        });

        rows.forEach((row, index) => {

            const student = this.createStudent(

                className,
                row,
                index + 1

            );

            if (student) {

                this.students.push(student);

            }

        });

    }
        /* ==========================================
       CREATE STUDENT OBJECT
    ========================================== */

    createStudent(className, row, serialNo) {

        // Normalize column names
        const get = (...keys) => {

            for (const key of keys) {

                if (row[key] !== undefined && row[key] !== null && row[key] !== "") {

                    return String(row[key]).trim();

                }

            }

            return "";

        };

        const name = get(
            "NAME",
            "Name",
            "Student Name",
            "STUDENT NAME"
        );

        // Ignore blank rows
        if (!name) {

            return null;

        }

        const father = get(
            "FATHER'S NAME",
            "FATHER NAME",
            "Father Name"
        );

        const mother = get(
            "MOTHER'S NAME",
            "MOTHER NAME",
            "Mother Name"
        );

        const address = get(
            "ADDRESS",
            "Address"
        );

        const phone = get(
            "PHONE NUMBER",
            "PHONE",
            "MOBILE",
            "CONTACT NUMBER"
        );

        const roll = get(
            "ROLL",
            "ROLL NO",
            "ROLL NO.",
            "Roll"
        ) || serialNo;

        /* Student ID */

        const classCode = className
            .replace(/\s+/g, "")
            .toUpperCase();

        const studentId =
            "VMI-" +
            classCode +
            "-" +
            String(serialNo).padStart(3, "0");

        /* Photo Path */

        const safeName = name
            .replace(/[^\w\s]/g, "")
            .trim();

        const photo = `photos/${safeName}.jpg`;

        return {

            id: studentId,

            roll: roll,

            class: className,

            name: name,

            father: father,

            mother: mother,

            address: address,

            phone: phone,

            photo: photo,

            raw: row

        };

    }
        /* ==========================================
       GET ALL CLASSES
    ========================================== */

    getClasses() {

        return [...this.classes];

    }

    /* ==========================================
       GET STUDENTS OF A CLASS
    ========================================== */

    getStudentsByClass(className) {

        return this.students.filter(student => {

            return student.class === className;

        });

    }

    /* ==========================================
       FIND STUDENT BY ID
    ========================================== */

    getStudent(studentId) {

        return this.students.find(student => {

            return student.id === studentId;

        });

    }

    /* ==========================================
       TOTAL STUDENTS
    ========================================== */

    getTotalStudents() {

        return this.students.length;

    }

    /* ==========================================
       TOTAL CLASSES
    ========================================== */

    getTotalClasses() {

        return this.classes.length;

    }

    /* ==========================================
       SORT STUDENTS
    ========================================== */

    sortStudents() {

        this.students.sort((a, b) => {

            if (a.class === b.class) {

                return Number(a.roll) - Number(b.roll);

            }

            return a.class.localeCompare(b.class);

        });

    }

    /* ==========================================
       SEARCH STUDENTS
    ========================================== */

    search(keyword) {

        keyword = String(keyword).toLowerCase().trim();

        if (!keyword) {

            return [...this.students];

        }

        return this.students.filter(student => {

            return (

                student.name.toLowerCase().includes(keyword)

                ||

                student.id.toLowerCase().includes(keyword)

                ||

                String(student.roll).toLowerCase().includes(keyword)

                ||

                student.phone.toLowerCase().includes(keyword)

                ||

                student.class.toLowerCase().includes(keyword)

            );

        });

    }

    /* ==========================================
       RESET
    ========================================== */

    clear() {

        this.students = [];

        this.classes = [];

        this.workbook = null;

    }
        /* ==========================================
       VALIDATE STUDENT
    ========================================== */

    validateStudent(student) {

        if (!student) return false;

        if (!student.name) return false;

        if (!student.class) return false;

        if (!student.id) return false;

        return true;

    }

    /* ==========================================
       DEFAULT PHOTO
    ========================================== */

    getPhoto(student) {

        if (!student || !student.photo) {

            return "assets/default.png";

        }

        return student.photo;

    }

    /* ==========================================
       NORMALIZE DATA
    ========================================== */

    normalizeStudents() {

        this.students = this.students.filter(student => {

            return this.validateStudent(student);

        });

        this.sortStudents();

    }

    /* ==========================================
       REFRESH
    ========================================== */

    refresh() {

        this.normalizeStudents();

        return this.students;

    }

} // End of ExcelReader Class


/* ==========================================
   EXPORT
========================================== */

window.ExcelReader = ExcelReader;