const fs = require('fs')
const http = require('https')
const cmd = require('child_process')

async function download(info) {
  if (info.type === 'dir') {
    const url = info.url
    const children = await fetch(url).then((res) => res.json())
    await Promise.all(children.map(download))
  } else if (info.type === 'file') {
    const url = info.download_url
    const file = fs.createWriteStream('./gpls/' + info.name, { flags: 'w' })
    http.get(url, (res) => {
      res.pipe(file)

      file.on('finish', () => {
        file.close()
        console.log(`downloaded file ${info.name}`)
      })
    })
  }
}

async function main() {
  const root_dir_url =
    'https://api.github.com/repos/sunday00/hobby-log/contents/src/main/resources/graphql'
  const root_result = await fetch(root_dir_url).then((res) => res.json())

  await Promise.all(root_result.map(download))

  cmd.exec(`graphql-codegen --config codegen.rc.ts`)

  return { success: true, message: '' }
}

main().then((r) => {
  if (r.success) console.log('success')
  else {
    console.error(r.message)
  }
})
