import React, {useState, useContext} from 'react';
import { EditText } from './EditText';
import { OneText } from './OneText';

export const Modal = (props) => {

    const click = (e) => {
        e.stopPropagation();
    }

    const close = () => {
        props.setContent('view');
        props.setModal(false);
    }

    return (
        <div className='Modal' onClick={close}>
            <div className='ModalContent' onClick={click}>
                <button className='openBTN' onClick={close}>
                    <p className='iconText'>
                        Sulje
                    </p>
                </button>
                {props.modalContent === 'edit' ?
                    <EditText 
                        t={props.t}
                        setContent={props.setContent}/>
                :
                    <OneText 
                        t={props.t}
                        setContent={props.setContent}
                        toggleEdit={props.toggleEdit}/>
                }
                <button className='openBTN' onClick={props.toggleView}>
                    <p className='iconText'>
                        Sulje
                    </p>
                </button>
            </div>
        </div>
    )
}