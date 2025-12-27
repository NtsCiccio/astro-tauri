import { memo } from "react";
import type { Todo } from "../../lib/todo/types";
import TodoItem from "./TodoItem";

interface Props {
	todos: Todo[];
	onToggle: (id: number, completed: boolean) => void;
	onDeleteClick: (id: number) => void;
}

function TodoList({ todos, onToggle, onDeleteClick }: Props) {
	if (todos.length === 0) {
		return (
			<div className="py-12 text-center text-gray-500">
				<p className="text-sm sm:text-base">Nessun todo. Aggiungine uno per iniziare!</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-3">
			{todos.map((todo) => (
				<TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDeleteClick} />
			))}
		</div>
	);
}

export default memo(TodoList);
