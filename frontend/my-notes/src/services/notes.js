import axios from "axios";

const backApi = "http://localhost:5003/notes";

export const fetchNotes = async (filter) => {
  try {
    const response = await axios.get(backApi, {
      params: {
        search: filter?.search,
        sortItem: filter?.sortItem,
        sortOrder: filter?.sortOrder,
      },
    });
    return response.data.notes;
  } catch (e) {
    console.error(e);
  }
};


export const createNote = async (note) => {
	try {
		const response = await axios.post(backApi, note);
		return response.status;
	} catch (e) {
		console.error(e);
	}
};

export const updateNote = async (note) => {
	try {
		const response = await axios.patch(`${backApi}/${note.id}`, note);
		return response.status;
	} catch (e) {
		console.error(e);
	}
};

export const deleteNote = async (id) => {
  try {
    const response = await axios.delete(`${backApi}/${id}`);
    return response.status;
  } catch (e) {
    console.error(e);
  }
};



