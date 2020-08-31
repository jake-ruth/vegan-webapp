import React from 'react';
import { FaTimes } from 'react-icons/fa';

interface Props {
  visible: boolean;
  setVisible?: (value: boolean) => void;
  children?: any;
}

export const Modal = (props: Props) => {
  return (
    <div className={props.visible ? 'modal-background-active' : 'modal-background'}>
      <div className='modal'>
        {props.children}
        <span className='modal-close' onClick={() => props.setVisible && props.setVisible(false)}>
          <FaTimes />
        </span>
      </div>
    </div>
  );
};
