import React, { useState } from "react";
import styled from "styled-components";
import { Get } from "react-axios";

// api
import { createBookmark } from "#api/internal/bookmark";
import { deleteBookmark } from "#api/internal/bookmark";

// styles
import { buttonReset } from '#styles/mixins';

// assets
import BookmarkEmpty from "#assets/icons/bookmark.svg";
import BookmarkActive from "#assets/icons/bookmark-active.svg";

export const BookmarkWrap = styled.button`
  ${buttonReset}
  height: fit-content;
  margin: 10px 20px 0 0;

  svg {
    fill: ${(props) => props.theme.colors.yellow};
    height: 35px;
  }
`;


const Bookmark = ({ guideId, ...props }) => {
  const [bookmarked, setBookmarked] = useState(props.bookmark);

  const handleBookmarkClick = (event) => {
    event.preventDefault();

    if (bookmarked) {
      deleteBookmark(guideId).then(() => {
        setBookmarked(false);
      });
    } else {
      createBookmark({
        guide_id: guideId,
      }).then(() => {
        setBookmarked(true);
      });
    }
  };

  return (
    <>
      <BookmarkWrap onClick={handleBookmarkClick}>
        {bookmarked ? <BookmarkActive /> : <BookmarkEmpty />}
      </BookmarkWrap>
    </>
  );
};

export default Bookmark;
