const pack = (json) => {
    return btoa(JSON.stringify(json))
}
const unpack = (packjson) => {
    return atob(JSON.parse(packjson))
}

const downloadToFile = (content, filename, contentType) => {
    const a = document.createElement('a')
    const file = new Blob([content], { type: contentType })

    a.href = URL.createObjectURL(file)
    a.download = filename
    a.click()

    URL.revokeObjectURL(a.href)
}

export default class FileManager {
    static async openProject(e) {
        return new Promise((resolve, reject) => {
            e.onchange = (e) => {
                if (window.File && window.FileList && window.FileReader) {
                    var file = e.target.files[0]

                    var jsoncReader = new FileReader()
                    jsoncReader.addEventListener('load', (e) => {
                        resolve(e.target.result)
                    })
                    jsoncReader.readAsText(file)
                } else {
                    reject('Your browser does not support File API')
                }
            }
        })
    }

    //
    static packSettingsAndDownload(json) {
        downloadToFile(pack(json), 'product.tsv', 'text/tsv')
    }
    static unpackSettings(settings) {
        return unpack(settings)
    }
}
