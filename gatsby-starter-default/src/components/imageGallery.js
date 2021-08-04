import * as React from "react"
import { Link } from "gatsby"
import SimpleReactLightbox from 'simple-react-lightbox';
import { SRLWrapper } from "simple-react-lightbox";
import Masonry from 'react-masonry-css';
import * as style from "../components/imageGallery.module.scss"

// Function for image settings and generating URL
function urlBuilder(image) {
    const { width, height } = image.asset.metadata.dimensions;
    return (
        `w=1000` +
        `&q=75`
    )
}

const breakpointColumnsObj = {
    default: 4,
    1300: 3,
    950: 2,
    650: 1
};

const ImageGallery = ({ props }) => (
    <div className={style.content}>
        <SimpleReactLightbox>
            <SRLWrapper>
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className={style.my_masonry_grid}
                    columnClassName={style.my_masonry_grid_column}
                >
                    {props.map(post => (
                            <img src={`${post.node.image.asset.url}?${urlBuilder(post.node.image)}`} />
                    ))}

                </Masonry>
            </SRLWrapper>
        </SimpleReactLightbox>
    </div>
)

export default ImageGallery
