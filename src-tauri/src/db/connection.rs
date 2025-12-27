use rusqlite::Connection;
use std::path::PathBuf;

pub fn open_db(path:  PathBuf) -> Result<Connection, rusqlite::Error> {
    Connection::open(path)
}