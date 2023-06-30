import { useState, useEffect } from "react";

export const usePagination = (itemsPerPage, initialPage = 1) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [displayedPages, setDisplayedPages] = useState([]);
  const [search, setSearch] = useState("");
  const [carsPerPage] = useState(20);
  const [cars, setCars] = useState([]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const filteredCars = cars.filter((car) =>
    Object.entries(car).some(([key, value]) => {
      if (typeof value === "string") {
        return value.toLowerCase().includes(search.toLowerCase());
      }
      return false;
    })
  );
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    const totalPageCount = Math.ceil(filteredCars.length / carsPerPage);
    if (currentPage < totalPageCount) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    const calculateDisplayedPages = () => {
      const totalPageCount = Math.ceil(filteredCars.length / itemsPerPage);
      const maxDisplayedPages = 5;
      let startPage;
      let endPage;

      if (totalPageCount <= maxDisplayedPages) {
        startPage = 1;
        endPage = totalPageCount;
      } else {
        const maxPagesBeforeCurrentPage = Math.floor(maxDisplayedPages / 2);
        const maxPagesAfterCurrentPage = Math.ceil(maxDisplayedPages / 2) - 1;
        if (currentPage <= maxPagesBeforeCurrentPage) {
          startPage = 1;
          endPage = maxDisplayedPages;
        } else if (currentPage + maxPagesAfterCurrentPage >= totalPageCount) {
          startPage = totalPageCount - maxDisplayedPages + 1;
          endPage = totalPageCount;
        } else {
          startPage = currentPage - maxPagesBeforeCurrentPage;
          endPage = currentPage + maxPagesAfterCurrentPage;
        }
      }

      const pages = Array.from(Array(endPage - startPage + 1).keys()).map(
        (i) => startPage + i
      );
      setDisplayedPages(pages);
    };

    calculateDisplayedPages();
  }, [currentPage, filteredCars.length, itemsPerPage]);

  return {
    currentPage,
    displayedPages,
    cars,
    carsPerPage,
    search,
    setCars,
    paginate,
    goToPreviousPage,
    goToNextPage,
    setCurrentPage,
    setSearch,
    filteredCars,
  };
};
