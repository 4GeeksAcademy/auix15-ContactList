//para mostrar cada contacto



import React from "react";


const ContactCard = ({ contact, index, deleteContact }) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span>{contact.name}</span>
            <button className="btn btn-danger" onClick={() => deleteContact(index)} >Eliminar</button>
        </li>
    );
};

export default ContactCard;
