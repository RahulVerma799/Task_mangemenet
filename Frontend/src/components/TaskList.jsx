import React, { useEffect, useState } from "react";
import { getTasks, deleteTask } from "../services/taskService";
import { Button, Grid, Snackbar, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
      setSnackbarMessage("Task deleted successfully!");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ padding: "20px" }}>
      <h1>Task List</h1>

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/add-task")}
        sx={{ mb: 3 }}
      >
        Add Task
      </Button>

      <Grid container spacing={2} justifyContent="center" alignItems="stretch">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <Grid item xs={12} sm={6} md={4} key={task.id}>
              <TaskItem task={task} onEdit={() => navigate(`/edit-task/${task.id}`)} onDelete={handleDelete} />
            </Grid>
          ))
        ) : (
          <p>No tasks available. Add a new task!</p>
        )}
      </Grid>

      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)} message={snackbarMessage} />
    </Container>
  );
};

export default TaskList;
