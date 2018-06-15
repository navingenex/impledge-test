import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  fileData = '';
  file: string[] = [];
  endIndexOfWord = 0;
  matchedWordListOfIndex: number[] = [];
  foundWord = '';
  longestWord = '';
  firstLongestWordIndex = 0;
  firstWordFound = false;
  secondWordFound = false;
  first_word = '';
  second_word = '';
  showLoader = true;

  // reading lines from textarea
  readFile() {
    this.file = this.fileData.split('\n');
    this.sortByLength(this.file);
  }

  // sorting list of words as ASC
  sortByLength(file: string[]) {
    this.file.sort(function (a, b) {
      return b.length - a.length;
    });
    // storing first longest word from sorted list
    this.longestWord = this.file[0];
    // storing index of first largest word from sorted array
    this.firstLongestWordIndex = this.file.indexOf(this.longestWord);
    this.findMatchedWord(0, 1);
  }

  // finding matched word from longest word
  findMatchedWord(start: number, end: number) {
    const foundMatchedWord = this.longestWord.substring(start, end);
    if (this.file.includes(foundMatchedWord) && this.file.indexOf(foundMatchedWord) !== this.firstLongestWordIndex) {
      this.endIndexOfWord = 0;
      // storing matched word index into seperate array of integers
      this.matchedWordListOfIndex.push(start);
      if (start === 0) {
        this.foundWord = foundMatchedWord;
      } else {
        this.foundWord = this.longestWord.substring(0, end);
      }
      start = this.foundWord.length;
      if ((start) < this.longestWord.length) {
        this.findMatchedWord(start, end + 1);
      }
    } else {
      if (this.endIndexOfWord === 0) {
        this.endIndexOfWord = end;
      }
      end += 1;
      if (end === this.longestWord.length) {
        this.findMatchedWord(start, end);
      } else {
        if (end < this.longestWord.length) {
          this.findMatchedWord(start, end);
        } else {
          if (this.matchedWordListOfIndex.length > 0) {
            start = this.matchedWordListOfIndex.length - 1;
            this.matchedWordListOfIndex.splice(start);
            end = this.endIndexOfWord;
            this.endIndexOfWord = 0;
            this.findMatchedWord(start, end);
          } else {
            // removing found word and longestword from list of words(file)
            // and again sorting the list(file) length wise
            const index = this.file.indexOf(this.longestWord);
            if (index !== -1) {
              this.file.splice(index, 1);
            }
            this.clear();
            this.sortByLength(this.file);
          }
        }
      }
    }
    // checking found word and longest word is qual and
    //  firstwordfound is false then displaying first word
    if ((this.foundWord === this.longestWord) && (!this.firstWordFound)) {
      this.first_word = this.longestWord;
      this.firstWordFound = true;
      const index = this.file.indexOf(this.longestWord);
      if (index !== -1) {
        this.file.splice(index, 1);
      }
      this.clear();
      this.sortByLength(this.file);
    } else if
    // checking found word and longest word is qual and
    //  secondwordfound is false then displaying second word
    ((this.foundWord === this.longestWord) && (!this.secondWordFound)) {
      this.second_word = this.longestWord;
      this.secondWordFound = true;
      const index = this.file.indexOf(this.longestWord);
      if (index !== -1) {
        this.file.splice(index, 1);
      }
      this.longestWord = '';
      this.foundWord = '';
    }
  }

  clear() {
    this.longestWord = '';
    this.foundWord = '';
    this.matchedWordListOfIndex = [];
    this.endIndexOfWord = 0;
  }
}
