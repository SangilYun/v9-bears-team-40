import * as React from "react";
import styled from "../../utils/theme";

import googleBooksVolume from "../../types/googleBooksVolume";
import authorsArrayToString from "../../utils/authorsArrayToString";

import DefaultThumbnail from "../DefaultThumbnail";
import Details from "./Details";

type BookDetailsProps = {
  book: googleBooksVolume;
};

const Thumnbnail = styled.img`
  height: auto;
  width: 16rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  & > * {
    margin: 0;
  }
`;

const BookDetails: React.FunctionComponent<BookDetailsProps> = props => {
  const {
    title,
    authors,
    publishedDate,
    pageCount,
    imageLinks,
    industryIdentifiers,
    averageRating,
    ratingsCount
  } = props.book.volumeInfo;

  return (
    <Wrapper>
      <h1>{title}</h1>

      {authors ? <h2>{authorsArrayToString(authors)}</h2> : ""}

      <span>{publishedDate ? publishedDate.slice(0, 4) : null}</span>

      {imageLinks && imageLinks.thumbnail ? (
        <Thumnbnail src={imageLinks.thumbnail} />
      ) : (
        <DefaultThumbnail />
      )}

      {industryIdentifiers || pageCount || averageRating ? (
        <Details
          googleReviews={{
            score: averageRating,
            number: ratingsCount
          }}
          identifiers={industryIdentifiers}
          pageCount={pageCount}
        />
      ) : null}
    </Wrapper>
  );
};

export default BookDetails;
