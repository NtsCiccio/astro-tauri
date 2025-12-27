use crate::AppState;
use crate::models::todo::{Todo, CreateTodoDto, UpdateTodoDto};
use crate::services::TodoService;
use crate::errors::AppError;
use tauri::State;

macro_rules! get_connection {
    ($state:expr) => {
        $state.conn.lock()
            .map_err(|e| AppError::Internal(format!("Failed to acquire database lock: {}", e)))?
    };
}

#[tauri::command]
pub fn create_todo(state: State<AppState>, title: String) -> Result<i32, String> {
    let conn = get_connection!(state);
    let service = TodoService::new();
    let dto = CreateTodoDto { title };
    service.create_todo(&conn, dto).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn get_todos(state: State<AppState>) -> Result<Vec<Todo>, String> {
    let conn = get_connection!(state);
    let service = TodoService::new();
    service.get_all_todos(&conn).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn update_todo(
    state: State<AppState>,
    id: i32,
    completed: bool,
) -> Result<(), String> {
    let conn = get_connection!(state);
    let service = TodoService::new();
    let dto = UpdateTodoDto { completed };
    service.update_todo(&conn, id, dto).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn delete_todo(state: State<AppState>, id: i32) -> Result<(), String> {
    let conn = get_connection!(state);
    let service = TodoService::new();
    service.delete_todo(&conn, id).map_err(|e| e.to_string())
}
