export const ContactListElem = ({ name, number, id, onDeleteContact }) => {
  return (
    <li key={id}>
      {name}: {number}{' '}
      <button type="button" onClick={() => onDeleteContact(id)}>
        Delete
      </button>
    </li>
  );
};
