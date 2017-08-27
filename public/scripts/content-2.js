function processMutation (mutRec) {
	var _elemContext = this;

	// call listeners for "insert" event
	if(mutRec.type === 'childList' && mutRec.addedNodes && mutRec.addedNodes.length){
		Array.prototype.forEach.call(mutRec.addedNodes, function (addedNode) {
			iterateOffensiveNodes(addedNode, function (elem) {
				// console.log('Offensive Node found : ', elem);
				addBlur(elem);
			});
		});
	}

	// search for characterData changes
	if(mutRec.type === 'characterData') {
		iterateOffensiveNodes(mutRec.targetDiv, function (elem) {
			// console.log('Offensive Node found : ', elem);
			addBlur(elem);
		});
	}
}

var globalObserver = new MutationObserver(function (muts) {
	muts.forEach(processMutation);
});

var globalObserverParams = {
	subtree : true,
	childList: true,
	characterData: true
};

window.addEventListener("load", onloadFunction,false);

function onloadFunction(event){
	window.removeEventListener("load", onloadFunction, false); //remove listener, no longer needed
    debugger;
	iterateOffensiveNodes(document.body, function (elem) {
		// console.log('Offensive Node found : ', elem);
		addBlur(elem);
	});

	globalObserver.observe(document, globalObserverParams);

}
