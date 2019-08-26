var expect    = require("chai").expect;
var justifytext = require("../work/justifytext.js");



describe("adds space to a string until it reaches 80 characters", function() {
    it("converting one word", function() {
      let test1   = justifytext.turn80("kiibo");
      let test2   = justifytext.turn80(" kiibo");
      let test3   = justifytext.turn80("kiibo ");
      let test4   = justifytext.turn80("         kiibo       ");
      expect(test1).to.equal("kiibo");
      expect(test2).to.equal("kiibo");
      expect(test3).to.equal("kiibo");
      expect(test4).to.equal("kiibo");
   });
   it("converting a line under than 80 characters", function() {
      let test1   = justifytext.turn80("kiibo yane");
      let test2   = justifytext.turn80(" kiibo yane        ");
      let test3   = justifytext.turn80(" kiibo      loves    eating    and   playing   lol     ! ");
      let test4   = justifytext.turn80("Longtemps, je me suis couché de bonne heure. Parfois, à peine ma bougie");
      expect(test1).to.equal("kiibo                                                                       yane");
      expect(test2).to.equal("kiibo                                                                       yane");
      expect(test3).to.equal("kiibo          loves        eating        and        playing        lol        !");
      expect(test4).to.equal("Longtemps,  je  me  suis  couché  de  bonne  heure.  Parfois,  à peine ma bougie");
   });
   it("converting a line over 80 characters", function() {
      let test1   = justifytext.turn80("Longtemps,  je  me  suis  couché  de  bonne  heure.  Parfois,  à peine ma bougie");
      let test2   = justifytext.turn80("Longtemps,   je  me  suis  couché  de  bonne  heure.  Parfois,  à peine ma bougie");
      expect(test1).to.equal("Longtemps,  je  me  suis  couché  de  bonne  heure.  Parfois,  à peine ma bougie");
      expect(test2).to.equal("Longtemps,  je  me  suis  couché  de  bonne  heure.  Parfois,  à peine ma bougie");
   });

});

describe("justifying a text", function() {
    it("justifying one word", function() {
      let test1   = justifytext.justifytext("kiibo");
      let test2   = justifytext.justifytext(" kiibo");
      let test3   = justifytext.justifytext("kiibo ");
      let test4   = justifytext.justifytext("         kiibo       ");
      expect(test1).to.equal("kiibo");
      expect(test2).to.equal("kiibo");
      expect(test3).to.equal("kiibo");
      expect(test4).to.equal("kiibo");
   });
   it("justifying a line under than 80 characters", function() {
      let test1   = justifytext.justifytext("kiibo yane");
      let test2   = justifytext.justifytext(" kiibo yane        ");
      let test3   = justifytext.justifytext(" kiibo      loves    eating    and   playing   lol     ! ");
      expect(test1).to.equal("kiibo yane");
      expect(test2).to.equal("kiibo yane");
      expect(test3).to.equal("kiibo loves eating and playing lol !");
   });
   it("justifying a text with over 80 characters", function() {
      let test1   = justifytext.justifytext("Longtemps, je me suis couché de bonne heure. Parfois, à peine ma bougie éteinte, mes yeux se fermaient si vite que je n’avais pas le temps de me dire: «Je m’endors.»");
      expect(test1).to.equal("Longtemps, je me suis couché de bonne heure. Parfois, à peine ma bougie éteinte,\nmes  yeux  se  fermaient  si  vite  que  je n’avais pas le temps de me dire: «Je\nm’endors.»");
   });

});


