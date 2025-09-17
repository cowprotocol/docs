import JSONSchemaViewer from '@theme/JSONSchemaViewer';
import {useEffect, useState} from "react";

export function AppDataJsonView({url}) {
    const [schema, setSchema] = useState(null)

    useEffect(() => {
        if (url) {
            fetch(url)
                .then(res => res.json())
                .then(setSchema)
        }
    }, [url]);

    return schema ? <JSONSchemaViewer schema={schema}/> : null;
}