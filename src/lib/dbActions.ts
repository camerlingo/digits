
'use server';

import { Condition } from '@prisma/client';
import type { Stuff } from '@prisma/client';
import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';
import { auth } from './auth';

/**
 * Adds a new stuff item to the database.
 */
export async function addStuff(stuff: {
  name: string;
  quantity: number;
  owner: string;
  condition: string;
}) {
  let condition: Condition = 'good';

  if (stuff.condition === 'poor') {
    condition = 'poor';
  } else if (stuff.condition === 'excellent') {
    condition = 'excellent';
  } else {
    condition = 'fair';
  }

  await prisma.stuff.create({
    data: {
      name: stuff.name,
      quantity: stuff.quantity,
      owner: stuff.owner,
      condition,
    },
  });

  redirect('/list');
}

/**
 * Edits an existing stuff item.
 */
export async function editStuff(stuff: Stuff) {
  await prisma.stuff.update({
    where: { id: stuff.id },
    data: {
      name: stuff.name,
      quantity: stuff.quantity,
      owner: stuff.owner,
      condition: stuff.condition,
    },
  });

  redirect('/list');
}

/**
 * Deletes an existing stuff item.
 */
export async function deleteStuff(id: number) {
  await prisma.stuff.delete({
    where: { id },
  });

  redirect('/list');
}

/**
 * Creates a new user.
 */
export async function createUser(credentials: {
  email: string;
  password: string;
}) {
  const password = await hash(credentials.password, 10);

  await prisma.user.create({
    data: {
      email: credentials.email,
      password,
    },
  });
}

/**
 * Changes a user's password.
 */
export async function changePassword(credentials: {
  email: string;
  password: string;
}) {
  const password = await hash(credentials.password, 10);

  await prisma.user.update({
    where: { email: credentials.email },
    data: {
      password,
    },
  });
}

/**
 * Adds a new contact to the database.
 */
export async function addContact(contact: {
  firstName: string;
  lastName: string;
  address: string;
  image: string;
  description: string;
}) {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error('You must be logged in to add a contact.');
  }

  await prisma.contact.create({
    data: {
      firstName: contact.firstName,
      lastName: contact.lastName,
      address: contact.address,
      image: contact.image,
      description: contact.description,
      owner: session.user.email,
    },
  });

  redirect('/list');
}

/**
 * Edits an existing contact in the database.
 */
export async function editContact(contact: {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  image: string;
  description: string;
}) {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error('You must be logged in to edit a contact.');
  }

  const result = await prisma.contact.updateMany({
    where: {
      id: contact.id,
      owner: session.user.email,
    },
    data: {
      firstName: contact.firstName,
      lastName: contact.lastName,
      address: contact.address,
      image: contact.image,
      description: contact.description,
    },
  });

  if (result.count === 0) {
    throw new Error('Contact not found or access denied.');
  }

  redirect('/list');
}

export async function addNote(data: {
  note: string;
  contactId: number;
}) {
  const session = await auth();

  // Make sure the user is logged in.
  if (!session?.user?.email) {
    throw new Error('You must be logged in to add a note.');
  }

  // Make sure the contact belongs to this user.
  const contact = await prisma.contact.findFirst({
    where: {
      id: data.contactId,
      owner: session.user.email,
    },
  });

  if (!contact) {
    throw new Error('Contact not found or access denied.');
  }

  // Create the note in PostgreSQL.
  await prisma.note.create({
    data: {
      note: data.note,
      contactId: data.contactId,
      owner: session.user.email,
    },
  });

  redirect('/list');
}