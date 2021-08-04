import * as React from "react"
import SimpleReactLightbox from "simple-react-lightbox"
import { SRLWrapper } from "simple-react-lightbox";
import Masonry from "react-masonry-css"
import * as style from "../components/imageGallery.module.scss"

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
        columnClassName={style.my_masonry_grid_column}>
                    {props.map((post, index) => (
                        <div key={index}>
                            <img src={`${post.node.image.asset.url}?w=1000&q=75`} alt={post.node.image.alt ? post.node.image.alt : ""} />
                            </div>
                    ))}
                    </Masonry>
                    </SRLWrapper>
</SimpleReactLightbox>

    </div>
)

export default ImageGallery
