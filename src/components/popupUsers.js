import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { v4 as uuidv4 } from 'uuid';
import '../css/App.css';

const PopupUsers = (props) => {
    const { setDocument, documents, isOpen, onClose, documentSelection, setidocumentSelection, setEditPopupOpen
    } = props
    const { register, handleSubmit, reset } = useForm();
    const [typeDocumentSelection, setTypeDocumentSelection] = useState('');
    const typesDocument = ['Cedula de ciudadania', 'Licencia de conduccion', 'Pasaporte'];

    useEffect(() => {
        getDocument();
    }, [documentSelection]);

    const getDocument = () => {
        if (documentSelection) {
            const selectedDocument = documents.find(doc => doc.idDoc === documentSelection.idDoc);
            reset(selectedDocument);
        } else {
            reset({
                type: "",
                nro: ""
            });
        }
    }

    const onSubmit = async (data) => {
        if (!documentSelection) {
            await createDocument(data);
        } else {
            await updateDocument(data);
        }
    }

    const createDocument = async (data) => {
        const typeDocument = documents.find((typeAndNro) => typeAndNro.type === data.type && typeAndNro.nro === data.nro);
        if (!typeDocument) {
            const newDocument = {
                idDoc: uuidv4(),
                type: data.type,
                nro: data.nro
            }
            setDocument((prevDocument) => [...prevDocument, newDocument]);
            reset();
        } else {
            console.log(`El tipo de documento ${data.type}, y el nro ${data.nro} ya existen`)
        }
    }

    const updateDocument = async (data) => {
        const updatedDocuments = documents.map((document) =>
            document.idDoc === documentSelection.idDoc ? { ...document, ...data } : document
        );
        setDocument(updatedDocuments);
        setidocumentSelection(null);
    }

    const handleDocumentoChange = (event) => {
        setTypeDocumentSelection(event.target.value);
    };

    const closeEditPopup = () => {
        setEditPopupOpen(false);
        setidocumentSelection(null);
    };

    return (
        <Popup
            trigger={<button className="btn btn-primary">+</button>}
            open={isOpen} 
            modal
            closeOnDocumentClick={false}>
            {close => (
                <div className="popup-content w-100">
                    <button className="close-button btn btn-danger" onClick={() => { closeEditPopup(); close(reset({type:'', nro: ''})); }}>
                        &times;
                    </button>
                    <form>
                        <h1 className="modal-title">Type of Documents</h1>
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="type">Type</label>
                                <select
                                    name="type"
                                    className="form-control"
                                    value={typeDocumentSelection}
                                    {...register('type')}
                                    onChange={handleDocumentoChange}
                                >
                                    <option value="" disabled>Selecciona un documento</option>
                                    {typesDocument.map((documento, index) => (
                                        <option key={index} value={documento}>
                                            {documento}
                                        </option>
                                    ))}
                                </select>
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
                        </div>
                        <div className="modal-footer">
                            <button type="button"
                                className="btn btn-secondary"
                                style={{ marginRight: '10px' }}
                                onClick={() => { closeEditPopup(); close(reset({type:'', nro: ''})); }}
                            >Cancel</button>
                            <button type="submit"
                                className="btn btn-info btn-block"
                                onClick={(e) => {
                                    handleSubmit(onSubmit)(e);
                                    closeEditPopup();close();
                                }}
                            >Send</button>
                        </div>
                    </form>
                </div>
            )}
        </Popup>
    );
}

export default PopupUsers;
