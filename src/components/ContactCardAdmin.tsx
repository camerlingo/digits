
'use client';

import { Card, Image, ListGroup } from 'react-bootstrap';
import type { Contact, Note } from '@prisma/client';
import NoteItem from '@/components/NoteItem';

const ContactCardAdmin = ({
  contact,
  notes,
}: {
  contact: Contact;
  notes: Note[];
}) => (
  <Card className="h-100">
    <Card.Header>
      <Image
        src={contact.image}
        alt={`${contact.firstName} ${contact.lastName}`}
        width={75}
      />

      <Card.Title>
        {contact.firstName} {contact.lastName}
      </Card.Title>

      <Card.Subtitle>
        {contact.address}
      </Card.Subtitle>
    </Card.Header>

    <Card.Body>
      <Card.Text>{contact.description}</Card.Text>

      {/* Display notes associated with this contact */}
      <ListGroup variant="flush">
        {notes.map((note) => (
          <NoteItem key={note.id} note={note} />
        ))}
      </ListGroup>

      {/* Display the contact owner */}
      <p className="blockquote-footer mt-3">
        {contact.owner}
      </p>
    </Card.Body>
  </Card>
);

export default ContactCardAdmin;