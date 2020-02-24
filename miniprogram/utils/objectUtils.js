function mergePages(...pages) {
  let pageData = {}
  let pageObject = {}
  for (let page of pages) {
    pageData = Object.assign({}, pageData, page.data)
    pageObject = Object.assign({}, pageObject, page)
  }
  pageObject.data = pageData
  return pageObject
}


module.exports = mergePages