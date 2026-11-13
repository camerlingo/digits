
import { notFound } from 'next/navigation';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import EditContactForm from '@/components/EditContactForm';

/** Edit an existing contact. */
export default async function EditContactPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Get the contact ID from the URL.
  const { id } = await params;

  // Protect the page so only logged-in users can access it.
  const session = await auth();

  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; name: string };
    } | null,
  );

  // Convert the contact ID to a number.
  const editID = Number(id);

  if (!Number.isInteger(editID) || editID <= 0) {
    notFound();
  }

  // Get the contact belonging to the logged-in user.
  const contact = await prisma.contact.findFirst({
    where: {
      id: editID,
      owner: session?.user?.email ?? '',
    },
  });

  // Show a 404 page if the contact doesn't exist
  // or doesn't belong to the logged-in user.
  if (!contact) {
    notFound();
  }

  return (
    <main>
      <EditContactForm contact={contact} />
    </main>
  );
}
