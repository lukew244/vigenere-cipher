var cipher = '65 228 170 86 159 162 89 237 163 10 242 173 86 245 167 88 230 94 94 231 167 93 159 148 83 230 163 88 228 176 79 159 129 83 239 166 79 241 108 10 195 163 96 232 177 79 227 94 83 237 94 94 231 163 10 242 167 98 243 163 79 237 178 82 159 161 79 237 178 95 241 183 22 159 178 82 232 177 10 226 167 90 231 163 92 159 176 79 236 159 83 237 163 78 159 179 88 242 173 86 245 163 78 159 179 88 243 167 86 159 178 82 228 94 87 232 162 23 237 167 88 228 178 79 228 172 94 231 94 77 228 172 94 244 176 99 173 94 51 159 166 89 239 163 10 243 166 75 243 94 99 238 179 10 228 172 84 238 183 79 227 94 94 231 167 93 159 159 88 227 94 86 228 159 92 237 163 78 159 159 10 235 167 94 243 170 79 159 171 89 241 163 10 224 160 89 244 178 10 226 176 99 239 178 89 230 176 75 239 166 99 159 167 88 159 178 82 228 94 90 241 173 77 228 177 93';

var modulo = 256;
var frequentCharacter = 'e';
var searchRangeforFrequentCharacter = 8;
var digraph = 'th';
var occurencesOfDigraphToFind = 6;

var characters = cipher.split(' ');

//Splits the cipher into three and orders the numbers in each list by frequency of occurence.
var cipherA = [];
var cipherB = [];
var cipherC = [];

for(var i=0; i < characters.length; i++) {
  if(i%3===0) {cipherA.push(characters[i]);}
  else if(i%3===1) {cipherB.push(characters[i]);}
  else if(i%3===2) {cipherC.push(characters[i]);}
}

var orderedA = orderByOccurrence(cipherA);
var orderedB = orderByOccurrence(cipherB);
var orderedC = orderByOccurrence(cipherC);

//variables to hold possible keys
var cipherAkeys = [];
var cipherBkeys = [];
var cipherCkeys = [];

//takes a character likely the most frequent (say 'e' or 't') and generates a range of possible keys
function generateProbableKeys(character, range) {
    targetAscii = character.charCodeAt(0);
    for (var i=0; i < range; i++) {
      cipherAkeys.push(findKey(parseInt(orderedA[i]), targetAscii));
      cipherBkeys.push(findKey(parseInt(orderedB[i]), targetAscii));
      cipherCkeys.push(findKey(parseInt(orderedC[i]), targetAscii));
    }
}

function findKey(currentAscii, targetAscii) {
  if (targetAscii >= currentAscii) return (targetAscii - currentAscii);
  if (targetAscii < currentAscii) return ((modulo - currentAscii) + targetAscii);
}

//From here, arrays of possible keys could be built from frequency analysis using the letter 'e'

function decrypt(callback) {
  for(var a = 0; a < cipherAkeys.length; a++) {
    for(var b = 0; b < cipherBkeys.length; b++) {
      for(var c = 0; c < cipherCkeys.length; c++) {
        var decrypted = [];
        for(var i = 0; i < characters.length; i++) {
            characters[i] = parseInt(characters[i]);
          if (i%3===0) {
            var currentChar = (characters[i] + cipherAkeys[a]) % modulo;
            decrypted.push(currentChar);
          }
          else if (i%3==1) {
            var currentChar = (characters[i] + cipherBkeys[b]) % modulo;
            decrypted.push(currentChar);
          }
          else if (i%3==2) {
            var currentChar = (characters[i] + cipherCkeys[c]) % modulo;
            decrypted.push(currentChar);
          }
        }
        callback(decrypted);
      }
    }
  }
}

function analyseDecrypted(decrypted) {
  var result = convertToString(decrypted);
  scanForDigraph(result, digraph, occurencesOfDigraphToFind);
}

function convertToString(ascii, callback) {
  for(var i = 0; i < ascii.length; i++) {
    ascii[i] = String.fromCharCode(ascii[i]);
  }
  return ascii;
}

function scanForDigraph(array, digraph, occurences) {
  var found = 0;
  for(var i = 0; i < array.length ; i++) {
    if ((array[i] == digraph.charAt(0)) && (array[i+1] == digraph.charAt(1))) {
      found ++;
    }
  }
  if (found >= occurences) display(array);
}

function orderByOccurrence(arr) {
    var counts = {};
    arr.forEach(function(value){
        if(!counts[value]) {
            counts[value] = 0;
        }
        counts[value]++;
    });
    return Object.keys(counts).sort(function(curKey,nextKey) {
        return counts[curKey] < counts[nextKey];
    });
}

function display(array) {
  console.log(array.join(''));
}

generateProbableKeys(frequentCharacter, searchRangeforFrequentCharacter);
decrypt(analyseDecrypted);
