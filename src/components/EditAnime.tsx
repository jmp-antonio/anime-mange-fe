import React, { useEffect, useState } from 'react'
import { Anime } from '../interfaces/Anime';
import { Author } from '../interfaces/Author';
import * as Yup from 'yup';
import { getOptions } from '../services/authorServices';
import { Button, Modal } from 'flowbite-react';
import { Form, Formik } from 'formik';
import FormikControl from './common/form/FormikControl';
import { update } from '../services/animeService';
import { toast } from 'react-toastify';

type Props = {
    anime: Anime,
    openEditModal: boolean,
    setOpenEditModal: React.Dispatch<React.SetStateAction<boolean>>,
    loadAnimesTable: () => Promise<void>
}

const EditAnime = ({anime, openEditModal, setOpenEditModal, loadAnimesTable} : Props) => {

    const [authorOptions, setAuthorOptions] = useState<Author[]>([]);

    const validationSchema = Yup.object<{
        id?: string;
        title: string;
        author_id: number;
    }>({
        id: Yup.string(),
        title: Yup.string().required("Required"),
        author_id: Yup.number().required("Required"),
    });

    const onSubmit = async (values: Anime) => {
        try {
            const { data: response } = await update(anime.id, values);
            const { status, message } = response;
            if (status === "success") {
                toast.success(message);
                setOpenEditModal(false);
                loadAnimesTable()
            }
        } catch (error) {
            console.error("Failed to update anime:", error);
            toast.error("Failed to update anime. Please try again.");
        }
    };
    
    useEffect(() => {
        loadForm()
    }, []);
    
    const loadForm = async () => {
        const {data} = await getOptions();
        const { data: options } = data;
        setAuthorOptions([{id: undefined, first_name: "", last_name: "", full_name: "Choose..."},...options]);

    }

  return (
    <div className='row max-w flex justify-end mb-5'>
      <Modal show={openEditModal} size="lg" popup onClose={() => setOpenEditModal(false)}>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Edit</h3>
            <Formik
              initialValues={anime}
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
                                label="Title"
                                name="title"
                                value={values.title}
                            />
                        </div>
                        <div>
                            <FormikControl
                                control="select"
                                label="Author"
                                name="author_id"
                                options={authorOptions}
                                optionText="full_name"
                                value={values.author_id}
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

export default EditAnime