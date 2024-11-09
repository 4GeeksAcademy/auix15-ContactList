import React, {useEffect, useState} from "react"
import { useContext } from "react"
import { Context } from "../store/appContext"
import getState from "../store/flux"

export const EditContact = ({ show, onClose, contact, onSave }) => {

    const { actions } = useContext(Context);
    const [formData, setFormData] = useState ({
        name: contact?.name || "",
        phone: contact?.phone || "",
        email: contact?.email || "",
        address: contact?.address || ""

    })

    useEffect(() => {
        setFormData({
        name: contact?.name || "",
        phone: contact?.phone || "",
        email: contact?.email || "",
        address: contact?.address || ""
        })
    }, [contact]);

    const handleChange = (e) => {
        const {name, value } = e.target;
        setFormData({...formData, [name]: value })
    }

    const handleSave =  () => {
        
         actions.modifyContact({...contact, ...formData});
        onClose();
    }


    return (
        <div className={`modal ${show ? "d-block" : "d-none"}`} tabIndex="-1">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Edit Contact</h5>
                    <button type="button" className="btn-close" onClick={onClose}></button>
                </div>
                <div className="modal-body">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Phone</label>
                            <input
                                type="text"
                                className="form-control"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Address</label>
                            <input
                                type="text"
                                className="form-control"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                    <button type="button" className="btn btn-success" onClick={handleSave}>Save Changes</button>
                </div>
            </div>
        </div>
    </div>
    )
}