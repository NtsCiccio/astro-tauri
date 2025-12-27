import { invoke } from "@tauri-apps/api/core";
import type { Todo } from "./types";
import { isTauriAvailable, localStorageAdapter } from "./storage";

/**
 * API unificata per i Todo che usa Tauri se disponibile, altrimenti localStorage
 */
export async function getAllTodos(): Promise<Todo[]> {
	if (isTauriAvailable()) {
		try {
			return await invoke<Todo[]>("get_todos");
		} catch (err) {
			console.warn("Errore con Tauri, fallback a localStorage:", err);
			return localStorageAdapter.getAllTodos();
		}
	}
	return localStorageAdapter.getAllTodos();
}

export async function createTodo(title: string): Promise<number> {
	if (isTauriAvailable()) {
		try {
			return await invoke<number>("create_todo", { title });
		} catch (err) {
			console.warn("Errore con Tauri, fallback a localStorage:", err);
			return localStorageAdapter.createTodo(title);
		}
	}
	return localStorageAdapter.createTodo(title);
}

export async function updateTodo(id: number, completed: boolean): Promise<void> {
	if (isTauriAvailable()) {
		try {
			return await invoke<void>("update_todo", { id, completed });
		} catch (err) {
			console.warn("Errore con Tauri, fallback a localStorage:", err);
			return localStorageAdapter.updateTodo(id, completed);
		}
	}
	return localStorageAdapter.updateTodo(id, completed);
}

export async function deleteTodo(id: number): Promise<void> {
	if (isTauriAvailable()) {
		try {
			return await invoke<void>("delete_todo", { id });
		} catch (err) {
			console.warn("Errore con Tauri, fallback a localStorage:", err);
			return localStorageAdapter.deleteTodo(id);
		}
	}
	return localStorageAdapter.deleteTodo(id);
}
