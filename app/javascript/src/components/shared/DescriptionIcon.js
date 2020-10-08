import React from "react";

// assets
import SeriesIcon from "#assets/icons/hierarchy-series.svg";
import ItemIcon from "#assets/icons/hierarchy-item.svg";
import BoxIcon from "#assets/icons/hierarchy-record-group.svg";
import FileUnitIcon from "#assets/icons/hierarchy-file-unit.svg";


const DescriptionIcon = ({ level }) => {

  const Icon = ({ level }) => {
    switch (level) {
      case "recordGroup":
      case "Record Group":
      case "collection":
      case "Collection":
        return <BoxIcon />;
      case "series":
      case "Series":
        return <SeriesIcon />;
      case "fileUnit":
      case "File Unit":
        return <FileUnitIcon />;
      case "item":
      case "Item":
      case "itemAv":
      case "Item AV":
        return <ItemIcon />;
      default:
        return null;
    }
  };

  return (
    <>
      <Icon level={level} />
    </>
  );
};

export default DescriptionIcon;
