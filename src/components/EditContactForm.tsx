
'use client';

import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  EditContactSchema,
  type EditContactFormValues,
} from '@/lib/validationSchemas';
import { editContact } from '@/lib/dbActions';

const EditContactForm = ({
  contact,
}: {
  contact: EditContactFormValues;
}) => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditContactFormValues>({
    resolver: yupResolver(EditContactSchema),
    defaultValues: contact,
  });

  const onSubmit = async (data: EditContactFormValues) => {
    try {
      setErrorMessage('');
      await editContact(data);
      router.push('/list');
      router.refresh();
    } catch {
      setErrorMessage('Unable to update contact.');
    }
  };

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <h2 className="text-center">Edit Contact</h2>

          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <input type="hidden" {...register('id')} />

                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        {...register('firstName')}
                        isInvalid={!!errors.firstName}
                      />
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group>
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        {...register('lastName')}
                        isInvalid={!!errors.lastName}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        {...register('address')}
                        isInvalid={!!errors.address}
                      />
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group>
                      <Form.Label>Image</Form.Label>
                      <Form.Control
                        {...register('image')}
                        isInvalid={!!errors.image}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    {...register('description')}
                    isInvalid={!!errors.description}
                  />
                </Form.Group>

                {errorMessage && (
                  <p className="text-danger">{errorMessage}</p>
                )}

                <Row className="pt-3">
                  <Col>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Submit
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      variant="warning"
                      type="button"
                      onClick={() => reset(contact)}
                    >
                      Reset
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditContactForm;
