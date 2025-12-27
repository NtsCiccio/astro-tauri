use crate::models::todo::{Todo, CreateTodoDto, UpdateTodoDto};
use crate::repositories::todo_repository::{ITodoRepository, TodoRepository};
use crate::errors::AppError;
use rusqlite::Connection;

pub struct TodoService {
    repository: Box<dyn ITodoRepository>,
}

impl TodoService {
    pub fn new() -> Self {
        Self {
            repository: Box::new(TodoRepository),
        }
    }

    pub fn create_todo(&self, conn: &Connection, dto: CreateTodoDto) -> Result<i32, AppError> {
        dto.validate().map_err(AppError::Validation)?;
        self.repository.create(conn, dto.title.trim())
    }

    pub fn get_all_todos(&self, conn: &Connection) -> Result<Vec<Todo>, AppError> {
        self.repository.get_all(conn)
    }

    pub fn update_todo(
        &self,
        conn: &Connection,
        id: i32,
        dto: UpdateTodoDto,
    ) -> Result<(), AppError> {
        let rows_affected = self.repository.update_completed(conn, id, dto.completed)?;
        if rows_affected == 0 {
            return Err(AppError::NotFound(format!("Todo with id {} not found", id)));
        }
        Ok(())
    }

    pub fn delete_todo(&self, conn: &Connection, id: i32) -> Result<(), AppError> {
        let rows_affected = self.repository.delete(conn, id)?;
        if rows_affected == 0 {
            return Err(AppError::NotFound(format!("Todo with id {} not found", id)));
        }
        Ok(())
    }
}

