function isPalindrome(str) {
	return (str.trim().split('').reverse().join('') == str);
}

function findPalindromes(words) {
	var palindromeCount = {}, str = '', count = [], frequencyCount = {};
	for (var i = 0; i < words.length; i++) {
		var val = words[i].toLowerCase();
		if (!val) {
			continue;
		}
		
		// Check if word is a palindrome
		if (!isPalindrome(val)) {
			continue;
		}
		if (!palindromeCount[val]) {
			// This Palindrome was not seen before. Add it to the palindromeCount object
			palindromeCount[val] = 1;
		} else {
			// This Palindrome was seen before. Remove the previous entry in frequencyCount
			var index = frequencyCount[palindromeCount[val]].indexOf(val);
			frequencyCount[palindromeCount[val]].splice(index, 1);
			
			// Update the palindromeCount Object
			palindromeCount[val]++;
		}
		
		// Add the palindrome to the right frequencyCount entry
		if (frequencyCount[palindromeCount[val]]) {
			frequencyCount[palindromeCount[val]].push(val);
		} else {
			frequencyCount[palindromeCount[val]] = [ val ];
		}
	}
	
	// Sort Palindrome counts in descending order
	count = Object.keys(frequencyCount);
	count.sort(function(a, b) {
		return b - a;
	});
	
	// Format output in the descending order of palindrome counts.
	// For palindromes with the same counts sort in lexicographical order.
	for (var i = 0; i < count.length; i++) {
		var arr = frequencyCount[count[i]];
		if (arr.length > 1) {
			arr.sort();
		}

		for (var j = 0; j < arr.length; j++) {
			str = str + '<br>' + arr[j] + ' > ' + count[i];
		}
	}
	return str;
}

function fileRead(evt) {
	var f = evt.target.files[0];
	if (f) {
		var r = new FileReader();
		r.onloadstart = function(){
			document.getElementById('loader').style.visibility = 'visible';
			document.getElementById('loaded').style.visibility = 'hidden';

		}
		r.onload = function(e) {
			//var contents = e.target.result;
			var ct = r.result;
			var words = ct.split(new RegExp('[^a-z0-9]+', 'gi'));
			var str = findPalindromes(words);
			document.getElementById('results').innerHTML = str;
			document.getElementById('loader').style.visibility = 'hidden';
			document.getElementById('loaded').style.visibility = 'visible';

		}
		r.readAsText(f);
	} else {
		alert("Failed to load file");
	}
}

document.getElementById('file').addEventListener('change', fileRead, false);
document.getElementById('clear').addEventListener('click',function() {
	document.getElementById('results').innerHTML = '';
	document.getElementById("file").value = "";
	document.getElementById('loader').style.visibility = 'hidden';
	document.getElementById('loaded').style.visibility = 'hidden';
});