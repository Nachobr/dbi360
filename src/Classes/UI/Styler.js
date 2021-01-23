const addStyle = (element, style) => {
    for (const [key, value] of Object.entries(style)) {
        this.element.style[key] = value
    }
}

export { addStyle }
