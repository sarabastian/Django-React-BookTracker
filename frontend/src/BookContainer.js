import React, { useEffect } from "react";
import Book from "./Book";
import "./BookContainer.css";
import { makeStyles } from "@material-ui/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const BookContainer = () => {
  const [books, setBooks] = React.useState([]);
  const [checked, changeCheck] = React.useState(false);

  useEffect(() => {
    fetch("http://localhost:2000/api/books/")
      .then((r) => r.json())
      .then((books) => setBooks(books));
  }, []);

  const handleChange = (book) => {
    changeCheck(!checked);
    fetch(`http://localhost:2000/api/books/${book.id}/`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: book.title,
        description: book.description,
        read: !checked,
      }),
    })
      .then((r) => r.json())
      .then((r) => refreshList());
  };

  const refreshList = () => {
    fetch("http://localhost:2000/api/books/")
      .then((r) => r.json())
      .then((books) => setBooks(books));
  };

  const classes = useStyles();

  return (
    <>
      <h2>Book Reading List </h2>
      <TableContainer component={Paper} className="container">
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Title</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="right">Author</TableCell>
              <TableCell align="right">Read?</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <Book
                book={book}
                key={book.title}
                checked={checked}
                handleChange={handleChange}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default BookContainer;
