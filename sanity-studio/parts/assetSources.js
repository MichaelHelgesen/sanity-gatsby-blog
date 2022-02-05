import Unsplash from "part:sanity-plugin-asset-source-unsplash/image-asset-source"
import Cloudinary from "part:sanity-plugin-asset-source-cloudinary/image-asset-source"
import DefaultImage from "part:@sanity/form-builder/input/image/asset-source-default"
//import DefaultFiles from "part:@sanity/form-builder/input/file/asset-source-default"

export default [Unsplash, Cloudinary, DefaultImage]
