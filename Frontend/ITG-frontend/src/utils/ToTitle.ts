const toTitle = (word: string) => {
    word = word.split('/')[1]
    word = word.slice(0, 1).toUpperCase() + word.slice(1)
    return word
}

export default toTitle