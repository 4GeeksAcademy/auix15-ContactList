const getState = ({ getStore, getActions, setStore }) => {
	return {
	  store: {
		contactsList: [],
		selectedContact: null,
	  },
	  actions: {
		fetchContacts: async () => {
		  try {
			const response = await fetch("https://playground.4geeks.com/contact/");
			const data = await response.json();
			setStore({ contactsList: data });
		} catch (error) {
			console.error("Error fetching contacts:", error);
		  } 
		},

		getAllContacts: async () => {
			const response = await fetch("https://playground.4geeks.com/contact/agendas/MiAgenda");
			const data = await response.json();
			setStore({ contactsList: data });
		},
  
		createNewContact: async (newContact) => {
		  try {
			const response = await fetch("https://playground.4geeks.com/contact/agendas/MiAgenda/contacts", {
			  method: "POST",
			  headers: {
				"Content-Type": "application/json",
			  },
			  body: JSON.stringify(newContact),
			});
			if (response.ok) {
			  getActions().fetchContacts();
			}
		  } catch (error) {
			console.error("Error creating contact:", error);
		  }
		},
  
		removeContact: async (id) => {
		  try {
			const response = await fetch(`https://playground.4geeks.com/contact/agendas/MiAgenda/contacts/${id}`, {
			  method: "DELETE",
			});
			if (response.ok) {
			  getActions().fetchContacts();
			}
		  } catch (error) {
			console.error("Error deleting contact:", error);
		  }
		},
  
		modifyContact: async (contact) => {
		  try {
			const response = await fetch(`https://playground.4geeks.com/contact/agendas/MiAgenda/contacts${contact.id}`, {
			  method: "PUT",
			  headers: {
				"Content-Type": "application/json",
			  },
			  body: JSON.stringify(contact),
			});
			if (response.ok) {
			  getActions().fetchContacts();
			}
		  } catch (error) {
			console.error("Error updating contact:", error);
		  }
		},
  
		chooseContactToEdit: (contact) => {
		  setStore({ selectedContact: contact });
		},
	  },
	};
  };
  
  export default getState;
  