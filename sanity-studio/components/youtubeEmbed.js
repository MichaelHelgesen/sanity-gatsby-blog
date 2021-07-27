import React from "react"
import { FormField } from "@sanity/base/components"
import { TextInput} from "@sanity/ui"

//Funksjonen som eksporterer komponenten. Den vi må importere i diagram
const YoutubeEmbed = React.forwardRef((props, ref) => {
    const { 
        type,
        value,
        readOnly,
        placeholder,
        markers,
        presence,
        compareValue,
        onFocus,
        onBlur
    } = props
    return (
        <FormField
            title={type.title}
            description={type.description}
            compareValue={compareValue}
            __unstable_markers={markers}
            __unstable_presence={presence}
        >
            <TextInput
                value={value}
                readOnly={readOnly}
                placeHolder={placeholder}
                onFocus={onFocus}
                onBlur={onBlur}
            />
        </FormField>
    )
})

export default YoutubeEmbed;