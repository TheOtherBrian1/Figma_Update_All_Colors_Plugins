
//Tells Figma to display your custom UI
figma.showUI(__html__);

//Resizes your plugin UI in pixels
figma.ui.resize(400, 400)

/*
This is our custom function
When a user submits an input from our plugin UI,
this will take care of it
*/
function activateWhenUserClicksSubmit(msg){

    //extracts the message's vairables
    const {keyword, hex} = msg;

    //Gets the node for the current Figma Page
    const currentPage = figma.currentPage;

    //tests for keyword
    function testForKeyWord(node){
        //a regular expression that tests if the keyword is in the title
        const isKeyword = new RegExp(keyword, 'gi');
        if(node.name){
            return isKeyword.test(node.name);
        }
        return false;
    }

    const nodes = currentPage.findAll(testForKeyWord)

    //fills all our code with the selected color
    for(const node of nodes){
        node.fills = [{type:"SOLID", color: colorConverter(hex)}]
    }
}

/*
This is an event listener
Whenever the UI makes a call
to our main code
*/
figma.ui.onmessage = activateWhenUserClicksSubmit;


function colorConverter(hexColor){

    //a regular expression. It will test if the hex is proper
    const isHex = /[0-9abcdef]/i;

    //Throws an error if the hex is improper
    if(hexColor.length !== 6 && isHex.test(hexColor)){
        throw Error('hex colors must have 6 characters');
    }

    //converts hex code into RGB coloring
    const r = parseInt(hexColor.slice(0,2), 16)/255;
    const g = parseInt(hexColor.slice(2,4), 16)/255;
    const b = parseInt(hexColor.slice(4,6), 16)/255;

    return {r,g,b};
}