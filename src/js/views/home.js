import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const Home = () => {
	const { store, actions } = useContext(Context);
	const [currentContact, setCurrentContact] = useState(null);
	const [isEditing, setEditing] = useState(false); // Corrección de la variable

	const navigate = useNavigate();

	const removeContact = (id) => {
		actions.removeContact(id); // Cambiar a removeContact
	};

	const editContact = (contact) => {
		setCurrentContact(contact);
		actions.chooseContactToEdit(contact); // Cambiar a chooseContactToEdit
		navigate("/EditContact");
	};

	const saveUpdate = async (contact) => {
		setEditing(true); // Corrección de la variable
		await actions.modifyContact(contact); // Cambiar a modifyContact
		setCurrentContact(null);
		setEditing(false); // Corrección de la variable
	};

	useEffect(() => {
		actions.fetchContacts(); // Cambiar a fetchContacts
	}, []);

	return (
		<>
			<div className="home-container">
				<div className="card-container">
					{store.contactsList && store.contactsList.length > 0 && store.contactsList.map((contact, index) => (
						<div key={index} className="contact-row">
							<img
								src="https://via.placeholder.com/100"
								className="contact-avatar"
								alt="Contact Avatar"
							/>
							<div className="contact-details">
								<h5 className="contact-title">{contact.name}</h5>
								<p className="contact-info">{contact.address}</p>
								<p className="contact-info">{contact.phone}</p>
								<p className="contact-info">{contact.email}</p>
							</div>
							<div className="action-icons">
								<FontAwesomeIcon
									icon={faEdit}
									className="action-icon edit"
									onClick={() => editContact(contact)} // Cambiar a editContact
								/>
								<FontAwesomeIcon
									icon={faTrashAlt}
									className="action-icon delete"
									onClick={() => removeContact(contact.id)} // Cambiar a removeContact
								/>
							</div>
						</div>
					))}
				</div>
			</div>
			{/* Modal para editar el contacto */}
			{isEditing && ( // Cambiar a isEditing
				<div className="modal-background">
					<div className="modal-box">
						<h3>Edit Contact</h3>
						<input
							type="text"
							value={currentContact?.name || ""}
							onChange={(e) => setCurrentContact({ ...currentContact, name: e.target.value })}
						/>
						<input
							type="text"
							value={currentContact?.address || ""}
							onChange={(e) => setCurrentContact({ ...currentContact, address: e.target.value })}
						/>
						<input
							type="text"
							value={currentContact?.phone || ""}
							onChange={(e) => setCurrentContact({ ...currentContact, phone: e.target.value })}
						/>
						<input
							type="email"
							value={currentContact?.email || ""}
							onChange={(e) => setCurrentContact({ ...currentContact, email: e.target.value })}
						/>
						<button onClick={() => saveUpdate(currentContact)}>Update</button>
						<button onClick={() => setCurrentContact(null)}>Cancel</button>
					</div>
				</div>
			)}
		</>
	);
};

export default Home;
