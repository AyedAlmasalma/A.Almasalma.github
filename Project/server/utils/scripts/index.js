const fs = require('fs');
const tagNamesIfds = require('./tags');
const Types = require('./types');

const getTagValueAt = {
    1: Types.getByteAt,
    2: Types.getAsciiAt,
    3: Types.getShortAt,
    4: Types.getLongAt,
    5: Types.getRationalAt,
    7: Types.getUndefinedAt,
    9: Types.getSlongAt,
    10: Types.getSrationalAt,
    13: Types.getIfdPointerAt
};



function load(imagePath) {
    return loadFile(imagePath).then((fileContents) => loadFromData(fileContents));
}



//read image to buffer
function loadFile(filename) {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, function (err, data) {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
        });
    });
}

function loadFromData(data) {
    //"Uint8Array" constructor creates a new array of 8-bit unsigned integers
    //DataView" constructor creates a new DataView object, which allows you to read and write data in a specified byte order from a specified offset in an ArrayBuffer
    return read(new DataView((new Uint8Array(data)).buffer));

};

function read(dataView) {
    //IFD stands for Image File Directory its data structure used in digital images to store metadata information about the image
    return readIfd(dataView, Types.getLongAt(dataView, 4));

}

function readIfd(dataView, offset) {
    // offset in bytes where the IFD begins.
    // FIELD_SIZE is the size in bytes of each field in the IFD.
    const FIELD_SIZE = 12;

    const tags = {};
    //reads the number of fields in the IFD
    const numberOfFields = dataView.getUint8(offset)
    // increments the offset by 2 bytes to skip the next two bytes, which are not used (contain the number of ifd Fields)
    offset += 2;
    for (let fieldIndex = 0; fieldIndex < numberOfFields; fieldIndex++) {
        const tag = readTag(dataView, offset);
        if (tag !== undefined) {
            tags[tag.name] = {
                'id': tag.id,
                'value': tag.value,
                'description': tag.description
            };
        }

        offset += FIELD_SIZE;
    }

    return tags;
}

function tagValueFitsInOffsetSlot(tagType, tagCount) {
    return Types.typeSizes[tagType] * tagCount <= Types.getTypeSize('LONG');
}

function getTagValue(dataView, offset, type, count) {
    let value = [];

    for (let valueIndex = 0; valueIndex < count; valueIndex++) {
        value.push(getTagValueAt[type](dataView, offset));
        offset += Types.typeSizes[type];
    }

    if (type === Types.tagTypes['ASCII']) {
        value = Types.getAsciiValue(value);
    } else if (value.length === 1) {
        value = value[0];
    }

    return value;
}

function tagValueFitsInDataView(dataView, tagValueOffset, tagType, tagCount) {
    return tagValueOffset + Types.typeSizes[tagType] * tagCount <= dataView.byteLength;
}
function splitNullSeparatedAsciiString(string) {
    ///The function returns an array of substrings where each substring represents a segment of the original string that was separated by null characters.
    const tagValue = [];
    let i = 0;

    for (let j = 0; j < string.length; j++) {
        if (string[j] === '\x00') {
            i++;
            continue;
        }
        if (tagValue[i] === undefined) {
            tagValue[i] = '';
        }
        tagValue[i] += string[j];
    }

    return tagValue;
}

function decodeAsciiValue(asciiValue) {
    //The decodeURIComponent function is used to decode any percent-encoded characters, while the escape function is used to encode any non-ASCII characters.
    try {
        return asciiValue.map((value) => decodeURIComponent(escape(value)));
    } catch (error) {
        return asciiValue;
    }
}

function getDescriptionFromTagValue(tagValue) {
    if (tagValue instanceof Array) {
        return tagValue.join(', ');
    }
    return tagValue;
}

function readTag(dataView, offset) {
    const TAG_TYPE_OFFSET = Types.getTypeSize('SHORT');
    const TAG_COUNT_OFFSET = TAG_TYPE_OFFSET + Types.getTypeSize('SHORT');
    const TAG_VALUE_OFFSET = TAG_COUNT_OFFSET + Types.getTypeSize('LONG');
    const tagCode = Types.getShortAt(dataView, offset);
    const tagType = Types.getShortAt(dataView, offset + TAG_TYPE_OFFSET);
    const tagCount = Types.getLongAt(dataView, offset + TAG_COUNT_OFFSET);
    let tagValue;
    if (Types.typeSizes[tagType] === undefined || (tagNamesIfds[tagCode] === undefined)) {
        return undefined;
    }

    if (tagValueFitsInOffsetSlot(tagType, tagCount)) {
        tagValue = getTagValue(dataView, offset + TAG_VALUE_OFFSET, tagType, tagCount);
    } else {
        //calc the new offset for the long value
        const tagValueOffset = Types.getLongAt(dataView, offset + TAG_VALUE_OFFSET);
        if (tagValueFitsInDataView(dataView, tagValueOffset, tagType, tagCount)) {
            tagValue = getTagValue(dataView, tagValueOffset, tagType, tagCount);
        } else {
            tagValue = '<faulty value>';
        }
    }
    if (tagType === Types.tagTypes['ASCII']) {
        tagValue = splitNullSeparatedAsciiString(tagValue);
        tagValue = decodeAsciiValue(tagValue);
    }
    let tagName = `undefined-${tagCode}`;
    let tagDescription = tagValue;

    if (tagNamesIfds[tagCode] !== undefined) {
        if ((tagNamesIfds[tagCode]['name'] !== undefined) && (tagNamesIfds[tagCode]['description'] !== undefined)) {
            tagName = tagNamesIfds[tagCode]['name'];
            try {
                tagDescription = tagNamesIfds[tagCode]['description'](tagValue);
            } catch (error) {
                tagDescription = getDescriptionFromTagValue(tagValue);
            }
        }
        else if ((tagType === Types.tagTypes['RATIONAL']) || (tagType === Types.tagTypes['SRATIONAL'])) {
            tagName = tagNamesIfds[tagCode];
            tagDescription = '' + (tagValue[0] / tagValue[1]);
        }
        else {
            tagName = tagNamesIfds[tagCode];
            tagDescription = getDescriptionFromTagValue(tagValue);
        }
    }
     return {
        id: tagCode,
        name: tagName,
        description: tagDescription
    };

}


module.exports = { load };


