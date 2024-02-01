import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';
import PopupUsers from "./popupUsers";

const TableUsers = (props) => {
    const {setDocument, documents
          } = props
    const { register, handleSubmit, reset } = useForm();
    const [idDocumentSelection, setidDocumentSelection] = useState();

    const onSubmit = async (data) => {
        if (!idDocumentSelection) {
            await createDocument(data);
        } else {
            await updateDocument(data);
        }
    };

    const createDocument = async (data) => {
        const newDocument = {
            idDoc: uuidv4(),
            type: data.type,
            nro: data.nro
        }
        setDocument((prevDocument) => [...prevDocument, newDocument]);
        reset();
    }

    const updateDocument = async (data) => {
        const updatedDocuments = documents.map((document) =>
            document.idDoc === idDocumentSelection ? { ...document, ...data } : document
        );
        setDocument(updatedDocuments);
        setidDocumentSelection(null);
        reset({
            nro: '',
            type: ''
        });
    }

    const getDocument = async (document) => {
        reset(document);
        setidDocumentSelection(document.idDoc);
    }

    const deleteDocument = (idDoc) => {
        const data = documents.filter((document) => document.idDoc !== idDoc);
        setDocument(data);
    }

    return (
        <>
            <div className="container mt-5">
                <div className="row justify-content-center">
                   <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <PopupUsers/>
                                    <h1 className="text-center mb-4">Type of Documents</h1>
                                    <div className="form-group">
                                        <label htmlFor="type">Type</label>
                                        <input
                                            type="text"
                                            name="type"
                                            id="type"
                                            className="form-control"
                                            {...register('type')}
                                            required
                                        ></input>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="nro">NRO</label>
                                        <input
                                            type="text"
                                            name="nro"
                                            id="nro"
                                            className="form-control"
                                            {...register('nro')}
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-info btn-block mt-3">Send</button>
                                </form>
                            </div>
                        </div>
                    </div> 
                    <div className="col-md-8">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Type</th>
                                    <th scope="col">NRO</th>
                                    <th scope="col">Actions</th>
                                    <th scope="col"><PopupUsers setDocument={setDocument} documents={documents}/></th>
                                </tr>
                            </thead>
                            <tbody>
                                {documents.map((documents) => (
                                    <tr key={documents.idDoc}>
                                        <td>{documents.type}</td>
                                        <td>{documents.nro}</td>
                                        <td>
                                            <div class="d-flex justify-content-between">
                                                <button class="btn btn-success" onClick={() => getDocument(documents)}>Edit</button>
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

export default TableUsers;
