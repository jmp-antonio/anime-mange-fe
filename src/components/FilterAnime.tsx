import { Button, Drawer, Label, Textarea, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { IoFilter } from "react-icons/io5";
import * as Yup from 'yup';
import { Form, Formik } from "formik";
import FormikControl from "./common/form/FormikControl";
import { AnimePageDetails } from "../interfaces/AnimePageDetails";

type Props = {
    animePageDetials: AnimePageDetails,
    setPageDetails: React.Dispatch<React.SetStateAction<AnimePageDetails>>,
    loadAnimesTable: (animePageDetails: AnimePageDetails) => Promise<void>
}

const FilterAnime = ({animePageDetials, setPageDetails, loadAnimesTable} : Props) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => setIsOpen(false);

    const pageDetails: AnimePageDetails = {
        sort_by: animePageDetials.sort_by || "",
        sort_direction: animePageDetials.sort_direction || "asc",
        title: "",
        author: "",
        current_page: animePageDetials.current_page,
        per_page: animePageDetials.per_page,
    };

    const sortByOptions: {
        id: string,
        value: string
    }[] = [
        {id: "", value: "Choose..."},
        {id: "title", value: "title"},
        {id: "author", value: "author"},
    ] 
    
    const sortDirectionOptions: {
        id: string,
        value: string
    }[] = [
        {id: "asc", value: "asc"},
        {id: "desc", value: "desc"},
    ] 
    
    const validationSchema = Yup.object<{
        sort_by?: string;
        sort_direction: string;
        title?: string;
        author?: string;
    }>({
        sort_by: Yup.string(),
        sort_direction: Yup.string(),
        title: Yup.string(),
        author: Yup.string(),
    });

    const onSubmit = async (values: AnimePageDetails) => {
        const newPageDetails = {
            ...pageDetails,
            sort_by: values.sort_by,
            sort_direction: values.sort_direction,
            title: values.title,
            author: values.author,
        };
        
        setPageDetails(newPageDetails);
        await loadAnimesTable(newPageDetails);
    };

    return (
        <>
        <div>
            <Button onClick={() => setIsOpen(true)} color="light">Sort & Filter</Button>
        </div>
        <Drawer open={isOpen} onClose={handleClose}>
            <Drawer.Header title="Sort & Filter" titleIcon={IoFilter} />
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
                                        control="select"
                                        label="Sort By"
                                        name="sort_by"
                                        options={sortByOptions}
                                        optionText="value"
                                        value={values.sort_by}
                                    />
                                </div>
                                <div>
                                    <FormikControl
                                        control="select"
                                        label="Sort Direction"
                                        name="sort_direction"
                                        options={sortDirectionOptions}
                                        optionText="value"
                                        value={values.sort_direction}
                                    />
                                </div>
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
                                        control="input"
                                        type="text"
                                        label="Author"
                                        name="author"
                                        value={values.author}
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

export default FilterAnime;