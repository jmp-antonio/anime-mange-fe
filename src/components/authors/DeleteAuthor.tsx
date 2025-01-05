import { Button } from 'flowbite-react'
import React from 'react'
import { deleteAuthor } from '../../services/authorServices'
import { toast } from 'react-toastify'
import { Modal } from 'flowbite-react'

type Props = {
    authorIdToDelete: number | undefined,
    openDeleteModal: boolean,
    setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>,
    loadAuthorsTable: () => Promise<void>
}

const DeleteAuthor = ({ authorIdToDelete, openDeleteModal, setOpenDeleteModal, loadAuthorsTable }: Props) => {
    
    const handleDelete = async () => {
        const { data } = await deleteAuthor(authorIdToDelete);
        const { message } = data;
        toast.success(message);
        setOpenDeleteModal(false)
        loadAuthorsTable();
    }

  return (
      <>
        <Modal show={openDeleteModal} size="md" onClose={() => setOpenDeleteModal(false)} popup>
            <Modal.Header />
            <Modal.Body>
            <div className="text-center">
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete this author? This will also delete author's animes.
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

export default DeleteAuthor