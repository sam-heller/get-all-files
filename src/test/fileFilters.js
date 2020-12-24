import test from 'ava'
import fs from 'fs'
import { join } from 'path'
import getAllFiles from '../../lib/get-all-files'

const fixtures = join(__dirname, `fixtures`)

const fileExclude = {
  isExcludedFile: filename => {
    let res = false
    if (filename.endsWith(`great`)) res = true
    if (filename.endsWith(`mhmm`)) res = true
    return res
  }
}

test(`sync with file exclude finds 4 files`, t => {
  let count = 0

  for (const filename of getAllFiles.sync(fixtures, fileExclude)) {
    t.assert(fs.existsSync(filename))
    count++
  }

  t.is(count, 4)
})

test(`sync array with file exclude finds 4 files`, t => {
  t.is(getAllFiles.sync.array(fixtures, fileExclude).length, 4)
})

test(`async with file exclude finds 4 files`, async t => {
  let count = 0

  for await (const filename of getAllFiles.async(fixtures, fileExclude)) {
    await fs.promises.access(filename)
    count++
  }

  t.is(count, 4)
})

test(`async array with file exclude finds 4 files`, async t => {
  t.is((await getAllFiles.async.array(fixtures, fileExclude)).length, 4)
})
