import React, { useEffect, useState, useRef } from 'react'
import { getAll } from '../services/animeService';
import { PageDetails } from '../interfaces/PageDetails';
import { Anime } from '../interfaces/Anime';
import { Button, Card } from 'flowbite-react';

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

    return (
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
                        <Button>
                            Read more
                        </Button>
                    </Card>
                  </div>
                ))) : 
                <p>No animes available.</p>
              }
        </div>
    );
};

export default AnimeList