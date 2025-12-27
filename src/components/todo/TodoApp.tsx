import { useEffect, useState, useCallback } from "react";
import { useTodos } from "../../hooks/useTodos";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import DeleteConfirmDialog, { type DeleteConfirmState } from "./DeleteConfirmDialog";
import LoadingSpinner from "./LoadingSpinner";

const initialDeleteConfirm: DeleteConfirmState = {
	isOpen: false,
	todoId: null,
	todoTitle: "",
};

export default function TodoApp() {
	const { todos, loading, error, loadTodos, addTodo, toggleTodo, removeTodo } = useTodos();
	const [deleteConfirm, setDeleteConfirm] = useState<DeleteConfirmState>(initialDeleteConfirm);

	useEffect(() => {
		loadTodos();
	}, [loadTodos]);

	/**
	 * Helper per gestire gli errori e mostrare un alert
	 */
	const handleError = useCallback((err: unknown, defaultMessage: string) => {
		const message = err instanceof Error ? err.message : defaultMessage;
		alert(message);
	}, []);

	const handleCreateTodo = useCallback(
		async (title: string) => {
			try {
				await addTodo(title);
			} catch (err) {
				handleError(err, "Errore nella creazione");
			}
		},
		[addTodo, handleError],
	);

	const handleToggleTodo = useCallback(
		async (id: number, completed: boolean) => {
			try {
				await toggleTodo(id, completed);
			} catch (err) {
				handleError(err, "Errore nell'aggiornamento");
			}
		},
		[toggleTodo, handleError],
	);

	const handleDeleteClick = useCallback(
		(id: number) => {
			const todo = todos.find((t) => t.id === id);
			if (todo) {
				setDeleteConfirm({
					isOpen: true,
					todoId: id,
					todoTitle: todo.title,
				});
			}
		},
		[todos],
	);

	const handleDeleteConfirm = useCallback(async () => {
		const id = deleteConfirm.todoId;
		if (!id) return;

		setDeleteConfirm(initialDeleteConfirm);

		try {
			await removeTodo(id);
		} catch (err) {
			handleError(err, "Errore nell'eliminazione");
		}
	}, [deleteConfirm.todoId, removeTodo, handleError]);

	const handleDeleteCancel = useCallback(() => {
		setDeleteConfirm(initialDeleteConfirm);
	}, []);

	return (
		<>
			<div className="flex flex-col gap-6">
				<TodoForm onCreateTodo={handleCreateTodo} />
				{loading ? (
					<LoadingSpinner />
				) : error ? (
					<div className="py-12 text-center text-red-500">
						<p className="text-sm sm:text-base">Errore: {error}</p>
						<button
							onClick={loadTodos}
							className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-white transition-colors hover:bg-indigo-700"
						>
							Riprova
						</button>
					</div>
				) : (
					<TodoList todos={todos} onToggle={handleToggleTodo} onDeleteClick={handleDeleteClick} />
				)}
			</div>

			<DeleteConfirmDialog
				isOpen={deleteConfirm.isOpen}
				todoTitle={deleteConfirm.todoTitle}
				onConfirm={handleDeleteConfirm}
				onCancel={handleDeleteCancel}
			/>
		</>
	);
}
