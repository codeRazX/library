# Your Library

## Description

**My Library** is a project created for *The Odin Project* course. It’s a simple yet powerful library system that allows users to manage their personal book collection. With this library, you can add, edit, delete, and view books, all through an easy-to-use interface.

The initial library comes with a few **default books** to get you started. These books can be deleted, edited, or used as a base to add new books.

You can add books by filling out a form that includes fields such as:

- Title
- Author
- Number of pages
- Year of publication
- Genre
- Whether you have read the book or not
- Description

Additionally, each book you add will automatically include the date it was saved to the library. Once a book is created, you can click on it to view all the information you've entered.

## Features

- **Add books** to your library with multiple fields.
- **Edit book details** after they are added.
- **Delete books** from the library.
- **Clear the entire library** with a single click.
- **Sort books alphabetically** by title.
- **Filter books** based on various criteria such as:
  - Title
  - Genre
  - Year of publication
  - Page count
  - Author
  - Read status

This allows you to easily organize and search through your book collection based on specific attributes.

## Limitations (Current Version)

- **No local storage**: In this version, books are not saved locally or in a database. If you refresh the page or close the browser, the library will be empty.
  
- **No persistent storage**: Since the books are not saved to a database or local storage, all changes made during a session will be lost once the page is refreshed or closed.

## Technologies Used

- HTML
- CSS
- JavaScript

## Future Features

In the future, I plan to implement local storage or a backend database to persist the book data. This will allow users to save their books and access them even after refreshing or revisiting the site.
