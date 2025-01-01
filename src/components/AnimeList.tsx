import React, { useEffect, useState, useRef } from 'react'
import { getAll, getById } from '../services/animeService';
import { PageDetails } from '../interfaces/PageDetails';
import { Anime } from '../interfaces/Anime';
import { Button, Card } from 'flowbite-react';
import EditAnime from './EditAnime';
import AddAnime from './AddAnime';
import DeleteAnime from './DeleteAnime';

interface AnimePageDetails extends PageDetails {
    title: string | null,
    author: string | null,
}

const AnimeList = () => {
    const [animes, setAnimes] = useState<Anime[]>([]);
    const [pageDetails, setPageDetails] = useState<AnimePageDetails>({
        current_page: 1,
        per_page: 10,
        title: null,
        author: null,
        sort_by: "title",
        sort_direction: "asc",
    });
    const isLoading = useRef(false);

    const loadAnimesTable = async () => {
        if (isLoading.current) return;
        isLoading.current = true;

        const { data } = await getAll(pageDetails);
        const {
            data: animes,
            current_page,
            last_page,
            per_page,
            from,
            to,
            total,
        } = data.data;

        setAnimes(animes);

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

    useEffect(() => {
        loadAnimesTable();
    }, []);

    /* 
        handle edit
    */
    const [anime, setAnime] = useState<Anime>({});
    const [openEditModal, setOpenEditModal] = useState<boolean>(false);
    
    const handleEditClick = async (id: number | undefined) => {
        const { data } = await getById(id);
        const { data: anime } = data;

        setAnime(anime);
        setOpenEditModal(true);
    }

    /* 
        handle delete
    */
    const [animeIdToDelete, setAnimeIdToDelete] = useState<number | undefined>();
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

    const handleDeleteClick = (id: number | undefined) => {
        setAnimeIdToDelete(id);
        setOpenDeleteModal(true);
    }
    

    return (
        <>
            <AddAnime loadAnimesTable={loadAnimesTable}/>    
            <EditAnime anime={anime} openEditModal={openEditModal} setOpenEditModal={setOpenEditModal} loadAnimesTable={loadAnimesTable}/>
            <DeleteAnime animeIdToDelete={animeIdToDelete} openDeleteModal={openDeleteModal} setOpenDeleteModal={setOpenDeleteModal} loadAnimesTable={loadAnimesTable} />
            <div className="grid grid-cols-3 gap-3">
                {animes.length > 0 ? (
                animes.map(anime => (
                    <div>
                        <Card key={anime.id} className="max-w">
                            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {anime.title}
                            </h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                Author: {anime.author?.full_name}
                            </p>
                            <div className='grid grid-cols-2 gap-2'>
                                <Button onClick={() => handleEditClick(anime.id)}>
                                    Edit
                                </Button>
                                <Button outline color='failure' onClick={() => handleDeleteClick(anime.id)}>
                                    Delete
                                </Button>
                            </div>
                        </Card>
                    </div>
                    ))) : 
                    <p>No animes available.</p>
                }
            </div>
        </>
    );
};

export default AnimeList