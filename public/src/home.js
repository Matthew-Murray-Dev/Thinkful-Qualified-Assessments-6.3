function getTotalBooksCount(books) {
  return books.length;
}//array.length to count number of book objects in books array

function getTotalAccountsCount(accounts) {
  return accounts.length;
}//array.length to count number of account objects in account array

function getBooksBorrowedCount(books) {
  return books.filter((book) => borrowedStatusCheck(book)).length;
}//filter for books where borrowed status === false; obtain length



function getMostCommonGenres(books) {
  const genresCount = [];
  //Create keys of genres and track counter in their associated key-pair
  for (const book in books) { 
    let bookGenre=books[book].genre;
      
    genresCount.some((check)=>check.name===bookGenre) ? genresCount.find(obj=>obj.name===bookGenre).count++ : genresCount.push({"name": bookGenre, "count": 1 });
    };
  //convert key/keypair into array,sort,slice
  let output = genresCount.sort((most, less) => less.count - most.count).slice(0, 5)

  return output
}


//for each book create an array of objects containing the 'name':title and 'count':number of borrows; sort by most then slice first 5
function getMostPopularBooks(books) {
  const booksCount = [];
  for (const book in books) {
    let {title,borrows}=books[book];
    booksCount.push({ 'name': title, 'count': borrows.length }) }
  return booksCount.sort((most, less) => less.count - most.count).slice(0, 5)
}
  




function getMostPopularAuthors(books, authors) {
  const authorsCount = {};
  //assign authorIds to keys and counts to key-pairs
  for (const book in books) {
    //deconstruct books[book] into {authorId,borrows}
    let { authorId, borrows } = books[book]
    Object.keys(authorsCount).includes(authorId) ? authorsCount[authorId]++ : authorsCount[authorId] = borrows.length
  }
  //Object.entries,sort,slice
  let output = Object.entries(authorsCount).sort((most, less) => less[1] - most[1]).slice(0, 5)
  let authorsOutput = [];
  //proper formatting for output, convert authorId to integer for comparison later on
  output.forEach((author) => authorsOutput.push({ 'name': parseInt(author[0]), 'count': author[1] }))
  //replace authorID with author first+last name. Also join(" ") .first and .last
  for (const idCount in authorsOutput) {
    let authorName = authorsOutput[idCount].name;
    authorsOutput[idCount].name = Object.values(authors.find((author) => author.id === authorName).name).join(" ")
  }
  //destructured authorsOutput[idCount].name into authorName. I can only replace the 2nd instance with authorName, as replacing the first results in updating the variable rather than replacing the key-pair in the authorsOutput[idCount].name object. 
  return authorsOutput;
}




//helper function for checking borrowed status of books
function borrowedStatusCheck(book) {
  return book.borrows.some((status) => status.returned === false)
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
