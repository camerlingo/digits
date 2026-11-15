
'use client';

import { Card, Image, ListGroup } from 'react-bootstrap';
import type { Contact, Note } from '@prisma/client';
import Link from 'next/link';
import NoteItem from '@/components/NoteItem';
import AddNoteForm from '@/components/AddNoteForm';

const ContactCard = ({
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
      <Card.Text>
        {contact.description}
      </Card.Text>

      {/* Display notes associated with this contact */}
      <ListGroup variant="flush">
        {notes.map((note) => (
          <NoteItem key={note.id} note={note} />
        ))}
      </ListGroup>

      {/* Form to add a new timestamped note */}
      <AddNoteForm contactId={contact.id} />
    </Card.Body>

    <Card.Footer>
      <Link href={`/edit/${contact.id}`}>
        Edit
      </Link>
    </Card.Footer>
  </Card>
);

export default ContactCard;
