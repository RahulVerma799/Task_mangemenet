import React, { useState, useEffect } from "react";
import { addTask, updateTask, getTask } from "../services/taskService";
import { Button, TextField, Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const TaskForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (id) {
      fetchTaskData();
    }
  }, [id]);

  const fetchTaskData = async () => {
    try {
      const response = await getTask(id);
      setTitle(response.data.title);
      setDescription(response.data.description);
    } catch (error) {
      console.error("Error fetching task:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = { title, description };

    try {
      if (id) {
        await updateTask(id, taskData);
      } else {
        await addTask(taskData);
      }
      navigate("/");
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <h2>{id ? "Update Task" : "Add Task"}</h2>
      <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} required multiline rows={4} />
      <Button type="submit" variant="contained" color="primary">
        {id ? "Update Task" : "Add Task"}
      </Button>
    </Box>
  );
};

export default TaskForm;
