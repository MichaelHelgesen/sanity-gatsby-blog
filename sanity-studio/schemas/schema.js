// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import blogPostImage from './blogPostImage'
import bodyImage from "./bodyImage"
import book from "./book"
import categories from "./categories"
import codePen from './codePenEmbed'
import exampleUsage from "./codeExample"
import externalLink from "./externalLink"
import gallery from './galleyImages'
import internalLink from "./internalLink"
import note from "./note"
import page from "./page"
import programmingDictionary from './programmingDictionary'
import post from './post'
import quote from "./quote"
import schemaTypes from 'all:part:@sanity/base/schema-type'
import tipField from "./tipField"
import youtubeLink from './youtubeLink'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /* Your types here! */
    blogPostImage,
    bodyImage,
    codePen,
    exampleUsage,
    externalLink,
    internalLink,
    quote,
    tipField,
    youtubeLink,
    //
    post,
    note,
    programmingDictionary,
    book,
    categories,
    gallery,
    page,
  ]),
})

