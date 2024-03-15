export const dataRemap = (data) => {
    return Object.keys(data).map((key) => ({
        ...data[key], key: key
    }))
}