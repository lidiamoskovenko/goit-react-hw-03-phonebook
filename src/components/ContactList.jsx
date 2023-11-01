
const ContactList = ({ contacts, handleDeleteContact }) => (
    <ul style={{ paddingLeft:'0px'}}>
      {contacts.map((contact) => (
          <li key={contact.id} style={{marginBottom:'15px', display:'flex', alignItems:'baseline'}}>
          {contact.name}: {contact.number}
          <button type="button" onClick={()=>handleDeleteContact(contact.id)} style={{ borderRadius: '30px', border:'1px solid black',marginLeft:'10px' }}>Delete</button>
        </li>
      ))}
    </ul>
  );
  
  export default ContactList;