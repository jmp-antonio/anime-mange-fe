import { Modal } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { Author } from '../../interfaces/Author';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Button } from 'flowbite-react';
import { Form, Formik } from 'formik';
import FormikControl from '../common/form/FormikControl';
import { save } from '../../services/authorServices';

type Props = {
    loadAuthorsTable: () => Promise<void>
}

const AddAuthor = ({ loadAuthorsTable }: Props) => {
    const [openModal, setOpenModal] = useState<boolean>(false);

    const [author, setAuthor] = useState<Author>({
        id: 0,
        first_name: "",
        last_name: "",
    });

    const validationSchema = Yup.object<{
        id?: string;
        first_name: string;
        last_name: string;
    }>({
        id: Yup.string(),
        first_name: Yup.string().required("Required"),
        last_name: Yup.string().required("Required"),
    });

    const onSubmit = async (values: Author) => {
        try {
            const { data: response } = await save(values);
            const { status, message } = response;
            if (status === "success") {
                toast.success(message);
                setOpenModal(false);
                loadAuthorsTable()
              
            }
        } catch (error) {
            console.error("Failed to save author:", error);
            toast.error("Failed to save author. Please try again.");
        }
    };
    

    return (
        <div className='row max-w flex justify-end mb-5'>
            <Button size='sm' onClick={() => setOpenModal(true)}>Create</Button>
            <Modal show={openModal} size="lg" popup onClose={() => setOpenModal(false)}>
                <Modal.Header />
                <Modal.Body>
                <div className="space-y-6">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Create</h3>
                    <Formik
                        initialValues={author}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                        enableReinitialize={true}
                    >
                    {(formik) => {
                        const { values } = formik;

                        return (
                            <Form className='grid grid-flow-row auto-rows-max'>
                                <div>
                                    <FormikControl
                                        control="input"
                                        type="text"
                                        label="First Name"
                                        name="first_name"
                                        value={values.first_name}
                                    />
                                </div>
                                <div>
                                    <FormikControl
                                        control="input"
                                        type="text"
                                        label="Last Name"
                                        name="last_name"
                                        value={values.last_name}
                                    />
                                </div>
                                <Button type="submit" className='mt-6' disabled={!formik.isValid}>Submit</Button>
                            </Form>
                        );
                    }}
                    </Formik>
                </div>
                </Modal.Body>
            </Modal>
        </ div>
    )
}

export default AddAuthor