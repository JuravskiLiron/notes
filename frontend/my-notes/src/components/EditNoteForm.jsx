import { useState } from "react";
import { Button, Input, VStack } from "@chakra-ui/react";

export default function EditNoteForm({ note, onSubmit }) {
	const [title, setTitle] = useState(note.title);
	const [description, setDescription] = useState(note.description);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const updatedNote = {
			...note,
			title,
			description,
		};
		await onSubmit(updatedNote);
	};

	return (
		<form onSubmit={handleSubmit}>
			<VStack spacing={4}>
				<Input
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Title"
				/>
				<Input
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					placeholder="Description"
				/>
				<Button colorScheme="blue" type="submit">
					Save
				</Button>
			</VStack>
		</form>
	);
}
