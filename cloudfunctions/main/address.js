const db = require('./db')

const queryAddress = async (event, wxContext, user) => {
  return {
    status: true,
    message: 'ok',
    data: {
      entities: user.address
    }
  }
}

const getAddress = async (event, wxContext, user) => {
  for (let item of user.address) {
    if (item.id == event.addressId) {
      return {
        status: true,
        message: 'ok',
        data: {
          entity: item
        }
      }
    }
  }
  return {
    status: false,
    message: 'address_not_found'
  }

}

const saveAddress = async (event, wxContext, user) => {
  let result = null
  for (let i = 0; i < user.address.length; i++) {
    if (user.address[i].id == event.addressId) {
      user.address[i] = event.address
      try {
        result = await db.collection('user').doc(user._id).update({
          data: {
            address: user.address
          }
        })
      } catch (e) {
        console.error(e)
      }
      if (!result) {
        return {
          status: false,
          message: 'update_address_error'
        }
      } else {
        return {
          status: true,
          message: 'ok'
        }
      }

    }
  }
  return {
    status: false,
    message: 'address_not_found'
  }
}


const deleteAddress = async (event, wxContext, user) => {
  let result = null
  for (let i = 0; i < user.address.length; i++) {
    if (user.address[i].id == event.addressId) {
      user.address.splice(i, 1)
      try {
        result = await db.collection('user').doc(user._id).update({
          data: {
            address: user.address
          }
        })
      } catch (e) {
        console.error(e)
      }
      if (!result) {
        return {
          status: false,
          message: 'update_address_error'
        }
      } else {
        return {
          status: true,
          message: 'ok'
        }
      }

    }
  }
  return {
    status: false,
    message: 'address_not_found'
  }
}

const setDefaultAddress = async (event, wxContext, user) => {
  let result = null
  let index = null
  for (let i = 0; i < user.address.length; i++) {
    if (user.address[i].id == event.addressId) {
      user.address[i].isDefault = true
      index = i
    } else {
      user.address[i].isDefault = false
    }
  }

  if (index === null) {
    return {
      status: false,
      message: 'address_not_found'
    }
  }

  try {
    result = await db.collection('user').doc(user._id).update({
      data: {
        address: user.address
      }
    })
  } catch (e) {
    console.error(e)
  }
  if (!result) {
    return {
      status: false,
      message: 'setdefault_address_error'
    }
  } else {
    return {
      status: true,
      message: 'ok'
    }
  }
}


module.exports = {
  queryAddress: queryAddress,
  getAddress: getAddres,
  saveAddress: saveAddress,
  deleteAddress: deleteAddress,
  setDefaultAddress: setDefaultAddress
}
