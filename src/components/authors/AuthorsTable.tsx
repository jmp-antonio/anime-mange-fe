import { Table } from "flowbite-react";
import { Author } from "../../interfaces/Author";

type Props = {
  authors: Author[],
  onEdit: (id: number | undefined) => void,
  onDelete: (id: number | undefined) => void
}

const AuthorsTable = ({ authors, onEdit, onDelete } : Props) => {
  return (
    <div className="overflow-x-auto">
      <Table striped>
        <Table.Head>
          <Table.HeadCell className="bg-cyan-700 text-white">First Name</Table.HeadCell>
          <Table.HeadCell className="bg-cyan-700 text-white">Last Name</Table.HeadCell>
          <Table.HeadCell className="bg-cyan-700 text-white">Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {authors.map((author) => (
            <Table.Row key={author.id} className="bg-white text-black dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>
                    {author.first_name}
                </Table.Cell>
                <Table.Cell>{author.last_name}</Table.Cell>
                <Table.Cell>
                    <button
                        onClick={() => onEdit(author.id)}
                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    >
                    Edit
                    </button>
                    <button
                        onClick={() => onDelete(author.id)}
                        className="ml-2 font-medium text-red-600 hover:underline dark:text-red-500"
                    >
                    Delete
                    </button>
                </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default AuthorsTable;