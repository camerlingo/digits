
'use client';

import { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  AddNoteSchema,
  AddNoteFormValues,
} from '@/lib/validationSchemas';
import { addNote } from '@/lib/dbActions';

const AddNoteForm = ({
  contactId,
}: {
  contactId: number;
}) => {
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddNoteFormValues>({
    resolver: yupResolver(AddNoteSchema),
    defaultValues: {
      note: '',
      contactId,
    },
  });

  const onSubmit = async (data: AddNoteFormValues) => {
    setError('');

    try {
      await addNote({
        note: data.note,
        contactId,
      });
    } catch (err) {
      // Next.js redirects are thrown internally.
      if (
        err instanceof Error &&
        err.message.includes('NEXT_REDIRECT')
      ) {
        throw err;
      }

      setError('Unable to save note.');
    }
  };

  return (
    <Card className="mt-2">
      <Card.Header className="text-center">
        Add Timestamped Note
      </Card.Header>

      <Card.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-2">
            <Form.Label>Note</Form.Label>
            <Form.Control
              type="text"
              {...register('note')}
              isInvalid={!!errors.note}
            />
            <Form.Control.Feedback type="invalid">
              {errors.note?.message}
            </Form.Control.Feedback>
          </Form.Group>

          {error && (
            <p className="text-danger">{error}</p>
          )}

          <div className="d-flex justify-content-between">
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
            >
              Submit
            </Button>

            <Button
              type="button"
              variant="warning"
              onClick={() => reset()}
            >
              Reset
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddNoteForm;
