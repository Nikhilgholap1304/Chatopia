import React from "react";
import FsLightbox from "fslightbox-react";

const LightBox = ({ assetPreviewTog, assetSources, setAssetSources }) => {
  // console.log(assetSources);
  return (
    <FsLightbox
      toggler={assetPreviewTog}
      sources={assetSources}
      key={assetSources}
      onClose={() => setAssetSources(null)}
      className={`${assetSources ? 'flex':'hidden'}`}
    />
  );
};

export default LightBox;
