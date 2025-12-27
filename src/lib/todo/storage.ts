import type { Todo } from "./types";

const STORAGE_KEY = "astro-tauri-todos";

/**
 * Verifica se Tauri è disponibile
 */
export function isTauriAvailable(): boolean {
	return typeof window !== "undefined" && "__TAURI_INTERNALS__" in window;
}

/**
 * Storage locale usando localStorage
 */
class LocalStorageAdapter {
	private getTodosFromStorage(): Todo[] {
		if (typeof window === "undefined") return [];
		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			return stored ? JSON.parse(stored) : [];
		} catch {
			return [];
		}
	}

	private saveTodosToStorage(todos: Todo[]): void {
		if (typeof window === "undefined") return;
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
		} catch (err) {
			console.error("Errore nel salvataggio in localStorage:", err);
		}
	}

	async getAllTodos(): Promise<Todo[]> {
		return this.getTodosFromStorage();
	}

	async createTodo(title: string): Promise<number> {
		const todos = this.getTodosFromStorage();
		const newId = todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1;
		const newTodo: Todo = { id: newId, title: title.trim(), completed: false };
		todos.unshift(newTodo); // Aggiungi all'inizio come in Tauri
		this.saveTodosToStorage(todos);
		return newId;
	}

	async updateTodo(id: number, completed: boolean): Promise<void> {
		const todos = this.getTodosFromStorage();
		const todo = todos.find((t) => t.id === id);
		if (!todo) {
			throw new Error(`Todo con id ${id} non trovato`);
		}
		todo.completed = completed;
		this.saveTodosToStorage(todos);
	}

	async deleteTodo(id: number): Promise<void> {
		const todos = this.getTodosFromStorage();
		const filtered = todos.filter((t) => t.id !== id);
		if (filtered.length === todos.length) {
			throw new Error(`Todo con id ${id} non trovato`);
		}
		this.saveTodosToStorage(filtered);
	}
}

export const localStorageAdapter = new LocalStorageAdapter();
