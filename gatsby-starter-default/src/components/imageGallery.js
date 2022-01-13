import * as React from "react"
import SimpleReactLightbox from "simple-react-lightbox"
import { SRLWrapper } from "simple-react-lightbox";
import Masonry from "react-masonry-css"
import * as style from "../components/imageGallery.module.scss"
import { AdvancedImage, lazyload, accessibility, responsive, placeholder } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";


const breakpointColumnsObj = {
    default: 4,
    1300: 3,
    950: 2,
    650: 1
};

const cld = new Cloudinary({
    cloud: {
        cloudName: 'mikkesblogg'
    }
});

const ImageGallery = ({ props }) => (

    <div className={style.content}>
        <SimpleReactLightbox>
            <SRLWrapper>
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className={style.my_masonry_grid}
                    columnClassName={style.my_masonry_grid_column}>
                    {props[0].node.resources.map((post, index) => {
                        
                        const myImage = cld.image(`${post.public_id}`);
                        myImage.resize(fill().width(600).height(600 / post.aspect_ratio));

                        return (
                            <div key={index}>
                                <a href={`https://res.cloudinary.com/${post.folder}/${post.resource_type}/${post.type}/c_scale,w_1000/f_auto/v1636405719/${post.folder}/${post.filename}.jpg`}>
                                    <AdvancedImage cldImg={myImage} plugins={[lazyload('10px 20px 10px 30px', 0.25), placeholder("predominant-color")]} />
                                </a>
                            </div>)
                    })}
                </Masonry>
            </SRLWrapper>
        </SimpleReactLightbox>

    </div>
)

export default ImageGallery
