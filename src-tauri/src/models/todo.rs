use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Todo {
    pub id: i32,
    pub title: String,
    pub completed: bool,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CreateTodoDto {
    pub title: String,
}

impl CreateTodoDto {
    pub fn validate(&self) -> Result<(), String> {
        let title = self.title.trim();
        if title.is_empty() {
            return Err("Title cannot be empty".to_string());
        }
        if title.len() > 255 {
            return Err("Title cannot exceed 255 characters".to_string());
        }
        Ok(())
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct UpdateTodoDto {
    pub completed: bool,
}

