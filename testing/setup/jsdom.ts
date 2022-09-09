// eslint-disable-next-line @typescript-eslint/no-var-requires
const { JSDOM } = require('jsdom')
require('jest-webextension-mock')

const dom = new JSDOM('<body></body>', {})

global.window = dom.window
global.document = dom.window.document
global.navigator = dom.window.navigator