import React, { useState } from 'react'
import { AuthorPageDetails } from '../../interfaces/AuthorPageDetails'
import * as Yup from 'yup'
import { Drawer } from 'flowbite-react'
import { Button } from 'flowbite-react'
import { Form, Formik } from 'formik'
import { IoFilter } from 'react-icons/io5'
import FormikControl from '../common/form/FormikControl'

type Props = {
    authorPageDetails: AuthorPageDetails,
    setPageDetails: React.Dispatch<React.SetStateAction<AuthorPageDetails>>,
    loadAuthorsTable: (animePageDetails: AuthorPageDetails) => Promise<void>
}

const FilterAuthor = ({authorPageDetails, setPageDetails, loadAuthorsTable} : Props) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => setIsOpen(false);

    const pageDetails: AuthorPageDetails = {
        sort_by: authorPageDetails.sort_by || "",
        sort_direction: authorPageDetails.sort_direction || "asc",
        first_name: "",
        last_name: "",
        current_page: authorPageDetails.current_page,
        per_page: authorPageDetails.per_page,
    };

    const validationSchema = Yup.object<{
        first_name?: string;
        last_name?: string;
    }>({
        first_name: Yup.string(),
        last_name: Yup.string(),
    });

    const onSubmit = async (values: AuthorPageDetails) => {
        const newPageDetails = {
            ...pageDetails,
            first_name: values.first_name,
            last_name: values.last_name,
        };
        
        setPageDetails(newPageDetails);
        await loadAuthorsTable(newPageDetails);
    };

    return (
        <>
        <div>
            <Button onClick={() => setIsOpen(true)} color="light">Filter</Button>
        </div>
        <Drawer open={isOpen} onClose={handleClose}>
            <Drawer.Header title="Filter" titleIcon={IoFilter} />
            <Drawer.Items>
                <Formik
                    initialValues={pageDetails}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                    enableReinitialize={true}
                    >
                    {(formik) => {
                        const { values } = formik;

                        return (
                            <Form className='grid grid-flow-row auto-rows-max space-y-4'>
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
            </Drawer.Items>
        </Drawer>
        </>
    );
}

export default FilterAuthor