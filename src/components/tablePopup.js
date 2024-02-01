import React, { useState } from "react";
import PopupUsers from "./popupUsers";

const TablePopup = (props) => {
    const { setDocument, documents
    } = props
    const [isEditPopupOpen, setEditPopupOpen] = useState(false);
    const [documentSelection, setidocumentSelection] = useState();

    const deleteDocument = (idDoc) => {
        const data = documents.filter((document) => document.idDoc !== idDoc);
        setDocument(data);
        setEditPopupOpen(false);
        setidocumentSelection(null);
    }

    const openEditPopup = (document) => {
        setidocumentSelection(document);
        setEditPopupOpen(true);
    };

    return (
        <>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Type</th>
                                    <th scope="col">NRO</th>
                                    <th scope="col">Actions</th>
                                    <th scope="col"><PopupUsers
                                        setDocument={setDocument}
                                        documents={documents}
                                        documentSelection={documentSelection}
                                        setidocumentSelection={setidocumentSelection}
                                        setEditPopupOpen={setEditPopupOpen}
                                        isOpen={isEditPopupOpen}
                                    /></th>
                                </tr>
                            </thead>
                            <tbody>
                                {documents.map((documents) => (
                                    <tr key={documents.idDoc}>
                                        <td>{documents.type}</td>
                                        <td>{documents.nro}</td>
                                        <td>
                                            <div class="d-flex justify-content-between">
                                                <button class="btn btn-success" onClick={() => openEditPopup(documents)} >Edit</button>
                                                <button class="btn btn-danger" onClick={() => deleteDocument(documents.idDoc)}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TablePopup
    ;
