import React, { useEffect, useState, useRef } from 'react'
import { getAll, getById } from '../services/animeService';
import { PageDetails } from '../interfaces/PageDetails';
import { Anime } from '../interfaces/Anime';
import { Button, Card, Label, ListGroup, Table } from 'flowbite-react';
import EditAnime from './EditAnime';
import AddAnime from './AddAnime';
import DeleteAnime from './DeleteAnime';
import { IoMdAdd } from "react-icons/io";
import { MdDelete, MdEdit } from "react-icons/md";
import AddMangaLink from './AddMangaLink';
import DeleteMangaLink from './DeleteMangaLink';
import { MangaLink } from '../interfaces/MangaLink';
import { getMangaLinkById } from '../services/mangaLinkService';
import EditMangaLinks from './EditMangaLinks';
import PageInfo from './common/table/PageDetails';
import { navigatePage } from '../utils/tableUtils';

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

    const pageChange = (direction: string) => {
        const newPageDetails = navigatePage(pageDetails, direction);
        setPageDetails(newPageDetails);
        loadAnimesTable();
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

    /* 
        handle add manga link
    */
    const [animeIdAddMangaLink, setAnimeIdAddMangaLink] = useState<number | undefined>();
    const [openAddMangaLink, setOpenAddMangaLink] = useState<boolean>(false);

    const handleAddMangaClick = (id: number | undefined) => {
        setAnimeIdAddMangaLink(id);
        setOpenAddMangaLink(true);
    }

    /* 
        handle edit manga link
    */
    const [mangaLink, setMangaLink] = useState<MangaLink>({});
    const [openEditMangaLink, setOpenEditMangaLink] = useState<boolean>(false);
    
    const handleEditMangaLinkClick = async (id: number | undefined) => {
        const { data } = await getMangaLinkById(id);
        const { data: mangaLink } = data;

        setMangaLink(mangaLink);
        setOpenEditMangaLink(true);
    }

    /* 
        handle delete manga link
    */
    const [mangaLinkIdToDelete, setMangaLinkIdToDelete] = useState<number | undefined>();
    const [openDeleteMangaLinkModal, setOpenDeleteMangaLinkModal] = useState<boolean>(false);

    const handleDeleteMangaLinkClick = (id: number | undefined) => {
        setMangaLinkIdToDelete(id);
        setOpenDeleteMangaLinkModal(true);
    }

    return (
        <>
            {/* ANIME COMPONENTS */}
            <AddAnime loadAnimesTable={loadAnimesTable}/>    
            {openEditModal && <EditAnime anime={anime} openEditModal={openEditModal} setOpenEditModal={setOpenEditModal} loadAnimesTable={loadAnimesTable}/>}
            {openDeleteModal && <DeleteAnime animeIdToDelete={animeIdToDelete} openDeleteModal={openDeleteModal} setOpenDeleteModal={setOpenDeleteModal} loadAnimesTable={loadAnimesTable} />}
            
            {/* MANGA LINK COMPONENTS */}
            {openAddMangaLink && <AddMangaLink animeId={animeIdAddMangaLink} openMangaLinkModal={openAddMangaLink} setOpenAddMangaLinkModal={setOpenAddMangaLink} loadAnimesTable={loadAnimesTable} />}
            {openEditMangaLink && <EditMangaLinks mangaLink={mangaLink} openEditMangaLink={openEditMangaLink} setOpenEditMangaLink={setOpenEditMangaLink} loadAnimesTable={loadAnimesTable}/>}
            {openDeleteMangaLinkModal && <DeleteMangaLink mangaLinkIdToDelete={mangaLinkIdToDelete} openDeleteMangaLinkModal={openDeleteMangaLinkModal} setOpenDeleteMangaLinkModal={setOpenDeleteMangaLinkModal} loadAnimesTable={loadAnimesTable} />}
            
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
                            <div className="max-w">
                                <div className="flex justify-between">
                                    <Label>Manga Links: </Label>
                                    <Button outline size="xs" onClick={() => handleAddMangaClick(anime.id)}>
                                        <IoMdAdd />
                                    </Button>
                                </div>
                                {(anime.manga_links && anime.manga_links.length > 0) ? 
                                    <Table striped>
                                        <Table.Body className="divide-y">
                                            {anime.manga_links.map(link => (
                                                <Table.Row key={link.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                                    <Table.Cell className="whitespace-normal break-words font-medium text-gray-900 dark:text-white px-2 py-2">
                                                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:underline dark:text-cyan-500">
                                                            {link.url}
                                                        </a>
                                                    </Table.Cell>
                                                    <Table.Cell className='whitespace-nowrap flex justify-end py-2'>
                                                        <div className='flex space-x-2'>
                                                            <Button size="xs" onClick={() => handleEditMangaLinkClick(link.id)}>
                                                                <MdEdit />
                                                            </Button>
                                                            <Button size="xs" color='failure' onClick={() => handleDeleteMangaLinkClick(link.id)}>
                                                                <MdDelete />
                                                            </Button>
                                                        </div>
                                                    </Table.Cell>
                                                </Table.Row>
                                            ))}
                                        </Table.Body>
                                    </Table> :
                                    <div>
                                        <Label>
                                            No manga links found
                                        </Label>
                                    </div>
                                }
                            </div>
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
            {animes.length > 0 &&
                <PageInfo
                    current_page={pageDetails.current_page}
                    from={pageDetails.from || 0}
                    to={pageDetails.to || 0}
                    total={pageDetails.total || 0}
                    last_page={pageDetails.last_page || 0}
                    per_page={pageDetails.per_page}
                    pageChange={pageChange}
                />}
        </>
    );
};

export default AnimeList