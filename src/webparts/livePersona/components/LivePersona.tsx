import * as React from 'react';

import type { ILivePersonaProps } from './ILivePersonaProps';

import { LivePersona } from '@pnp/spfx-controls-react/lib/LivePersona';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import { GraphError,ResponseType } from '@microsoft/microsoft-graph-client';
import { useState ,useEffect} from 'react';
import { Link, Persona, PersonaSize } from '@fluentui/react';
const LivePersonaU:React.FC<ILivePersonaProps>=(props)=>{
  const [name,setName]=useState<string>('');
  const [mail,setMail]=useState<string>('');
  const [phone,setPhone]=useState<string>('');
  const [image,setImage]=useState<string>('');

useEffect(()=>{
  props.graphClient.api('me')
  .get((err:GraphError,user:MicrosoftGraph.User)=>{
    if(!err){
      setName(user.displayName||''),
      setMail(user.mail||''),
      setPhone(user.businessPhones?.[0]||'')
    }
  });
  props.graphClient.api('me/photo/$value')
  .responseType(ResponseType.BLOB)
  .get((err:GraphError,photoResponse:Blob)=>{
    const bloburl=URL.createObjectURL(photoResponse);
    setImage(bloburl);
  });

},[props.graphClient]);

//onredner email

const renderEmail=():JSX.Element|null=>{
  return mail?<Link href={`mailto:${mail}`}>{mail}</Link>:<div/>
}

//render phone
const renderPhone=():JSX.Element=>{
  return phone?<Link href={`tel:${phone}`}>{phone}</Link>:<div/>
}
  return(
    <>
    <LivePersona upn={mail}

    template={<>
      <Persona
      text={name}
      secondaryText={mail}
      onRenderSecondaryText={renderEmail}
      tertiaryText={phone}
      onRenderTertiaryText={renderPhone}
      imageUrl={image}
      size={PersonaSize.size100}
      />
    </>}
   
   serviceScope={props.context.serviceScope}
   />

   
      
  
  
    
    </>
  )
}
export default LivePersonaU;
