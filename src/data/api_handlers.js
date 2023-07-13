export const BASE_URL = "http://localhost:3000/api";

// Fetch All Books
export const fetchAllBooks = async () => {
  try {
    const nfResponse = await fetch(`${BASE_URL}/nonfiction-books`);
    const nfData = await nfResponse.json();

    const ficResponse = await fetch(`${BASE_URL}/fiction-books`);
    const ficData = await ficResponse.json();

    const gnResponse = await fetch(`${BASE_URL}/graphic-books`);
    const gnData = await gnResponse.json();

    const clubResponse = await fetch(`${BASE_URL}/book-club-picks`);
    const clubData = await clubResponse.json();

    const childResponse = await fetch(`${BASE_URL}/childrens-books`);
    const childData = await childResponse.json();

    const allBooks = [].concat(
      ...nfData,
      ...ficData,
      ...gnData,
      ...clubData,
      ...childData
    );

    return allBooks;
  } catch (error) {
    console.log(error);
  }
};

// Fetch Reviews
export const fetchReviews = async () => {
  try {
    const response = await fetch(`${BASE_URL}/reviews`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

// User login
export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: username,
          password: password,
        },
      }),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

// User Registration
export const registerUser = async (
  username,
  password,
  email,
  name,
  is_admin
) => {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: username,
          password: password,
          email: email,
          name: name,
          is_admin: is_admin,
        },
      }),
    });

    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);
  }
};

// Nonfiction Books
export const fetchNFBooks = async () => {
  try {
    const response = await fetch(`${BASE_URL}/nonfiction-books`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
// Fiction Books
export const fetchFictionBooks = async () => {
  try {
    const response = await fetch(`${BASE_URL}/fiction-books`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
// Book Club Picks
export const fetchBookClubPicks = async () => {
  try {
    const response = await fetch(`${BASE_URL}/book-club-picks`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
// Children's Books
export const fetchChildrenBooks = async () => {
  try {
    const response = await fetch(`${BASE_URL}/childrens-books`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
// Graphic Novels and Manga
export const fetchGraphicNovels = async () => {
  try {
    const response = await fetch(`${BASE_URL}/graphic-books`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

// Get User by Id
export const fetchUserById = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}`);
    const translatedData = await response.json();

    return translatedData;
  } catch (error) {
    console.log(error);
  }
};
// User Update (PUT)
export const updateUser = async (userId, updatedData) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

// User Update (Patch)
export const updateUserPatch = async (userId, updatedData) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

// Get all User Data
export const fetchAllBooksTable = async () => {
  try {
    const response = await fetch(`${BASE_URL}/allbooks`);
    const translatedData = await response.json();
    return translatedData;
  } catch (error) {
    console.log(error);
  }
};

// Get all User Data
export const fetchAllUserData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/users`);
    const translatedData = await response.json();
    return translatedData;
  } catch (error) {
    console.log(error);
  }
};

//add to allBooksTable

export const postToAllBooks = async () => {
  try {
    const settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        book: {
          isbn: isbn,
          title: title,
          author: author,
          artist: artist,
          illustrator: illustrator,
          genre: genre,
          summary: summary,
          publisher: publisher,
          yearPublished: yearPublished,
          bookCover: bookCover,
          audience: audience,
          physicalDescription: physicalDescription,
          bookType: bookType,
        },
      }),
    };
    const response = await fetch(`${BASE_URL}/allbooks}`, settings);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const fetchFromAllBooksByIsbn = async (isbn) => {
  try {
    const response = await fetch(`${BASE_URL}/allbooks/${isbn}`);
    const result = response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const updateAllBooks = async (isbn, updatedData) => {
  try {
    const response = await fetch(`${BASE_URL}/allbooks/${isbn}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
