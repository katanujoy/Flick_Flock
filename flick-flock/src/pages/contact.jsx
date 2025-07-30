import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, Button, Card } from 'react-bootstrap';
import Swal from 'sweetalert2';

const ContactForm = () => {
  const initialValues = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    subject: Yup.string(),
    message: Yup.string().required('Required')
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await fetch('http://localhost:5000/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });

      if (response.ok) {
        const data = await response.json();
        Swal.fire({
          icon: 'success',
          title: 'Message Sent',
          text: 'Your message has been received!',
        });
        resetForm();
      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: errorData?.errors
            ? JSON.stringify(errorData.errors)
            : 'Failed to send message.',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Network Error',
        text: 'Unable to reach the server. Try again later.',
      });
    }
  };

  return (
    <Container className="py-5">
      <Card className="p-4 shadow">
        <h3 className="mb-3 text-center text-primary">Contact Us</h3>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          <Form>
            <div className="mb-3">
              <label>Name</label>
              <Field name="name" className="form-control" />
              <ErrorMessage name="name" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label>Email</label>
              <Field name="email" type="email" className="form-control" />
              <ErrorMessage name="email" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label>Subject</label>
              <Field name="subject" className="form-control" />
            </div>

            <div className="mb-3">
              <label>Message</label>
              <Field name="message" as="textarea" className="form-control" rows="5" />
              <ErrorMessage name="message" component="div" className="text-danger" />
            </div>

            <Button type="submit" variant="primary" className="w-100">Send Message</Button>
          </Form>
        </Formik>
      </Card>
    </Container>
  );
};

export default ContactForm;