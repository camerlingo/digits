
import { Col, Container, Row } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { auth } from '@/lib/auth';
import ContactCard from '@/components/ContactCard';

/** Render contacts and their notes for the logged-in user. */
const ListPage = async () => {
  // Protect the page.
  const session = await auth();

  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; name: string };
    } | null,
  );

  // Get the logged-in user's email.
  const owner = session?.user?.email ?? '';

  // Get contacts from the database.
  const contacts = await prisma.contact.findMany({
    where: {
      owner,
    },
  });

  // Get notes belonging to the logged-in user.
  const notes = await prisma.note.findMany({
    where: {
      owner,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Row>
          <Col>
            <h2 className="text-center mb-4">
              List Contacts
            </h2>
          </Col>
        </Row>

        <Row xs={1} md={2} lg={3} className="g-4">
          {contacts.map((contact) => (
            <Col key={`Contact-${contact.id}`}>
              <ContactCard
                contact={contact}
                notes={notes.filter(
                  (note) => note.contactId === contact.id
                )}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </main>
  );
};

export default ListPage;