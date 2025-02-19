import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Button, CardActions, Modal, Box } from "@mui/material";

const TaskItem = ({ task, onEdit, onDelete }) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [showTask, setShowTask] = useState(false);

  useEffect(() => {
    const savedStatus = JSON.parse(localStorage.getItem(`task-${task.id}`));
    if (savedStatus !== null) {
      setIsCompleted(savedStatus);
    }
  }, [task.id]);

  const toggleCompletion = () => {
    const newStatus = !isCompleted;
    setIsCompleted(newStatus);
    localStorage.setItem(`task-${task.id}`, JSON.stringify(newStatus));
  };

  return (
    <>
      <Card
        sx={{
          width: "100%",
          minHeight: 220,
          borderRadius: 4,
          boxShadow: 9,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: isCompleted
            ? "linear-gradient(to right, #d4edda, #c3e6cb)"
            : "linear-gradient(to right, #f9f9f9, #ffffff)",
          transition: "transform 0.2s ease-in-out",
          "&:hover": { transform: "scale(1.03)" },
        }}
      >
        <CardContent sx={{ flex: 1, overflow: "hidden" }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: isCompleted ? "#155724" : "#333",
              textDecoration: isCompleted ? "line-through" : "none",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {task.title}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{
              mt: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              textDecoration: isCompleted ? "line-through" : "none",
            }}
          >
            {task.description}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "space-between", padding: "12px" }}>
          <Button
            size="small"
            variant="contained"
            color={isCompleted ? "success" : "secondary"}
            onClick={toggleCompletion}
            sx={{ borderRadius: 2, height: 40 }}
          >
            {isCompleted ? "Mark Incomplete" : "Mark Complete"}
          </Button>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={onEdit}
            sx={{ borderRadius: 2, height: 40 }}
            disabled={isCompleted}
          >
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            color="error"
            onClick={() => onDelete(task.id)}
            sx={{ borderRadius: 2, height: 40 }}
          >
            Delete
          </Button>
          <Button
            size="small"
            variant="contained"
            color="info"
            onClick={() => setShowTask(true)}
            sx={{ padding: 2, borderRadius: 2, height: 40 }}
          >
            Show Task
          </Button>
        </CardActions>
      </Card>

      <Modal open={showTask} onClose={() => setShowTask(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            maxHeight: 300,
            bgcolor: "background.paper",
            boxShadow: 40,
            p: 4,
            borderRadius: 2,
            overflowY: "auto",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, wordWrap: "break-word" }}>
            {task.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              whiteSpace: "pre-line",
              wordWrap: "break-word",
            }}
          >
            {task.description}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setShowTask(false)}
            sx={{ mt: 2 }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default TaskItem;
