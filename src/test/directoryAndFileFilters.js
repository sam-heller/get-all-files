import test from 'ava'
import fs from 'fs'
import { join } from 'path'
import getAllFiles from '../../lib/get-all-files'
const fixtures = join(__dirname, `fixtures`)

const combinedExclude = {
  // isExcludedDir : (name) => {return name.includes('sort')},
  isExcludedFile: name => {
    return `ahhhh.js` === name
  },
  isExcludedDir: name => {
    return name.includes(`unreal`)
  }
}

test(`sync with combined exclude finds 3 files`, t => {
  let count = 0

  for (const filename of getAllFiles.sync(fixtures, combinedExclude)) {
    console.log(`'sync1 ${filename}`)
    t.assert(fs.existsSync(filename))
    count++
  }

  t.is(count, 3)
})

test(`sync array with combined exclude finds 3 files`, t => {
  t.is(getAllFiles.sync.array(fixtures, combinedExclude).length, 3)
})

test(`async with combined exclude finds 3 files`, async t => {
  let count = 0

  for await (const filename of getAllFiles.async(fixtures, combinedExclude)) {
    await fs.promises.access(filename)
    count++
  }

  t.is(count, 3)
})

test(`async array with combined exclude finds 3 files`, async t => {
  t.is((await getAllFiles.async.array(fixtures, combinedExclude)).length, 3)
})
