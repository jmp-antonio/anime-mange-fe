import React, { useState } from 'react'
import { MangaLink } from '../interfaces/MangaLink'
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Button, Modal } from 'flowbite-react';
import { Form, Formik } from 'formik';
import FormikControl from './common/form/FormikControl';
import { updateMangaLink } from '../services/mangaLinkService';

type Props = {
    mangaLink: MangaLink,
    openEditMangaLink: boolean,
    setOpenEditMangaLink: React.Dispatch<React.SetStateAction<boolean>>,
    loadAnimesTable: () => Promise<void>
}

const EditMangaLinks = ({mangaLink, openEditMangaLink, setOpenEditMangaLink, loadAnimesTable} : Props) => {
    const validationSchema = Yup.object<{
        id?: string;
        url: string;
        anime_id: number;
    }>({
        id: Yup.string(),
        url: Yup.string().required("Required"),
        anime_id: Yup.number().required("Required"),
    });

    const onSubmit = async (values: MangaLink) => {
        try {
            const { data: response } = await updateMangaLink(mangaLink.id, values);
            const { status, message } = response;
            if (status === "success") {
                toast.success(message);
                setOpenEditMangaLink(false);
                loadAnimesTable()
              
            }
        } catch (error) {
            console.error("Failed to save manga link:", error);
            toast.error("Failed to save manga link. Please try again.");
        }
    };
    
    return (
        <div className='row max-w flex justify-end mb-5'>
        <Modal show={openEditMangaLink} size="lg" popup onClose={() => setOpenEditMangaLink(false)}>
            <Modal.Header />
            <Modal.Body>
            <div className="space-y-6">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">Edit</h3>
                <Formik
                    initialValues={mangaLink}
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
                                    label="URL"
                                    name="url"
                                    value={values.url}
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

export default EditMangaLinks