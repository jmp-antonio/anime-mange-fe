import { Table } from "flowbite-react";
import { Author } from "../../interfaces/Author";
import { AuthorPageDetails } from "../../interfaces/AuthorPageDetails";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";

type Props = {
  authors: Author[],
  onEdit: (id: number | undefined) => void,
  onDelete: (id: number | undefined) => void,
  pageDetails: AuthorPageDetails,
  onSort: (path: string) => void
}

const AuthorsTable = ({ authors, onEdit, onDelete, pageDetails, onSort }: Props) => {
  const { sort_by, sort_direction } = pageDetails;

  const renderSortArrow = (field: string) => {
    if (sort_by === field) {
      return <span className="ml-2">{sort_direction === "asc" ? "↑" : "↓"}</span>; // Up arrow for ascending, down arrow for descending
    }
    return null; // No arrow if not sorted by this field
  };

  return (
    <div className="overflow-x-auto">
      <Table striped>
        <Table.Head>
          <Table.HeadCell className="bg-cyan-700 text-white cursor-pointer" onClick={() => onSort("first_name")}>
            First Name {renderSortArrow("first_name")}
          </Table.HeadCell>
          <Table.HeadCell className="bg-cyan-700 text-white cursor-pointer" onClick={() => onSort("last_name")}>
            Last Name {renderSortArrow("last_name")}
          </Table.HeadCell>
          <Table.HeadCell className="bg-cyan-700 text-white">
            Actions
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {authors.map((author) => (
            <Table.Row key={author.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
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