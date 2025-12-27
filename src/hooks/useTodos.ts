import { useState, useCallback } from "react";
import { getAllTodos, createTodo, updateTodo, deleteTodo } from "../lib/todo/api";
import type { Todo } from "../lib/todo/types";

/**
 * Helper per estrarre il messaggio di errore da un errore sconosciuto
 */
function getErrorMessage(err: unknown, defaultMessage: string): string {
	return err instanceof Error ? err.message : defaultMessage;
}

export function useTodos() {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const loadTodos = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);
			const todosData = await getAllTodos();
			setTodos(todosData);
		} catch (err) {
			const errorMessage = getErrorMessage(err, "Errore sconosciuto");
			setError(errorMessage);
			console.error("Errore nel caricamento dei todo:", err);
		} finally {
			setLoading(false);
		}
	}, []);

	const addTodo = useCallback(async (title: string) => {
		try {
			const newId = await createTodo(title);
			setTodos((prevTodos) => [{ id: newId, title, completed: false }, ...prevTodos]);
			return newId;
		} catch (err) {
			throw new Error(getErrorMessage(err, "Errore nella creazione"));
		}
	}, []);

	const toggleTodo = useCallback(async (id: number, completed: boolean) => {
		// Aggiornamento ottimistico
		let previousTodos: Todo[] = [];
		setTodos((prevTodos) => {
			previousTodos = prevTodos;
			return prevTodos.map((todo) => (todo.id === id ? { ...todo, completed } : todo));
		});

		try {
			await updateTodo(id, completed);
		} catch (err) {
			// Rollback in caso di errore
			setTodos(previousTodos);
			throw new Error(getErrorMessage(err, "Errore nell'aggiornamento"));
		}
	}, []);

	const removeTodo = useCallback(async (id: number) => {
		// Aggiornamento ottimistico
		let previousTodos: Todo[] = [];
		setTodos((prevTodos) => {
			previousTodos = prevTodos;
			return prevTodos.filter((todo) => todo.id !== id);
		});

		try {
			await deleteTodo(id);
		} catch (err) {
			// Rollback in caso di errore
			setTodos(previousTodos);
			throw new Error(getErrorMessage(err, "Errore nell'eliminazione"));
		}
	}, []);

	return {
		todos,
		loading,
		error,
		loadTodos,
		addTodo,
		toggleTodo,
		removeTodo,
	};
}
