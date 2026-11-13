import AddContactForm from '@/components/AddContactForm';
import { auth } from '@/lib/auth';
import { loggedInProtectedPage } from '@/lib/page-protection';

const AddPage = async () => {
  const session = await auth();

  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; name: string };
    } | null,
  );

  return (
    <main>
      <AddContactForm />
    </main>
  );
};

export default AddPage;