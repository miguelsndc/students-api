const router = require('express').Router();
const Student = require('../../models/student');

router.get('/', async (_, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.json(error);
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;

  if (!id) res.status(400).json({ message: 'Id is not defined' });

  try {
    const student = await Student.findById(id);

    if (!student)
      res.status(404).json({
        message: 'The student with the given ID was not found.',
      });

    res.json(student);
  } catch (error) {
    res.json(error);
  }
});

router.post('/', async (req, res) => {
  const student = req.body;

  try {
    const newStudent = new Student(student);
    const savedStudent = await newStudent.save();

    res.status(200).json(savedStudent);
  } catch (error) {
    res.json(error);
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  if (!id) res.status(400).json({ message: 'Id is not defined' });

  try {
    await Student.findByIdAndDelete(id);
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.json(error);
  }
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;

  const student = req.body;

  if (!id) res.status(400).json({ message: 'Id is not defined' });

  try {
    await Student.findByIdAndUpdate(id, student);
    const updatedStudent = await Student.findById(id);

    res.status(200).json(updatedStudent);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
