// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import bodyImage from "./bodyImage"
import book from "./book"
import categories from "./categories"
import exampleUsage from "./codeExample"
import externalLink from "./externalLink"
import internalLink from "./internalLink"
import note from "./note"
import post from './post'
import quote from "./quote"
import schemaTypes from 'all:part:@sanity/base/schema-type'
import tipField from "./tipField"

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /* Your types here! */
    bodyImage,
    exampleUsage,
    externalLink,
    internalLink,
    categories,
    quote,
    book,
    note,
    post,
    tipField
  ]),
})
