const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        min: 0
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
}, {
    timestamps: true,
    versionKey: false
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
