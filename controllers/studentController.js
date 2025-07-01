const Student = require('../models/student');

// Create a new students
const createStudent = async (req, res) => {
    try {
        const { firstName, lastName, age, email } = req.body;
        const newStudent = new Student({ firstName, lastName, age, email });
        await newStudent.save();

        // check if student already exists
        const existingStudent = await Student.findOne({ email });
        if (existingStudent) {
            return res.status(409).json({ message: 'Student already exists' });
        }

        res.status(201).json(newStudent);
        console.log("New student created successfully")
    } catch (error) {
        res.status(400).json({ message: 'Error creating student' });
    }
};

// Get all students (with pagination and filtering)
const getStudents = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, firstName, lastName } = req.query;
        const query = lastName ? { lastName: new RegExp(lastName, 'i') } : {};

        const students = await Student.find(query)
            .skip((page - 1) * limit)
            .limit(Number(limit));
        
        res.status(200).json({students, page, limit});
    } catch (error) {
        res.status(400).json({ message: 'Err' });
        next(error);
    }
};

// Get student count
const getStudentCount = async (req, res, next) => {
    try {
        const count = await Student.countDocuments();
        res.status(200).json({ count });
    } catch (error) {
        res.status(400).json({ message: error.message });
        next(error);
    }
};

// Update a student by ID
const updateStudent = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const updatedStudent = await Student.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json(updatedStudent);
    } catch (error) {
        res.status(400).json({ message: error.message });
        next(error);
    }
};

// Delete a student by ID
const deleteStudent = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedStudent = await Student.findByIdAndDelete(id);
        if (!deletedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
        next(error);
    }
};

module.exports = {
    createStudent,
    getStudents,
    getStudentCount,
    updateStudent,
    deleteStudent
};
