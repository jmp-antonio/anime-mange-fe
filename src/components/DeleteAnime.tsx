import React from 'react'
import { Button, Modal } from 'flowbite-react'
import { deleteAnime } from '../services/animeService'

type Props = {
    animeIdToDelete: number | undefined,
    openDeleteModal: boolean,
    setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>,
    loadAnimesTable: () => Promise<void>
}

const DeleteAnime = ({ animeIdToDelete, openDeleteModal, setOpenDeleteModal, loadAnimesTable }: Props) => {
    
    const handleDelete = async () => {
        await deleteAnime(animeIdToDelete);
        setOpenDeleteModal(false)
        loadAnimesTable();
    }

  return (
      <>
        <Modal show={openDeleteModal} size="md" onClose={() => setOpenDeleteModal(false)} popup>
            <Modal.Header />
            <Modal.Body>
            <div className="text-center">
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete this anime?
                </h3>
                <div className="flex justify-center gap-4">
                <Button color="failure" onClick={handleDelete}>
                    {"Yes, I'm sure"}
                </Button>
                <Button color="gray" onClick={() => setOpenDeleteModal(false)}>
                    No, cancel
                </Button>
                </div>
            </div>
            </Modal.Body>
        </Modal>
      </>
  )
}

export default DeleteAnime