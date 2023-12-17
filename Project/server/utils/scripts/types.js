const typeSizes = {
    1: 1, // BYTE
    2: 1, // ASCII
    3: 2, // SHORT
    4: 4, // LONG
    5: 8, // RATIONAL
    7: 1, // UNDEFINED
    9: 4, // SLONG
    10: 8, // SRATIONAL
    13: 4 // IFD
};

const tagTypes = {
    'BYTE': 1,
    'ASCII': 2,
    'SHORT': 3,
    'LONG': 4,
    'RATIONAL': 5,
    'UNDEFINED': 7,
    'SLONG': 9,
    'SRATIONAL': 10,
    'IFD': 13
};

module.exports = {
    getAsciiValue,
    getByteAt,
    getAsciiAt,
    getShortAt,
    getLongAt,
    getRationalAt,
    getUndefinedAt,
    getSlongAt,
    getSrationalAt,
    getIfdPointerAt,
    typeSizes,
    tagTypes,
    getTypeSize
};

function getAsciiValue(charArray) {
    return charArray.map((charCode) => String.fromCharCode(charCode));
}

function getByteAt(dataView, offset) {
    return dataView.getUint8(offset);
}

function getAsciiAt(dataView, offset) {
    return dataView.getUint8(offset);
}

function getShortAt(dataView, offset) {
    return dataView.getUint16(offset, true);
}

function getLongAt(dataView, offset) {
    //Little-endian is a method of storing binary data in which the least significant (or "little") byte comes first, followed by the more significant bytes. 
    return dataView.getUint32(offset, true);
}

function getRationalAt(dataView, offset) {
    return [getLongAt(dataView, offset), getLongAt(dataView, offset + 4)];
}

function getUndefinedAt(dataView, offset) {
    return getByteAt(dataView, offset);
}

function getSlongAt(dataView, offset) {
    return dataView.getInt32(offset, true);
}

function getSrationalAt(dataView, offset) {
    return [getSlongAt(dataView, offset), getSlongAt(dataView, offset + 4)];
}

function getIfdPointerAt(dataView, offset) {
    return getLongAt(dataView, offset);
}

function getTypeSize(typeName) {
    if (tagTypes[typeName] === undefined) {
        throw new Error('No such type found.');
    }

    return typeSizes[tagTypes[typeName]];
}
