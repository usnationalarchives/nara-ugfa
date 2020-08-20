import React, { useState } from "react";

const ToggleContent = ({ toggle, content }) => {
  const [isShown, setIsShown] = useState(true);
  const hide = () => setIsShown(false);
  const show = () => setIsShown(true);

  return (
    <>
      {toggle(show)}
      {isShown && content(hide)}
    </>
  );
};

export default ToggleContent;