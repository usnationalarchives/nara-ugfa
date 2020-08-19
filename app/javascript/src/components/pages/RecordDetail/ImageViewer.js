import React, { useEffect, useState } from 'react';
import OpenSeaDragon from 'openseadragon';

const ImageViewer = ({ objects }) => {
  const [viewer, setViewer] = useState();

  useEffect(() => {
    if (objects && viewer) {
      const tileSources = objects
        .map(object => object.imageTiles.url)
        .map(url => url.replace('catalog.archives.gov/catalogmedia', 's3.amazonaws.com/NARAprodstorage'));

      viewer.open(tileSources);
    }
    // we only care about the object prop, ignore other dependencies
    // eslint-disable-next-line
  }, [objects]);

  useEffect(() => {
    initOpenSeaDragon();

    return () => {
      // clean up by destroying this viewer when unmounting
      viewer && viewer.destroy();
    };
    // we only want to run this once, dont worry about other dependencies
    // eslint-disable-next-line
  }, []);

  const initOpenSeaDragon = () => {
    viewer && viewer.destroy();

    const newViewer = OpenSeaDragon({
      id: 'viewer',
      prefixUrl: '/images/openseadragon/',
      sequenceMode: true,
      showReferenceStrip: true,
      tileSources: {
        Image: {
          xmlns: "http://schemas.microsoft.com/deepzoom/2008",
          Url: "//openseadragon.github.io/example-images/duomo/duomo_files/",
          Format: "jpg",
          Overlap: "2",
          TileSize: "256",
          Size: {
            Width: "13920",
            Height: "10200"
          }
        } 
      }
    });

    setViewer(newViewer);
  };

  return <div id="viewer" style={{ height: '100%', width: '100%' }}></div>;
};

export default ImageViewer;