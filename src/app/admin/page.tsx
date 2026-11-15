
import { Col, Container, Row } from 'react-bootstrap';
import ContactCardAdmin from '@/components/ContactCardAdmin';
import { prisma } from '@/lib/prisma';
import { adminProtectedPage } from '@/lib/page-protection';
import { auth } from '@/lib/auth';

/** Render all contacts and their notes for administrators. */
const AdminPage = async () => {
  // Protect the page so only admins can access it.
  const session = await auth();

  adminProtectedPage(
    session as {
      user: { email: string; id: string; name: string };
    } | null,
  );

  // Retrieve all contacts and their associated notes.
  const contacts = await prisma.contact.findMany({
    include: {
      notes: {
        orderBy: {
          createdAt: 'asc',
        },
      },
    },
  });

  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Row>
          <Col>
            <h2 className="text-center mb-4">
              List Contacts (Admin)
            </h2>
          </Col>
        </Row>

        <Row xs={1} md={2} lg={3} className="g-4">
          {contacts.map((contact) => (
            <Col key={`Contact-${contact.id}`}>
              <ContactCardAdmin
                contact={contact}
                notes={contact.notes}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </main>
  );
};

export default AdminPage;
