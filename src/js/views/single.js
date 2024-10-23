//detalle de cada contacto


import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Single = () => {
	const { store } = useContext(Context);
	const params = useParams();
	const contact = store.contacts[params.theid];

	return (
		<div className="jumbotron">
			<h1 className="display-4">Contacto: {contact.name}</h1>
			<p>Teléfono: {contact.phone}</p>
			<p>Email: {contact.email}</p>

			<Link to="/">
				<span className="btn btn-primary btn-lg">Volver a la lista</span>
			</Link>
		</div>
	);
};
