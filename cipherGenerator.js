var textToEncrypt = 'Well done solving this Vigenere Cipher. Devised in the sixteenth century, this cipher remained unsolved until the mid-nineteenth century. I hope that you enjoyed this and learned a little more about cryptography in the process';

var ascii = toASCII(textToEncrypt);

function toASCII(text) {
  var characters = text.split('');
  for(var i=0; i < characters.length; i++) {
    characters[i] = characters[i].charCodeAt(0);
  }
  return characters;
}

function generateThreeKeyVigenereCipher(ascii,a,b,c) {
			for(i=0;i<ascii.length;i++) {
				if(i%3==0){ascii[i]=(ascii[i]+a)%256;}
				if(i%3==1){ascii[i]=(ascii[i]+b)%256;}
				if(i%3==2){ascii[i]=(ascii[i]+c)%256;}
			}
			return ascii.join(' ');
		}

console.log(generateThreeKeyVigenereCipher(ascii, 234, 127, 62));
