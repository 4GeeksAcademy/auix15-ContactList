import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import { EditContact } from "./editContact";

const Home = () => {
	const { store, actions } = useContext(Context);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedContact, setSelectedContact] =useState(null);

    const handleEditClick = (contact) => {
        selectedContact(contact);
        setIsModalOpen(true);
    }
	
	useEffect(() => {
		actions.fetchContacts(); 
        console.log("ESTOS SON MIS CONTATOS", store.contactsList);
        
	}, []);

	return (
		<div>
			<div className="home-container">
                
				<div className="card-container">
                
                {store.contactsList && store.contactsList.length > 0 && store.contactsList.map((contact, index) => (
						<div key={index} className="contact-row">
							<div className="contac-image">
							<img 
                				src={contact.image || `https://ui-avatars.com/api/?name=${contact.name.split(' ')[0][0]}${contact.name.split(' ')[1] ? contact.name.split(' ')[1][0] : ''}&background=random&color=fff`} 
                				alt={`${contact.name}`} 
           					 />
							</div>
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
									onClick={() => actions.chooseContactToEdit(contact)} 
								/>
								<FontAwesomeIcon
									icon={faTrashAlt}
									className="action-icon delete"
									onClick={() => actions.removeContact(contact.id)} 
								/>
							</div>
						</div>
					))}
				</div>
			</div>
			{/*Modal para editar contacto */}
            {isModalOpen && 
            <editContact
            show={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            contact={selectedContact}
            />
            }
		</div>
	);
};

export default Home;
