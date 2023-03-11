import React from 'react'
import { centerItems } from '../../constants';
import { ContactType } from '../../types/ContactType';

export interface Props{
    height: string;
    width: string;
    contact: ContactType;
}

export const ContactColorShortcutElement = (props: Props) => {
    return (
      <div className={centerItems} style={{height: props.height, width: props.width, color: "white", borderRadius: "100%", backgroundColor: props.contact?.color}}>
          {props.contact?.prename.charAt(0)+props.contact?.lastname.charAt(0)}
      </div> 
    )

}
