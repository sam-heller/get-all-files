import test from 'ava'
import fs from 'fs'
import { join } from 'path'
import getAllFiles from '../../lib/get-all-files'

const fixtures = join(__dirname, `fixtures`)

//  /**
//   *
//   * Directory Exclude
//   *
//   */

test(`sync with directory exclude finds 2 files`, t => {
  let count = 0
  let opt = {
    isExcludedDir: n => {
      return n.includes(`blah`)
    }
  }
  for (const filename of getAllFiles.sync(fixtures, opt)) {
    t.assert(fs.existsSync(filename))
    count++
  }
  t.is(count, 2)
})

test(`sync array with directory exclude finds 2 files`, t => {
  t.is(
    getAllFiles.sync.array(fixtures, {
      isExcludedDir: dirName => {
        return dirName.includes(`blah`)
      }
    }).length,
    2
  )
})

test(`async with directory exclude finds 2 files`, async t => {
  let count = 0

  for await (const filename of getAllFiles.async(fixtures, {
    isExcludedDir: dirName => {
      return dirName.includes(`blah`)
    }
  })) {
    await fs.promises.access(filename)
    count++
  }

  t.is(count, 2)
})

test(`async array with directory exclude finds 2 files`, async t => {
  t.is(
    (
      await getAllFiles.async.array(fixtures, {
        isExcludedDir: dirName => {
          return dirName.includes(`blah`)
        }
      })
    ).length,
    2
  )
})
