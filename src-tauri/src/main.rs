// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod db;
mod errors;
mod models;
mod repositories;
mod services;
mod commands;

use std::sync::Mutex;
use db::connection::open_db;
use db::schema::create_todos_table;
use tauri::Manager;

pub struct AppState {
   pub conn: Mutex<rusqlite::Connection>,
}

fn main() {
  tauri::Builder::default().setup(|app|{
    let app_dir = app.path().app_data_dir().unwrap();
    std::fs::create_dir_all(&app_dir).ok();

    let db_path = app_dir.join("database.db");
    let conn = open_db(db_path).expect("Failed to open database");
    create_todos_table(&conn).expect("Failed to create todos table");

    app.manage(AppState { conn: Mutex::new(conn) });

    Ok(())
  }).invoke_handler(tauri::generate_handler![
    commands::todo::create_todo,
    commands::todo::get_todos,
    commands::todo::update_todo,
    commands::todo::delete_todo,
  ]).run(tauri::generate_context!())
  .expect("error while running tauri application");
}
