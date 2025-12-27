export interface DeleteConfirmState {
	isOpen: boolean;
	todoId: number | null;
	todoTitle: string;
}

interface Props {
	isOpen: boolean;
	todoTitle: string;
	onConfirm: () => void;
	onCancel: () => void;
}

export default function DeleteConfirmDialog({ isOpen, todoTitle, onConfirm, onCancel }: Props) {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
			<div className="mx-4 w-full max-w-md rounded-lg border border-gray-800 bg-gray-900 p-6 shadow-xl">
				<h3 className="mb-4 text-lg font-semibold text-gray-50">Conferma eliminazione</h3>
				<p className="mb-6 text-gray-400">
					Sei sicuro di voler eliminare <strong className="text-gray-50">"{todoTitle}"</strong>?
				</p>
				<div className="flex justify-end gap-3">
					<button
						onClick={onCancel}
						className="rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-700"
					>
						Annulla
					</button>
					<button
						onClick={onConfirm}
						className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
					>
						Elimina
					</button>
				</div>
			</div>
		</div>
	);
}
