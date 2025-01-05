import React, { useEffect, useRef, useState } from 'react'
import { Author } from '../../interfaces/Author';
import { AuthorPageDetails } from '../../interfaces/AuthorPageDetails';
import { getAll, getById } from '../../services/authorServices';
import { navigatePage } from '../../utils/tableUtils';
import AuthorsTable from './AuthorsTable';
import AddAuthor from './AddAuthor';
import { Button } from 'flowbite-react';
import EditAuthor from './EditAuthor';
import DeleteAuthor from './DeleteAuthor';

const Authors = () => {
    const [authors, setAuthors] = useState<Author[]>([]);
    const [pageDetails, setPageDetails] = useState<AuthorPageDetails>({
        current_page: 1,
        per_page: 10,
        first_name: null,
        last_name: null,
        sort_by: "first_name",
        sort_direction: "asc",
    });
    const isLoading = useRef(false);

    const loadAuthorsTable = async (newPageDetails?: AuthorPageDetails) => {
        if (isLoading.current) return;
        isLoading.current = true;
        
        const detailsToUse = newPageDetails || pageDetails;

        const { data } = await getAll(detailsToUse);
        const {
            data: authors,
            current_page,
            last_page,
            per_page,
            from,
            to,
            total,
        } = data.data;

        setAuthors(authors);

        setPageDetails(prev => ({
            ...prev,
            current_page: current_page !== undefined ? current_page : prev.current_page,
            last_page: last_page !== undefined ? last_page : prev.last_page,
            per_page: per_page !== undefined ? per_page : prev.per_page,
            from: from !== undefined ? from : prev.from,
            to: to !== undefined ? to : prev.to,
            total: total !== undefined ? total : prev.total,
        }));

        isLoading.current = false;
    };

    const pageChange = (direction: string) => {
        const newPageDetails = navigatePage(pageDetails, direction);
        setPageDetails(newPageDetails);
        loadAuthorsTable();
    };

    useEffect(() => {
        loadAuthorsTable();
    }, []);


    /* 
        handle edit
    */
    const [author, setAuthor] = useState<Author>({});
    const [openEditModal, setOpenEditModal] = useState<boolean>(false);
    
    const handleEditClick = async (id: number | undefined) => {
        const { data } = await getById(id);
        const { data: author } = data;

        setAuthor(author);
        setOpenEditModal(true);
    }

    /* 
        handle delete
    */
    const [authorIdToDelete, setAuthorIdToDelete] = useState<number | undefined>();
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

    const handleDeleteClick = (id: number | undefined) => {
        setAuthorIdToDelete(id);
        setOpenDeleteModal(true);
    }

    return (
        <>
            <div className='flex justify-between'>
                <Button>Button</Button>
                {/* <FilterAnime animePageDetials={pageDetails} setPageDetails={setPageDetails} loadAnimesTable={loadAnimesTable}/> */}
                <AddAuthor loadAuthorsTable={loadAuthorsTable}/>    
            </div>
            {openEditModal && <EditAuthor author={author} openEditModal={openEditModal} setOpenEditModal={setOpenEditModal} loadAuthorsTable={loadAuthorsTable}/>}
            {openDeleteModal && <DeleteAuthor authorIdToDelete={authorIdToDelete} openDeleteModal={openDeleteModal} setOpenDeleteModal={setOpenDeleteModal} loadAuthorsTable={loadAuthorsTable} />}

            <div className='flex justify-center my-5'>
                <div className="w-full max-w-8xl">
                        <AuthorsTable authors={authors} onEdit={handleEditClick} onDelete={handleDeleteClick} />
                </div>
            </div>
        </>
  )
}

export default Authors