const Axios = require("axios");
const express = require("express");
const router = express.Router();

function returnAxiosInstance() {
  const instance = Axios.create({
    baseURL: "https://jsonplaceholder.typicode.com/",
  });
  return instance;
}

router.get("/todos", async (req, res) => {
  const axios = returnAxiosInstance();
  try{
  const result = await axios.get("https://jsonplaceholder.typicode.com/todos");
  const response = result.data;
  const newResponse = response.map((response) => ({
    id: response.id,
    title: response.title,
    completed: response.completed,
  }));
  res.json(newResponse).status(200);
}
catch(error){
res.json("Some Error occured").status(400);
}});

router.get("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const axios = returnAxiosInstance();
  try {
    const todosResult = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    const response = todosResult.data;
    const newResponse = response.filter(function (response) {
      return response.userId == userId;
    });
    const result = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    const userDetails = result.data;
    userDetails.todos = [...newResponse];
    res.json(userDetails).status(200);
  } catch (error) {
    res.json("Error Check UserId").status(400);
  }
});

module.exports = router;