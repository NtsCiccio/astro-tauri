import { useState } from "react";
import type { FormEvent } from "react";

interface Props {
	onCreateTodo: (title: string) => void;
}

export default function TodoForm({ onCreateTodo }: Props) {
	const [title, setTitle] = useState("");

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (title.trim()) {
			onCreateTodo(title.trim());
			setTitle("");
		}
	};

	return (
		<div className="flex flex-col gap-2">
			<form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
				<input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Aggiungi un nuovo todo..."
					className="flex-1 rounded-lg border border-gray-800 bg-gray-900 px-4 py-3 text-sm text-gray-50 placeholder:text-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none sm:text-base"
					required
				/>
				<button
					type="submit"
					className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold whitespace-nowrap text-white shadow-lg shadow-indigo-500/20 transition-colors duration-200 hover:bg-indigo-700 active:bg-indigo-800 sm:text-base"
				>
					Aggiungi
				</button>
			</form>
		</div>
	);
}
