import { createContext, useState, useEffect } from "react";

export const LibraryContext = createContext();

// saved localStorage
const useLocalStorage = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    try {
      const savedLibraryData = localStorage.getItem(key);
      return savedLibraryData ? JSON.parse(savedLibraryData) : defaultValue;
    } catch (error) {
      console.log("Enter reading localStorage key:", key, error);
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.log("Error setting localStorage key:", key, error);
    }
  }, [key, state]);
  return [state, setState];
};
export const LibraryContextProvider = ({ children }) => {
  // Library State
  const [library, setLibrary] = useLocalStorage("library", [
    {
      id: 1,
      title: "فن البرمجه",
      author: "أحمد محمد",
      category: "تقنية",
      date: "2023-01-15",
      description: "كتاب شامل عن أساسيات البرمجة",
      reviews: [
        {
          id: 101,
          userName: "محمد علي",
          rating: 5,
          comment: "كتاب رائع جدا",
          data: "قبل 7 دقائق ",
        },
      ],
    },
    {
      id: 2,
      title: "علم النفس الحديث",
      author: "هبة الاحمد",
      category: "علم نفس",
      date: "2023-04-28",
      description: "كتاب شامل عن علم النفس",
      reviews: [
        {
          id: 102,
          userName: "فاطمة علي",
          rating: 5,
          comment: "من اجمل الكتب التي قرأتها",
          data: "قبل 10 دقائق ",
        },
      ],
    },
  ]);

  /// State ///

  // searchQuery
  const [searchQuery, setSearchQuery] = useState("");

  // selectedCategory
  const [category, setCategory] = useLocalStorage("categories_list", [
    { id: "cat-1", name: "علم نفس" },
    { id: "cat-2", name: "أدب" },
    { id: "cat-3", name: "تاريخ" },
    { id: "cat-4", name: "تقنية" },
  ]);
  const [selectedCategory, setSelectedCategory] = useState("جميع التصنيفات");

  // selectedAuthor
  const [author, setAuthor] = useLocalStorage("authors_list", [
    { id: "auth-1", name: "أحمد محمد" },
    { id: "auth-2", name: "فاطمة علي" },
    { id: "auth-3", name: "خالد أحمد" },
    { id: "auth-4", name: "سارة محمد" },
  ]);
  const [selectedAuthor, setSelectedAuthor] = useState("جميع المؤلفين");

  /// Filters ///
  // searchQuery
  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  };
  //  selectedCategory
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };
  //  selectedAuthor
  const handleAuthorChange = (e) => {
    setSelectedAuthor(e.target.value);
  };

  // filteredBooks

  const filteredBooks = library.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchCategory =
      !selectedCategory ||
      selectedCategory === "جميع التصنيفات" ||
      book.category === selectedCategory;

    const machAuthor =
      !selectedAuthor ||
      selectedAuthor === "جميع المؤلفين" ||
      book.author === selectedAuthor;

    return matchesSearch && matchCategory && machAuthor;
  });

  /// Adds ///

  //   add Author
  const addAuthor = (newAuthorData) => {
    setAuthor((prevAuthors) => {
      const isExist = prevAuthors.some(
        (auth) => auth.name.trim() === newAuthorData.trim(),
      );
      if (!isExist) {
        return [
          ...prevAuthors,
          {
            id: `author-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            name: newAuthorData.trim(),
          },
        ];
      }
      return prevAuthors;
    });
  };

  // add Category
  const addCategory = (newCategoryData) => {
    setCategory((prevCategories) => {
      const isExist = prevCategories.some(
        (cat) => cat.name.trim() === newCategoryData.trim(),
      );
      if (!isExist) {
        return [
          ...prevCategories,
          {
            id: `category-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            name: newCategoryData.trim(),
          },
        ];
      }
      return prevCategories;
    });
  };
  // add Book

  const addBook = (newBookData) => {
    setLibrary((prevBooks) => {
      const newBook = {
        id: `book-${Date.now()}-${prevBooks.length}-${Math.floor(Math.random() * 1000)}`,
        ...newBookData,
        reviews: [],
        date: new Date().toISOString().split("T")[0],
      };
      return [...prevBooks, newBook];
    });

    if (newBookData.category) addCategory(newBookData.category);
    if (newBookData.author) addAuthor(newBookData.author);
  };

  // add Review

  // const addReview = (newReviewData, bookId) => {
  //   setLibrary((prevLibrary) => {
  //     const newReview = {
  //       id: `review-${Date.now()}-${prevLibrary.length}-${Math.floor(Math.random() * 1000)}`,
  //       ...newReviewData,
  //       date: Date.now(),
  //     };

  //     return prevLibrary.map((book) => {
  //       if (book.id === bookId) {
  //         return {
  //           ...book,
  //           reviews: [...book.reviews, newReview],
  //         };
  //       }
  //       return book;
  //     });
  //   });
  // };
  const addReview = (newReviewData, bookId) => {
      setLibrary((prevLibrary) => {
    const newReview = {
      id: `review-${Date.now()}-${prevLibrary.length}-${Math.floor(Math.random() * 1000)}`,
      ...newReviewData,
      date: new Date().toDateString(),
    };
  
      return prevLibrary.map((book) => {
        if (book.id === bookId) {
          const updateReviews = [...book.reviews, newReview];

          const totalRating = updateReviews.reduce(
            (sum, rev) => sum + Number(rev.rating),
            0,
          );
          const averageRating = totalRating / updateReviews.length;

          return {
            ...book,
            reviews: updateReviews,
            rating: Number(averageRating.toFixed(1)),
          };
        }
        return book;
      });
    });
  };

  // custumModals
  // add book Modal
  const [isOpenAddBookModal, setIsopenAddBookModal] = useState(null);
  const openAddBookModal = () => setIsopenAddBookModal(true);
  const closeAddBookModal = () => setIsopenAddBookModal(null);
  // add review Modal
  const [isOpenReviewModal, setIsopenReviewModal] = useState(null);
  const openReviewModal = () => setIsopenReviewModal(true);
  const closeReviewModal = () => setIsopenReviewModal(null);

  return (
    <LibraryContext.Provider
      value={{
        library,
        searchQuery,
        handleSearchQuery,
        selectedAuthor,
        handleAuthorChange,
        selectedCategory,
        handleCategoryChange,
        filteredBooks,
        category,
        author,
        addCategory,
        addAuthor,
        addBook,
        addReview,
        isOpenAddBookModal,
        openAddBookModal,
        closeAddBookModal,
        isOpenReviewModal,
        openReviewModal,
        closeReviewModal,
        setIsopenAddBookModal,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};
