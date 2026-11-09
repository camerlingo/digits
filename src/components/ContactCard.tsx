
'use client';

import { Card, Image } from 'react-bootstrap';
import type { Contact } from '@/lib/validationSchemas';

const ContactCard = ({ contact }: { contact: Contact }) => (
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
    </Card.Body>
  </Card>
);

export default ContactCard;
