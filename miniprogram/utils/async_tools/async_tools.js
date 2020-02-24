import regeneratorRuntime from '../../utils/regenerator-runtime/runtime'
const callAsync = async (func) => {
  try {
    let res = await func()
    return [null, res]
  } catch (e) {
    console.error(e)
    return [e, null]
  }
}

export {
  callAsync
}