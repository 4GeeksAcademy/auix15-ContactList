import React from "react";
import { Link } from "react-router-dom";


export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<Link to="/">
			<button className="navbar-button">Mis contactos</button>
			</Link>
			<div className="ml-auto">
			<Link to="/addcontact">
					<button className="navbar-button" >Add contact</button>
				</Link>
			</div>
		</nav>
	);
};
