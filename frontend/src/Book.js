import React from "react";
import { TableCell, TableRow, Checkbox } from "@material-ui/core";

const Book = ({ book, handleReadChange }) => {
  return (
    <TableRow key={book.title}>
      <TableCell component="th" scope="row">
        {book.title}
      </TableCell>
      <TableCell align="center">{book.description}</TableCell>
      <TableCell align="right">
        {book.author.first_name} {book.author.last_name}
      </TableCell>
      <TableCell align="right">
        {book.read ? (
          <Checkbox
            checked
            onChange={() => handleReadChange(book)}
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        ) : (
          <Checkbox
            onChange={() => handleReadChange(book)}
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        )}
      </TableCell>
    </TableRow>
  );
};

export default Book;
