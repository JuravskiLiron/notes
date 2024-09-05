import { useEffect, useState } from "react";
import CreateNoteForm from "./components/CreateNoteForm";
import Note from "./components/Note";
import Filters from "./components/Filters";
import { createNote, deleteNote, fetchNotes, updateNote } from "./services/notes.js";
import EditNoteForm from "./components/EditNoteForm";

function App() {
	const [notes, setNotes] = useState([]);
	const [filter, setFilter] = useState({
		search: "",
		sortItem: "date",
		sortOrder: "desc",
	});
	const [editingNote, setEditingNote] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const notes = await fetchNotes(filter);
				setNotes(notes);
			} catch (error) {
				console.error("Failed to fetch notes:", error);
			}
		};

		fetchData();
	}, [filter]);

	const onCreate = async (note) => {
		try {
			await createNote(note);
			const notes = await fetchNotes(filter);
			setNotes(notes);
		} catch (error) {
			console.error("Failed to create note:", error);
		}
	};

	const onEdit = (id) => {
		const noteToEdit = notes.find(n => n.id === id);
		setEditingNote(noteToEdit);
	};

	const onDelete = async (id) => {
		try {
			await deleteNote(id);
			const notes = await fetchNotes(filter);
			setNotes(notes);
		} catch (error) {
			console.error("Failed to delete note:", error);
		}
	};

	const handleEditSubmit = async (updatedNote) => {
		try {
			await updateNote(updatedNote);
			const notes = await fetchNotes(filter);
			setNotes(notes);
			setEditingNote(null);
		} catch (error) {
			console.error("Failed to update note:", error);
		}
	};

	return (
		<section className="p-8 flex flex-row justify-start items-start gap-12">
			<div className="flex flex-col w-1/3 gap-10">
				<CreateNoteForm onCreate={onCreate} />
				<Filters filter={filter} setFilter={setFilter} />
				{editingNote && (
					<EditNoteForm note={editingNote} onSubmit={handleEditSubmit} />
				)}
			</div>

			<ul className="flex flex-col gap-5 w-1/2">
				{notes.map((n) => (
					<li key={n.id}>
						<Note
							id={n.id}
							title={n.title}
							description={n.description}
							createdAt={n.createdAt}
							onEdit={onEdit}
							onDelete={onDelete}
						/>
					</li>
				))}
			</ul>
		</section>
	);
}

export default App;
