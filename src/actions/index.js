export function selectBook(book){
  console.log('A book has been selected ', book.title);
  // action always contains type and payload
  return {
    type: 'BOOK_SELECTED',
    payload: book
  };
}
