import store from 'store'

const _prefix = 'nail.'

const _getFullKey = (key, prefix = '') => {
    if (prefix) {
        return prefix + key
    }

    return _prefix + key
}

export const removeLocalData = (key, prefix = '') => {
    const realKey = _getFullKey(key, prefix)

    return store.remove(realKey)
}

export const getLocalData = (key, defaultValue = null, prefix = '') => {
    const realKey = _getFullKey(key, prefix)

    const value = store.get(realKey) || defaultValue

    try {
        return JSON.parse(value)
    } catch (e) {
        return value
    }
}

export const setLocalData = (key, value, prefix = '') => {
    const realKey = _getFullKey(key, prefix)

    const type = typeof value
    if (type === 'object') {
        value = JSON.stringify(value)
    }

    store.set(realKey, value)

    return value
}