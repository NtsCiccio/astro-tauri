use crate::models::todo::Todo;
use crate::errors::AppError;
use rusqlite::Connection;

pub trait ITodoRepository {
    fn create(&self, conn: &Connection, title: &str) -> Result<i32, AppError>;
    fn get_all(&self, conn: &Connection) -> Result<Vec<Todo>, AppError>;
    fn update_completed(&self, conn: &Connection, id: i32, completed: bool) -> Result<usize, AppError>;
    fn delete(&self, conn: &Connection, id: i32) -> Result<usize, AppError>;
}

pub struct TodoRepository;

impl ITodoRepository for TodoRepository {
    fn create(&self, conn: &Connection, title: &str) -> Result<i32, AppError> {
        conn.execute(
            "INSERT INTO todos (title, completed) VALUES (?1, ?2)",
            rusqlite::params![title, false],
        )?;
        Ok(conn.last_insert_rowid() as i32)
    }

    fn get_all(&self, conn: &Connection) -> Result<Vec<Todo>, AppError> {
        let mut stmt = conn.prepare("SELECT id, title, completed FROM todos ORDER BY id DESC")?;
        
        let todos = stmt
            .query_map([], |row| {
                Ok(Todo {
                    id: row.get("id")?,
                    title: row.get("title")?,
                    completed: row.get("completed")?,
                })
            })?
            .collect::<Result<Vec<_>, rusqlite::Error>>()?;
        
        Ok(todos)
    }

    fn update_completed(&self, conn: &Connection, id: i32, completed: bool) -> Result<usize, AppError> {
        let rows_affected = conn.execute(
            "UPDATE todos SET completed = ?1 WHERE id = ?2",
            rusqlite::params![completed, id],
        )?;
        Ok(rows_affected)
    }

    fn delete(&self, conn: &Connection, id: i32) -> Result<usize, AppError> {
        let rows_affected = conn.execute(
            "DELETE FROM todos WHERE id = ?1",
            rusqlite::params![id],
        )?;
        Ok(rows_affected)
    }
}
