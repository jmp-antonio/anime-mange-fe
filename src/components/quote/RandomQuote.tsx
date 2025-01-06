import { Blockquote } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { getRandomQuote } from '../../services/randmonQuoteService';
import { Quote } from '../../interfaces/Quote';

const RandomQuote = () => {
  const [quote, setQuote] = useState<Quote>({
      content: "If you don't take risks, you can't create a future",
      anime: {
          id: 0,
          name: "One Piece",
          altName: ""
      },
      character: {
          id: 0,
          name: "Monkey D. Luffy"
      }
  });

  useEffect(() => {
    getQuote();
  }, []);

  const getQuote = async () => {
    let isFetching = false;

    const fetchQuote = async () => {
        if (isFetching) return;
        isFetching = true;

        try {
            const { data } = await getRandomQuote();
            setQuote({ ...data });
        } catch (error) {
            console.error('Error fetching quote:', error);
        } finally {
            isFetching = false;
            setTimeout(fetchQuote, 600000); // Schedule next fetch
        }
    };

    // Start the first fetch
    fetchQuote();
  };

  return (
    <figure className="max-w-screen text-center p-8 mb-8 bg-cyan-50">
      <Blockquote>
        <p className="text-2xl font-medium italic text-gray-900 dark:text-white">
          {quote.content}
        </p>
      </Blockquote>
      <figcaption className="mt-6 flex items-center justify-center space-x-3">
        <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
          <cite className="pr-3 font-medium text-gray-900 dark:text-white">{ quote.character.name }</cite>
          <cite className="pl-3 text-sm text-gray-500 dark:text-gray-400">{ quote.anime.name }</cite>
        </div>
      </figcaption>
    </figure>
  )
}

export default RandomQuote