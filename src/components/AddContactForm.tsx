
'use client';

import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  AddContactSchema,
  type AddContactFormValues,
} from '@/lib/validationSchemas';
import { addContact } from '@/lib/dbActions';

const AddContactForm = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddContactFormValues>({
    resolver: yupResolver(AddContactSchema),
  });

  const onSubmit = async (data: AddContactFormValues) => {
    try {
      setErrorMessage('');
      await addContact(data);
      reset();
      router.push('/list');
      router.refresh();
    } catch {
      setErrorMessage('Unable to save contact.');
    }
  };

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <h2 className="text-center">Add Contact</h2>

          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        {...register('firstName')}
                        isInvalid={!!errors.firstName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.firstName?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group>
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        {...register('lastName')}
                        isInvalid={!!errors.lastName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.lastName?.message}
                      </Form.Control.Feedback>
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
                      onClick={() => reset()}
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

export default AddContactForm;
