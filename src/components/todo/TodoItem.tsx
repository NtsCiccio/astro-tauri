import { memo } from "react";
import type { Todo } from "../../lib/todo/types";

interface Props {
	todo: Todo;
	onToggle: (id: number, completed: boolean) => void;
	onDelete: (id: number) => void;
}

function TodoItem({ todo, onToggle, onDelete }: Props) {
	return (
		<div className="flex items-center gap-3 rounded-lg border border-gray-800 bg-gray-900 p-4 transition-colors hover:border-gray-700">
			<input
				type="checkbox"
				id={`todo-${todo.id}`}
				checked={todo.completed}
				onChange={(e) => onToggle(todo.id, e.target.checked)}
				className="h-5 w-5 cursor-pointer rounded border-gray-700 bg-gray-800 text-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-0"
			/>
			<label
				htmlFor={`todo-${todo.id}`}
				className={`flex-1 cursor-pointer text-sm sm:text-base ${
					todo.completed ? "text-gray-500 line-through" : "text-gray-50"
				}`}
			>
				{todo.title}
			</label>
			<button
				type="button"
				onClick={(e) => {
					e.preventDefault();
					e.stopPropagation();
					onDelete(todo.id);
				}}
				className="rounded-lg bg-red-600 px-3 py-2 text-xs font-medium text-white shadow-lg shadow-red-500/20 transition-colors duration-200 hover:bg-red-700 active:bg-red-800 sm:text-sm"
				aria-label={`Elimina todo: ${todo.title}`}
			>
				Elimina
			</button>
		</div>
	);
}

export default memo(TodoItem);
