module.exports = function() {
    this.emit(
        ':tell',
        '<p>You can ask me about available drinks at Tiny Rebel bars in either Cardiff or Newport.</p>' +
            '<p>I can <emphasis level="reduced">suggest</emphasis> a drink, ' +
            'find you the <emphasis level="moderate">cheapest</emphasis> drink, ' +
            'or find you the strongest drink.</p>'
    );
};
