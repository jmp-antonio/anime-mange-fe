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
import PageInfo from '../common/table/PageDetails';

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

    const onSort = (path: string) => {
        const newPageDetails = { ...pageDetails };

        if (path === newPageDetails.sort_by) {
            newPageDetails.sort_direction = newPageDetails.sort_direction === "asc" ? "desc" : "asc";
        } else {
            newPageDetails.sort_by = path;
            newPageDetails.sort_direction = "asc";
        }

        setPageDetails(newPageDetails);
        loadAuthorsTable(newPageDetails);
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
                    <AuthorsTable authors={authors} onEdit={handleEditClick} onDelete={handleDeleteClick} pageDetails={pageDetails} onSort={onSort} />
                    {authors.length > 0 &&
                        <PageInfo
                            current_page={pageDetails.current_page}
                            from={pageDetails.from || 0}
                            to={pageDetails.to || 0}
                            total={pageDetails.total || 0}
                            last_page={pageDetails.last_page || 0}
                            per_page={pageDetails.per_page}
                            pageChange={pageChange}
                        />}
                </div>
            </div>
        </>
  )
}

export default Authors