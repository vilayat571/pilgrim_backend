const Questions = require("../models/questions.js");

const getAllquestions = async (req, res) => {
  try {
    let questions;

    const { page, limit } = await req.query;

    questions = await Questions.find({}, null, { skip:page, limit });

    return res.status(200).json({
      status: "OK",
      count: questions.length,

      data: questions,
    });
  } catch (error) {
    return res.status(409).json({
      status: "FAILED",
      message: error.message,
    });
  }
};

const getSinglequestion = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Questions.findById(id);
    return res.status(200).json({
      status: "OK",
      question: question,
    });
  } catch (error) {
    return res.status(409).json({
      status: "FAILED",
      message: error.message,
    });
  }
};

const addQuestion = async (req, res) => {
  try {
    const newQuestion = await Questions.create(req.body);

    return res.status(201).json({
      status: "OK",
      message: "Yeni sual əlavə edildi!",
      question: newQuestion,
    });
  } catch (error) {
    return res.status(409).json({
      status: "FAILED",
      message: error.message,
    });
  }
};

const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    await Questions.findByIdAndDelete(id);
    const questions = await Questions.find();
    return res.status(200).json({
      status: "OK",
      count: questions.length,
      questions: questions,
    });
  } catch (error) {
    return res.status(409).json({
      status: "FAILED",
      message: error.message,
    });
  }
};

module.exports = {
  addQuestion,
  getAllquestions,
  deleteQuestion,
  getSinglequestion,
};
