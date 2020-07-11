function removeHistoryFromView() {
    try {document.querySelector('#historyWrapper').remove()} catch (e) {}
}

function removeCardGridFromView() {
    try {document.querySelector('section').remove()} catch (e) {}
}

function removeCongratsFromView() {
    try {document.querySelector('.congrats').remove()} catch (e) {}
}

function removeUserInfoFromView() {
    try {document.querySelector('#userName').remove()} catch (e) {}
}

function removeLevelMenuFromView() {
    try {document.querySelector('.chooseLevel').remove()} catch (e) {}
}
