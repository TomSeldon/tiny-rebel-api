/**
 * Some drink names and types (possibly other things) contain a mixture of words that
 * should be spelled out, rather than pronounced as a word.
 * 
 * For example, "IPA" should be spelled out. If we just output "IPA", Alexa will pronounce
 * it as "eepah".
 * 
 * We can't just spell out all capitalised words, as some things still need to be read out
 * in full, e.g. "FUBAR".
 * 
 * @param {string} text
 * 
 * @returns {string}
 */
module.exports = function abbreviateSpeech(text) {
    const abbreviations = ['IPA', 'APA'];

    return text.replace(
        new RegExp(`(${abbreviations.join('|')})`, 'g'),
        '<say-as interpret-as="spell-out">$1</say-as>'
    );
};
