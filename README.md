# Vigenere cipher

This repository contains my solution to a three-key ascii Vigenere Cipher, as well as code to generate new versions of the problem. Here is the problem as I was presented with it:

Decode the following cipher:

```
'65 228 170 86 159 162 89 237 163 10 242 173 86 245 167 88 230 94 94 231 167 93 159 148 83 230 163 88 228 176 79 159 129 83 239 166 79 241 108 10 195 163 96 232 177 79 227 94 83 237 94 94 231 163 10 242 167 98 243 163 79 237 178 82 159 161 79 237 178 95 241 183 22 159 178 82 232 177 10 226 167 90 231 163 92 159 176 79 236 159 83 237 163 78 159 179 88 242 173 86 245 163 78 159 179 88 243 167 86 159 178 82 228 94 87 232 162 23 237 167 88 228 178 79 228 172 94 231 94 77 228 172 94 244 176 99 173 94 51 159 166 89 239 163 10 243 166 75 243 94 99 238 179 10 228 172 84 238 183 79 227 94 94 231 167 93 159 159 88 227 94 86 228 159 92 237 163 78 159 159 10 235 167 94 243 170 79 159 171 89 241 163 10 224 160 89 244 178 10 226 176 99 239 178 89 230 176 75 239 166 99 159 167 88 159 178 82 228 94 90 241 173 77 228 177 93'
```
A console.log of the page revealed the following code:

```
function (ascii,a,b,c) {
	for(i=0;i<ascii.length;i++) {
		if(i%3==0){ascii[i]=(ascii[i]+a)%256;}
		if(i%3==1){ascii[i]=(ascii[i]+b)%256;}
		if(i%3==2){ascii[i]=(ascii[i]+c)%256;}
	}
	return ascii;
}
```

-------------

How it works:

The cipher generator works by converting the characters in a string to their ascii numbers. Each character is then encrypted by shifting its ascii number using one of three keys. The generator alternates sequentially between the keys, meaning that the 1st, 4th, and 7th characters are encrypted with the first key, the 2nd, 5th, and 8th with the second, and the 3rd, 6th, and 9th with the last key.    

The solution needs refactoring, but it works by splitting the text into three arrays, each of which corresponds to one of the keys. It orders each array by the frequency with which the numbers in it appear. These can then be used to generate possible combinations of keys, by comparing the most common numbers with the most frequently occuring characters in English (e.g. the letters 'e' or 't') and shifting each array by the amount required to match up the two. A second layer of filtering is then added, by converting the possible results back into strings and counting the number of occurences of a common digraph (e.g. 'th' or 'he').

In the example above, expecting the letter 'e' to be amongst the 8 most frequently occuring characters in each array produces a list of 512 possible combinations (out of a total of 17 million). Filtering these results by the number that contain 'th' three times or more reduces the possibile combinations to under 20, from which the answer is easy to spot.
