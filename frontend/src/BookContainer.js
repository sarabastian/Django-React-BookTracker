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
import { IconButton, Input, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const BookContainer = () => {
  const [books, setBooks] = React.useState([]);
  // const [checked, changeCheck] = React.useState(false);
  const classes = useStyles();
  const [newTitle, setNewTitle] = React.useState("");
  const [newDescription, setNewDescription] = React.useState("");
  const [authorFirst, setNewAuthorFirst] = React.useState("");
  const [authorLast, setNewAuthorLast] = React.useState("");
  const [newAuthor, setNewAuthor] = React.useState({});

  useEffect(() => {
    fetch("http://localhost:2000/api/books/")
      .then((r) => r.json())
      .then((books) => setBooks(books));
  }, []);

  const handleReadChange = (book) => {
    fetch(`http://localhost:2000/api/books/${book.id}/`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        read: !book.read,
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

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const addAuthor = () => {
    fetch("http://localhost:2000/api/authors/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        first_name: authorFirst,
        last_name: authorLast,
      }),
    })
      .then((r) => r.json())
      .then((data) => setNewAuthor(data));
  };

  const addBook = (e) => {
    e.preventDefault();
    // addAuthor();
    fetch("http://localhost:2000/api/books/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title: newTitle,
        description: newDescription,
        read: false,
        author: { first_name: authorFirst, last_name: authorLast },
      }),
    })
      .then((r) => r.json())
      .then(() => refreshList());
    handleOpen();
  };

  const handleNewTitle = (e) => {
    setNewTitle(e.target.value);
  };

  const handleNewDesc = (e) => {
    setNewDescription(e.target.value);
  };

  const handleNewAuthorFirst = (e) => {
    setNewAuthorFirst(e.target.value);
  };

  const handleNewAuthorLast = (e) => {
    setNewAuthorLast(e.target.value);
  };

  // const author = {
  //   id: authorID,
  //   first_name: authorFirst,
  //   last_name: authorLast,
  // };
  console.log(newAuthor);
  return (
    <>
      <h2>Summer Reading List </h2>
      <IconButton onClick={handleOpen}>
        <AddIcon />
      </IconButton>
      {open ? (
        <form
          onSubmit={addBook}
          className={classes.root}
          noValidate
          autoComplete="off"
        >
          <div>
            <Input
              onChange={handleNewTitle}
              placeholder="Title"
              defaultValue=""
              inputProps={{ "aria-label": "description" }}
            />
          </div>
          <div>
            <Input
              onChange={handleNewDesc}
              placeholder="Description"
              defaultValue=""
              inputProps={{ "aria-label": "description" }}
            />
          </div>
          <div>
            <Input
              onChange={handleNewAuthorFirst}
              placeholder="Author First Name"
              defaultValue=""
              inputProps={{ "aria-label": "description" }}
            />
            <br></br>

            <Input
              onChange={handleNewAuthorLast}
              placeholder="Author Last Name"
              defaultValue=""
              inputProps={{ "aria-label": "description" }}
            />
          </div>
          <br></br> <button type="submit">Submit</button>
        </form>
      ) : null}
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
                handleReadChange={handleReadChange}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default BookContainer;
