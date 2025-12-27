interface Props {
	message?: string;
}

export default function LoadingSpinner({ message = "Caricamento..." }: Props) {
	return (
		<div className="py-12 text-center text-gray-500">
			<div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"></div>
			{message && <p className="mt-4 text-sm sm:text-base">{message}</p>}
		</div>
	);
}
