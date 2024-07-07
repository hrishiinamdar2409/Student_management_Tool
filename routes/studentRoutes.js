const express = require("express");
const router = express.Router();
const multer = require("multer");
const Student = require("../models/student");

// Set up Multer for handling multipart/form-data
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });

router.get("/", (req, res) => {
    res.send("Welcome to the students management tool");
});

// POST student details
router.post("/student", upload.single('student_img'), async (req, res) => {
    try {
        const data = req.body;

        // Add base64-encoded image to the student data if an image is uploaded
        if (req.file) {
            data.student_img = req.file.buffer.toString('base64');
        }

        // Create a new Student document using the Mongoose model
        const newStudent = new Student(data);

        // Save the newStudent inside the database
        const response = await newStudent.save();
        console.log("data saved");
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// GET student details
router.get("/student", async (req, res) => {
    try {
        const data = await Student.find();
        console.log("data fetched");
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// PUT Update student details
router.put("/student/:id", upload.single('student_img'), async (req, res) => {
    try {
        const studentId = req.params.id;
        const updatedStudentData = req.body;

        if (req.file) {
            updatedStudentData.student_img = req.file.buffer.toString('base64');
        }

        const response = await Student.findByIdAndUpdate(
            studentId,
            updatedStudentData,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!response) {
            return res.status(404).json({ error: 'Student Data not found' });
        }

        console.log("data updated");
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// DELETE student
router.delete('/student/:id', async (req, res) => {
    try {
        const studentId = req.params.id;

        const response = await Student.findByIdAndDelete(studentId);
        if (!response) {
            return res.status(404).json({ error: 'Student not found' });
        }

        console.log('Student data deleted');
        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
