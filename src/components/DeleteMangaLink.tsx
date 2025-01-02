import { Button, Modal } from 'flowbite-react'
import React from 'react'
import { deleteMangaLink } from '../services/mangaLinkService'
import { toast } from 'react-toastify'


type Props = {
    mangaLinkIdToDelete: number | undefined,
    openDeleteMangaLinkModal: boolean,
    setOpenDeleteMangaLinkModal: React.Dispatch<React.SetStateAction<boolean>>,
    loadAnimesTable: () => Promise<void>
}

const DeleteMangaLink = ({ mangaLinkIdToDelete, openDeleteMangaLinkModal, setOpenDeleteMangaLinkModal, loadAnimesTable }: Props) => {
    
    const handleDelete = async () => {
        const { data } = await deleteMangaLink(mangaLinkIdToDelete);
        const { message } = data;
        toast.success(message);
        setOpenDeleteMangaLinkModal(false)
        loadAnimesTable();
    }

  return (
      <>
        <Modal show={openDeleteMangaLinkModal} size="md" onClose={() => setOpenDeleteMangaLinkModal(false)} popup>
            <Modal.Header />
            <Modal.Body>
            <div className="text-center">
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete this manga link?
                </h3>
                <div className="flex justify-center gap-4">
                <Button color="failure" onClick={handleDelete}>
                    {"Yes, I'm sure"}
                </Button>
                <Button color="gray" onClick={() => setOpenDeleteMangaLinkModal(false)}>
                    No, cancel
                </Button>
                </div>
            </div>
            </Modal.Body>
        </Modal>
      </>
  )
}

export default DeleteMangaLink